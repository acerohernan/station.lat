#!/usr/bin/env node
import 'source-map-support/register';
import { config } from 'dotenv';
import * as cdk from 'aws-cdk-lib';
import { LatinStationFrontendStack } from '../lib/frontend-stack';
import { LatinStationServerStack } from '../lib/server-stack';

config();

const app = new cdk.App();

new LatinStationFrontendStack(app, 'LatinStationFrontendStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new LatinStationServerStack(app, 'LatinStationServerStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
