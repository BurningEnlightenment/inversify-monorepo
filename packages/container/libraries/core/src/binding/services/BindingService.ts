import { ServiceIdentifier } from '@inversifyjs/common';

import { Cloneable } from '../../common/models/Cloneable';
import { OneToManyMapStar } from '../../common/models/OneToManyMapStar';
import { Binding } from '../models/Binding';

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

export class BindingService implements Cloneable<BindingService> {
  readonly #bindingMaps: OneToManyMapStar<Binding<unknown>, BindingRelation>;
  readonly #parent: BindingService | undefined;

  private constructor(
    parent: BindingService | undefined,
    bindingMaps?: OneToManyMapStar<Binding<unknown>, BindingRelation>,
  ) {
    this.#bindingMaps =
      bindingMaps ??
      new OneToManyMapStar<Binding<unknown>, BindingRelation>({
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

    this.#parent = parent;
  }

  public static build(parent: BindingService | undefined): BindingService {
    return new BindingService(parent);
  }

  public clone(): BindingService {
    const clone: BindingService = new BindingService(
      this.#parent,
      this.#bindingMaps.clone(),
    );

    return clone;
  }

  public get<TResolved>(
    serviceIdentifier: ServiceIdentifier,
  ): Iterable<Binding<TResolved>> | undefined {
    return (
      this.getNonParentBindings(serviceIdentifier) ??
      this.#parent?.get(serviceIdentifier)
    );
  }

  public getById<TResolved>(
    id: number,
  ): Iterable<Binding<TResolved>> | undefined {
    return (
      (this.#bindingMaps.get(BindingRelationKind.id, id) as
        | Iterable<Binding<TResolved>>
        | undefined) ?? this.#parent?.getById(id)
    );
  }

  public getByModuleId<TResolved>(
    moduleId: number,
  ): Iterable<Binding<TResolved>> | undefined {
    return (
      (this.#bindingMaps.get(BindingRelationKind.moduleId, moduleId) as
        | Iterable<Binding<TResolved>>
        | undefined) ?? this.#parent?.getByModuleId(moduleId)
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
}
