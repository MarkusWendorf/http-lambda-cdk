import { Construct } from "constructs";
import { spawnSync } from "child_process";
import { mkdtempSync } from "fs";
import { tmpdir } from "os";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { Stack } from "aws-cdk-lib";

export interface HttpLambdaProps
  extends Omit<lambda.FunctionProps, "handler" | "layers" | "code"> {
  architecture: lambda.Architecture;
  /**
   * Script / executable to start the http server.
   * 
   * @example
   * // Node.js script (with #!/usr/bin/env node)
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
}

export class HttpLambda extends Construct {
  public func: lambda.Function;

  constructor(scope: Construct, id: string, props: HttpLambdaProps) {
    super(scope, "HttpLambda" + id);

    const stack = Stack.of(this);
    const { buildScript, architecture, handler, runtime, ...functionProps } =
      this.validateProps(props);

    const archShorthand =
      architecture == lambda.Architecture.ARM_64 ? "Arm64" : "X86";

    const adapterLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      "HttpAdapterLayer",
      `arn:aws:lambda:${stack.region}:753240598075:layer:LambdaAdapterLayer${archShorthand}:2`
    );

    const buildArtifactPath = this.executeBuildScript(
      buildScript,
      architecture
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
  }

  executeBuildScript(scriptPath: string, architecture: lambda.Architecture) {
    const tmpDir = mkdtempSync(path.join(tmpdir(), "asset"));

    let command = `${scriptPath} ${tmpDir} ${architecture.name}`;
    if (path.extname(scriptPath) == ".sh") {
      command = `sh ${command}`;
    }

    spawnSync(command, {
      shell: true,
      cwd: path.dirname(scriptPath),
      stdio: "inherit",
    });

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
