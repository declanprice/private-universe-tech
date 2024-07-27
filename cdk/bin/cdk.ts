#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {AppPipeline} from "../lib/app.pipeline";
import {AppStack} from "../lib/app.stack";
const app = new cdk.App();

const dev = app.node.tryGetContext('environments')['dev'];

new AppStack(app, 'AppStack', {
    environment: dev,
})

// new AppPipeline(app, 'AppPipeline', {
//     stackName: 'AppPipeline',
//     env: {
//         region: 'ap-southeast-2',
//         account: '518424097895'
//     }
// })