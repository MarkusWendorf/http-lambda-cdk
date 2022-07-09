"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RustHttpStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const path = require("path");
const lambda = require("aws-cdk-lib/aws-lambda");
const lib_1 = require("../../../../lib");
class RustHttpStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const buildScript = path.join(process.cwd(), "..", "app", "build.sh");
        const { functionUrl } = new lib_1.HttpLambda(this, "Lambda", {
            buildScript,
            runtime: lambda.Runtime.PROVIDED_AL2,
            architecture: lambda.Architecture.ARM_64,
            handler: "bootstrap",
            memorySize: 512,
            timeout: aws_cdk_lib_1.Duration.seconds(10),
        });
        new aws_cdk_lib_1.CfnOutput(this, "HttpEndpoint", {
            value: functionUrl.url,
        });
    }
}
exports.RustHttpStack = RustHttpStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVzdEh0dHBTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2V4YW1wbGVzL3J1c3QtZXhhbXBsZS9jZGsvbGliL1J1c3RIdHRwU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXFFO0FBRXJFLDZCQUE2QjtBQUM3QixpREFBaUQ7QUFDakQseUNBQTZDO0FBRTdDLE1BQWEsYUFBYyxTQUFRLG1CQUFLO0lBQ3RDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztRQUV0RSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxnQkFBVSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDckQsV0FBVztZQUNYLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVk7WUFDcEMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTTtZQUN4QyxPQUFPLEVBQUUsV0FBVztZQUNwQixVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDbEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxHQUFHO1NBQ3ZCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5CRCxzQ0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQsIER1cmF0aW9uLCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBIdHRwTGFtYmRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vbGliJztcblxuZXhwb3J0IGNsYXNzIFJ1c3RIdHRwU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgYnVpbGRTY3JpcHQgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCIuLlwiLCBcImFwcFwiLCBcImJ1aWxkLnNoXCIpO1xuXG4gICAgY29uc3QgeyBmdW5jdGlvblVybCB9ID0gbmV3IEh0dHBMYW1iZGEodGhpcywgXCJMYW1iZGFcIiwge1xuICAgICAgYnVpbGRTY3JpcHQsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5QUk9WSURFRF9BTDIsXG4gICAgICBhcmNoaXRlY3R1cmU6IGxhbWJkYS5BcmNoaXRlY3R1cmUuQVJNXzY0LFxuICAgICAgaGFuZGxlcjogXCJib290c3RyYXBcIixcbiAgICAgIG1lbW9yeVNpemU6IDUxMixcbiAgICAgIHRpbWVvdXQ6IER1cmF0aW9uLnNlY29uZHMoMTApLFxuICAgIH0pO1xuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIkh0dHBFbmRwb2ludFwiLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb25VcmwudXJsLFxuICAgIH0pO1xuICB9XG59XG4iXX0=