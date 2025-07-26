import { GetPlanOptions } from '../models/GetPlanOptions';
import { PlanParamsOperations } from '../models/PlanParamsOperations';
import { PlanResult } from '../models/PlanResult';
import { PlanServiceNode } from '../models/PlanServiceNode';

export function cacheNonRootPlanServiceNode(
  getPlanOptions: GetPlanOptions | undefined,
  operations: PlanParamsOperations,
  planServiceNode: PlanServiceNode,
): void {
  if (getPlanOptions !== undefined && planServiceNode.isContextFree) {
    const planResult: PlanResult = {
      tree: {
        root: planServiceNode,
      },
    };

    operations.setPlan(getPlanOptions, planResult);
  } else {
    operations.setNonCachedServiceNode(planServiceNode);
  }
}
