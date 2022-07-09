import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { HttpLambda } from '../../../../lib';

export class NodejsHttpStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const buildScript = path.join(process.cwd(), "..", "app", "build.sh");

    const { functionUrl } = new HttpLambda(this, "Lambda", {
      buildScript,
      runtime: lambda.Runtime.NODEJS_16_X,
      architecture: lambda.Architecture.ARM_64,
      handler: "index.js",
      memorySize: 512,
      timeout: Duration.seconds(10),
    });

    new CfnOutput(this, "HttpEndpoint", {
      value: functionUrl.url,
    });
  }
}
