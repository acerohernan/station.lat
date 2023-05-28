import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53_targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import path = require('path');
import { config } from 'dotenv';

config();

const REACT_BUNDLE_PATH = path.resolve(__dirname, '..', '..', 'apps', 'admin', 'dist');
const HOSTED_ZONE_DOMAIN = String(process.env.HOSTED_ZONE_DOMAIN);
const WEB_APP_DOMAIN = String(process.env.WEB_APP_DOMAIN);
const ACM_CERTIFICATE_ARN = String(process.env.ACM_CERTIFICATE_ARN);

export class LatinStationFrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* Create the s3 bucket to upload the react code */
    const webAppBucket = new s3.Bucket(this, WEB_APP_DOMAIN, {
      bucketName: WEB_APP_DOMAIN,
      versioned: false,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    /* Get the certificate */
    const webDomainCertificate = acm.Certificate.fromCertificateArn(
      this,
      `${WEB_APP_DOMAIN}-certificate`,
      ACM_CERTIFICATE_ARN
    );

    /* Create the cloudfront distribution */
    const webAppDistribution = new cloudfront.Distribution(this, `${WEB_APP_DOMAIN}-distribution`, {
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(webAppBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      domainNames: [WEB_APP_DOMAIN],
      certificate: webDomainCertificate,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
        },
      ],
    });

    /* Upload the react bundle to s3 and restart the cloud formation cache with the new changes */
    new BucketDeployment(this, `${WEB_APP_DOMAIN}-deployment`, {
      sources: [Source.asset(REACT_BUNDLE_PATH)],
      destinationBucket: webAppBucket,
      distribution: webAppDistribution,
      distributionPaths: ['/*'],
    });

    /* Get the hosted zone for "station.lat" */
    const hostedZone = route53.HostedZone.fromLookup(this, 'web-app-hosted-zone', {
      domainName: HOSTED_ZONE_DOMAIN,
    });

    /* Add an A" Record with the actual elastic ip address of the instance */
    new route53.ARecord(this, 'ARecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new route53_targets.CloudFrontTarget(webAppDistribution)),
      recordName: WEB_APP_DOMAIN,
    });
  }
}
