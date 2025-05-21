import { DynamicValueBinding } from '../models/DynamicValueBinding';
import { cloneBindingCache } from './cloneBindingCache';

/**
 * Clones a DynamicValueBinding
 */
export function cloneDynamicValueBinding<TActivated>(
  binding: DynamicValueBinding<TActivated>,
): DynamicValueBinding<TActivated> {
  return {
    cache: cloneBindingCache(binding.cache),
    id: binding.id,
    isSatisfiedBy: binding.isSatisfiedBy,
    moduleId: binding.moduleId,
    onActivation: binding.onActivation,
    onDeactivation: binding.onDeactivation,
    scope: binding.scope,
    serviceIdentifier: binding.serviceIdentifier,
    type: binding.type,
    // The value is not cloned
    value: binding.value,
  };
}
