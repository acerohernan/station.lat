import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { readFileSync } from 'fs';
import path = require('path');

export class LatinStationServerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* Getting the default vpc */
    const vpc = ec2.Vpc.fromLookup(this, 'server-vpc', {
      isDefault: true,
    });

    /* Creating the security group for the EC2 instance */
    const serverSecurityGroup = new ec2.SecurityGroup(this, 'server-sg', {
      vpc,
      allowAllOutbound: true,
    });

    /* Allow SSH access from anyhere with the key-pair */
    serverSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));

    /* Allow HTTP access from anyhere with the key-pair */
    serverSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));

    /* Allow HTTPS access from anyhere with the key-pair */
    serverSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));

    /* Upload the docker compose file*/
    const dockerComposeConfig = ec2.InitFile.fromAsset(
      '/app/docker-compose.yml',
      path.resolve(__dirname, '..', 'resources', 'docker-compose.yml')
    );

    /* Upload the docker env file*/
    const dockerEnvFile = ec2.InitFile.fromAsset(
      '/app/docker.env',
      path.resolve(__dirname, '..', 'resources', 'docker.env')
    );

    /* Upload the nginx config file*/
    const nginxConfig = ec2.InitFile.fromAsset(
      '/app/nginx.conf',
      path.resolve(__dirname, '..', 'resources', 'nginx.conf')
    );

    /* Create the init init configuration for the instance */
    const init = ec2.CloudFormationInit.fromElements(dockerComposeConfig, dockerEnvFile, nginxConfig);

    /* Create the ec2 instance */
    const serverInstance = new ec2.Instance(this, 'server-instance', {
      vpc,
      securityGroup: serverSecurityGroup,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'windows-key-pair',
      init,
    });

    /* Read and add the user data script to the instance*/
    const userDataScript = readFileSync(path.resolve(__dirname, '..', 'resources', 'user-data.sh'), 'utf-8');

    serverInstance.addUserData(userDataScript);

    /* Create the instance's elastic ip address */
    const serverElasticIP = new ec2.CfnEIP(this, 'ec2-instance-ip');

    /* Associate the EIP with the EC2 instance */
    new ec2.CfnEIPAssociation(this, 'ec2-ip-association', {
      eip: serverElasticIP.ref,
      instanceId: serverInstance.instanceId,
    });

    /* Get the hosted zone for "station.lat" */
    const hostedZone = route53.HostedZone.fromLookup(this, 'server-hosted-zone', {
      domainName: 'station.lat',
    });

    /* Add an A" Record with the actual elastic ip address of the instance */
    new route53.ARecord(this, 'elastic-ip-aRecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromIpAddresses(serverElasticIP.ref),
      recordName: 'api.station.lat',
    });
  }
}
