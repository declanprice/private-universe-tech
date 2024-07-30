#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AppPipeline } from "../lib/app.pipeline";
const app = new cdk.App();

new AppPipeline(app, "PrivateUniversePipeline", {
  stackName: "PrivateUniversePipeline",
  env: {
    region: "ap-southeast-2",
    account: "518424097895",
  },
});
