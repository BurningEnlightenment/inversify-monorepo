import { Binding } from '../../binding/models/Binding';
import { InternalBindingConstraints } from '../../binding/models/BindingConstraintsImplementation';
import { SingleInmutableLinkedList } from '../../common/models/SingleInmutableLinkedList';
import { InversifyCoreError } from '../../error/models/InversifyCoreError';
import { InversifyCoreErrorKind } from '../../error/models/InversifyCoreErrorKind';
import { ResolvedValueElementMetadata } from '../../metadata/models/ResolvedValueElementMetadata';
import { BasePlanParams } from '../models/BasePlanParams';
import { BindingNodeParent } from '../models/BindingNodeParent';
import { PlanBindingNode } from '../models/PlanBindingNode';
import { PlanServiceNode } from '../models/PlanServiceNode';
import { SubplanParams } from '../models/SubplanParams';
import { curryBuildPlanServiceNodeFromResolvedValueElementMetadata } from './curryBuildPlanServiceNodeFromResolvedValueElementMetadata';

export function curryLazyBuildPlanServiceNodeFromResolvedValueElementMetadata(
  buildServiceNodeBindings: (
    params: BasePlanParams,
    bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
    serviceBindings: Binding<unknown>[],
    parentNode: BindingNodeParent,
    chainedBindings: boolean,
  ) => PlanBindingNode[],
): (
  params: SubplanParams,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
  elementMetadata: ResolvedValueElementMetadata,
) => PlanServiceNode | undefined {
  const buildPlanServiceNodeFromResolvedValueElementMetadata: (
    params: SubplanParams,
    bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
    elementMetadata: ResolvedValueElementMetadata,
  ) => PlanServiceNode | undefined =
    curryBuildPlanServiceNodeFromResolvedValueElementMetadata(
      buildServiceNodeBindings,
    );

  return (
    params: SubplanParams,
    bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
    elementMetadata: ResolvedValueElementMetadata,
  ): PlanServiceNode | undefined => {
    try {
      return buildPlanServiceNodeFromResolvedValueElementMetadata(
        params,
        bindingConstraintsList,
        elementMetadata,
      );
    } catch (error: unknown) {
      if (
        InversifyCoreError.isErrorOfKind(error, InversifyCoreErrorKind.planning)
      ) {
        return undefined;
      }

      throw error;
    }
  };
}
