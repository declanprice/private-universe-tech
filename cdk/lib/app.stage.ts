import {Stage, StageProps} from "aws-cdk-lib";
import { Construct } from "constructs";
import { Environment } from "./environment";
import {AppStack} from "./app.stack";

type AppStageProps = {
    environment: Environment
} & StageProps

export class AppStage extends Stage {
    constructor(scope: Construct, id: string, props: AppStageProps) {
        super(scope, id);

        new AppStack(this, "PrivateUniverseAppStack", props);
    }
}

