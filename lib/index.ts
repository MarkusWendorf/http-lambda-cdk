import { Construct } from "constructs";
import { spawnSync } from "child_process";
import { mkdtempSync } from "fs";
import { tmpdir } from "os";
import { Stack } from "aws-cdk-lib";
import { FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export interface HttpLambdaProps
  extends Omit<
    lambda.FunctionProps & lambda.FunctionUrlOptions,
    "handler" | "layers" | "code"
  > {
  /**
   * Script / executable to start the http server.
   *
   * @example
   * // Node.js script (has to include "#!/usr/bin/env node" at the top of the file)
   * "index.js"
   * @example
   * // Rust binary
   * "bootstrap"
   */
  handler: string;
  /**
   * Absolute path to the build script for the http server. The script will be called by this construct with two positional parameters:
   *
   * $1: a path to a temporary directory, where the build script should copy it's output to
   *
   * $2: the selected CPU architecture ("arm64" | "x86_64")
   *
   * Make sure the file permissions allow the current user to execute the script.
   *
   * @example
   * // Bash script
   * build.sh
   *
   * @example
   * // Node.js script
   * build.js
   */
  buildScript: string;
  /**
   * The version used for the AWS lambda adapter layer: 
   * @link https://github.com/awslabs/aws-lambda-web-adapter
   * 
   * @default
   * 3
   */
  lambdaAdapterLayerVersion?: string;
}

export class HttpLambda extends Construct {
  public func: lambda.Function;
  public functionUrl: lambda.FunctionUrl;

  constructor(scope: Construct, id: string, props: HttpLambdaProps) {
    super(scope, "HttpLambda" + id);
    const stack = Stack.of(this);

    const {
      handler,
      runtime,
      buildScript,
      architecture = lambda.Architecture.X86_64,
      lambdaAdapterLayerVersion = "3",
      ...functionProps
    } = this.validateProps(props);

    const archShorthand =
      architecture.name == lambda.Architecture.ARM_64.name ? "Arm64" : "X86";

    const adapterLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      "HttpAdapterLayer",
      `arn:aws:lambda:${stack.region}:753240598075:layer:LambdaAdapterLayer${archShorthand}:${lambdaAdapterLayerVersion}`
    );

    const buildArtifactPath = this.executeBuildScript(
      buildScript,
      architecture!
    );

    this.func = new lambda.Function(scope, id, {
      ...functionProps,
      runtime,
      handler,
      architecture,
      layers: [adapterLayer],
      code: lambda.Code.fromAsset(buildArtifactPath),
      environment: {
        ...functionProps.environment,
        // This option forces lambda to send the event payload to the http adapter (LambdaAdapterLayer)
        // The adapter then calls our server at port 8080 via http
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/bootstrap",
      },
    });

    this.functionUrl = this.func.addFunctionUrl({
      authType: functionProps.authType || FunctionUrlAuthType.NONE,
      cors: functionProps.cors || { allowedOrigins: ["*"] },
    });
  }

  executeBuildScript(scriptPath: string, architecture: lambda.Architecture) {
    const tmpDir = mkdtempSync(path.join(tmpdir(), "asset"));

    let command = `${scriptPath} ${tmpDir} ${architecture.name}`;
    if (path.extname(scriptPath) == ".sh") {
      command = `sh ${command}`;
    }

    const process = spawnSync(command, {
      shell: true,
      cwd: path.dirname(scriptPath),
      stdio: "inherit",
    });

    if (process.status != 0) {
      throw new Error("Build script failed");
    }

    return tmpDir;
  }

  validateProps(props: HttpLambdaProps) {
    const { buildScript } = props;

    if (!path.isAbsolute(buildScript)) {
      throw new Error(
        `buildScript has to be an absolute path, got a relative path: ${buildScript}`
      );
    }

    return props;
  }
}
