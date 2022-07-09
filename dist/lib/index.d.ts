import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
export interface HttpLambdaProps extends Omit<lambda.FunctionProps & lambda.FunctionUrlOptions, "handler" | "layers" | "code"> {
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
}
export declare class HttpLambda extends Construct {
    func: lambda.Function;
    functionUrl: lambda.FunctionUrl;
    constructor(scope: Construct, id: string, props: HttpLambdaProps);
    executeBuildScript(scriptPath: string, architecture: lambda.Architecture): string;
    validateProps(props: HttpLambdaProps): HttpLambdaProps;
}
