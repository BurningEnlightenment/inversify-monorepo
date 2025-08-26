import { Newable, ServiceIdentifier } from '@inversifyjs/common';

import { Cloneable } from '../../common/models/Cloneable';
import {
  OneToManyMapStar,
  OneToManyMapStartSpec,
} from '../../common/models/OneToManyMapStar';
import { getClassMetadata } from '../../metadata/calculations/getClassMetadata';
import { ClassMetadata } from '../../metadata/models/ClassMetadata';
import { BasePlanParamsAutobindOptions } from '../../planning/models/BasePlanParamsAutobindOptions';
import { getBindingId } from '../actions/getBindingId';
import { cloneBinding } from '../calculations/cloneBinding';
import { Binding } from '../models/Binding';
import { BindingScope } from '../models/BindingScope';
import { bindingTypeValues } from '../models/BindingType';
import { InstanceBinding } from '../models/InstanceBinding';

enum BindingRelationKind {
  id = 'id',
  moduleId = 'moduleId',
  serviceId = 'serviceId',
}

export interface BindingRelation {
  [BindingRelationKind.id]: number;
  [BindingRelationKind.moduleId]?: number;
  [BindingRelationKind.serviceId]: ServiceIdentifier;
}

export class OneToManyBindingMapStar extends OneToManyMapStar<
  Binding<unknown>,
  BindingRelation
> {
  protected override _buildNewInstance(
    spec: OneToManyMapStartSpec<BindingRelation>,
  ): this {
    return new OneToManyBindingMapStar(spec) as this;
  }

  protected override _cloneModel(model: Binding<unknown>): Binding<unknown> {
    return cloneBinding(model);
  }
}

export class BindingService implements Cloneable<BindingService> {
  readonly #autobindOptions: BasePlanParamsAutobindOptions | undefined;
  readonly #bindingMaps: OneToManyBindingMapStar;
  readonly #getParent: () => BindingService | undefined;

  private constructor(
    getParent: () => BindingService | undefined,
    autobindOptions?: BasePlanParamsAutobindOptions,
    bindingMaps?: OneToManyBindingMapStar,
  ) {
    this.#bindingMaps =
      bindingMaps ??
      new OneToManyBindingMapStar({
        id: {
          isOptional: false,
        },
        moduleId: {
          isOptional: true,
        },
        serviceId: {
          isOptional: false,
        },
      });

    this.#getParent = getParent;
    this.#autobindOptions = autobindOptions;
  }

  public static build(
    getParent: () => BindingService | undefined,
    autobindOptions?: BasePlanParamsAutobindOptions,
  ): BindingService {
    return new BindingService(getParent, autobindOptions);
  }

  public clone(): BindingService {
    const clone: BindingService = new BindingService(
      this.#getParent,
      this.#autobindOptions,
      this.#bindingMaps.clone(),
    );

    return clone;
  }

  public get<TResolved>(
    serviceIdentifier: ServiceIdentifier,
  ): Iterable<Binding<TResolved>> | undefined {
    const currentBindings: Iterable<Binding<TResolved>> | undefined =
      this.getNonParentBindings<TResolved>(serviceIdentifier);
    if (currentBindings !== undefined) {
      return currentBindings;
    }

    const parentBindings: Iterable<Binding<TResolved>> | undefined =
      this.#getParent()?.get<TResolved>(serviceIdentifier);
    if (parentBindings !== undefined) {
      return parentBindings;
    }

    // Try to autobind if no bindings found in current or parent containers
    return this.#tryAutobind<TResolved>(serviceIdentifier);
  }

  public *getChained<TResolved>(
    serviceIdentifier: ServiceIdentifier,
  ): Generator<Binding<TResolved>, void, unknown> {
    const currentBindings: Iterable<Binding<TResolved>> | undefined =
      this.getNonParentBindings<TResolved>(serviceIdentifier);
    if (currentBindings !== undefined) {
      yield* currentBindings;
    }

    const parent: BindingService | undefined = this.#getParent();

    if (parent !== undefined) {
      yield* parent.getChained<TResolved>(serviceIdentifier);
    } else if (currentBindings === undefined) {
      // If we're at the root and no bindings were found, try to autobind
      const autobindBindings: Iterable<Binding<TResolved>> | undefined =
        this.#tryAutobind<TResolved>(serviceIdentifier);
      if (autobindBindings !== undefined) {
        yield* autobindBindings;
      }
    }
  }

  public getBoundServices(): Iterable<ServiceIdentifier> {
    const serviceIdentifierSet: Set<ServiceIdentifier> =
      new Set<ServiceIdentifier>(
        this.#bindingMaps.getAllKeys(BindingRelationKind.serviceId),
      );

    const parent: BindingService | undefined = this.#getParent();

    if (parent !== undefined) {
      for (const serviceIdentifier of parent.getBoundServices()) {
        serviceIdentifierSet.add(serviceIdentifier);
      }
    }

    return serviceIdentifierSet;
  }

  public getById<TResolved>(
    id: number,
  ): Iterable<Binding<TResolved>> | undefined {
    return (
      (this.#bindingMaps.get(BindingRelationKind.id, id) as
        | Iterable<Binding<TResolved>>
        | undefined) ?? this.#getParent()?.getById(id)
    );
  }

  public getByModuleId<TResolved>(
    moduleId: number,
  ): Iterable<Binding<TResolved>> | undefined {
    return (
      (this.#bindingMaps.get(BindingRelationKind.moduleId, moduleId) as
        | Iterable<Binding<TResolved>>
        | undefined) ?? this.#getParent()?.getByModuleId(moduleId)
    );
  }

  public getNonParentBindings<TResolved>(
    serviceId: ServiceIdentifier,
  ): Iterable<Binding<TResolved>> | undefined {
    return this.#bindingMaps.get(BindingRelationKind.serviceId, serviceId) as
      | Iterable<Binding<TResolved>>
      | undefined;
  }

  public getNonParentBoundServices(): Iterable<ServiceIdentifier> {
    return this.#bindingMaps.getAllKeys(BindingRelationKind.serviceId);
  }

  public removeById(id: number): void {
    this.#bindingMaps.removeByRelation(BindingRelationKind.id, id);
  }

  public removeAllByModuleId(moduleId: number): void {
    this.#bindingMaps.removeByRelation(BindingRelationKind.moduleId, moduleId);
  }

  public removeAllByServiceId(serviceId: ServiceIdentifier): void {
    this.#bindingMaps.removeByRelation(
      BindingRelationKind.serviceId,
      serviceId,
    );
  }

  public set<TInstance>(binding: Binding<TInstance>): void {
    const relation: BindingRelation = {
      [BindingRelationKind.id]: binding.id,
      [BindingRelationKind.serviceId]: binding.serviceIdentifier,
    };

    if (binding.moduleId !== undefined) {
      relation[BindingRelationKind.moduleId] = binding.moduleId;
    }

    this.#bindingMaps.add(binding as Binding<unknown>, relation);
  }

  #tryAutobind<TResolved>(
    serviceIdentifier: ServiceIdentifier,
  ): Iterable<Binding<TResolved>> | undefined {
    if (
      this.#autobindOptions === undefined ||
      typeof serviceIdentifier !== 'function'
    ) {
      return undefined;
    }

    const binding: InstanceBinding<unknown> = this.#buildInstanceBinding(
      this.#autobindOptions,
      serviceIdentifier as Newable,
    );

    this.set(binding);

    return [binding] as Iterable<Binding<TResolved>>;
  }

  #buildInstanceBinding(
    autobindOptions: BasePlanParamsAutobindOptions,
    serviceIdentifier: Newable,
  ): InstanceBinding<unknown> {
    const classMetadata: ClassMetadata = getClassMetadata(serviceIdentifier);
    const scope: BindingScope = classMetadata.scope ?? autobindOptions.scope;

    return {
      cache: {
        isRight: false,
        value: undefined,
      },
      id: getBindingId(),
      implementationType: serviceIdentifier,
      isSatisfiedBy: () => true,
      moduleId: undefined,
      onActivation: undefined,
      onDeactivation: undefined,
      scope,
      serviceIdentifier,
      type: bindingTypeValues.Instance,
    };
  }
}
