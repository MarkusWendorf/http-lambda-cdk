import { CfnOutput, Duration, Fn, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { HttpLambda } from "http-lambda-cdk";

export class RustHttpStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const buildScript = path.join(process.cwd(), "..", "app", "build.sh");

    const { functionUrl } = new HttpLambda(this, "Lambda", {
      buildScript,
      runtime: lambda.Runtime.PROVIDED_AL2,
      architecture: lambda.Architecture.ARM_64,
      handler: "bootstrap",
      memorySize: 128,
      timeout: Duration.seconds(10),
    });

    new CfnOutput(this, "HttpEndpoint", {
      value: functionUrl.url,
    });
  }
}
