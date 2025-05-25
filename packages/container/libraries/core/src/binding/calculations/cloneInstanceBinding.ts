import { InstanceBinding } from '../models/InstanceBinding';
import { cloneBindingCache } from './cloneBindingCache';

/**
 * Clones an InstanceBinding
 */
export function cloneInstanceBinding<TActivated>(
  binding: InstanceBinding<TActivated>,
): InstanceBinding<TActivated> {
  return {
    cache: cloneBindingCache(binding.cache),
    id: binding.id,
    implementationType: binding.implementationType,
    isSatisfiedBy: binding.isSatisfiedBy,
    moduleId: binding.moduleId,
    onActivation: binding.onActivation,
    onDeactivation: binding.onDeactivation,
    scope: binding.scope,
    serviceIdentifier: binding.serviceIdentifier,
    type: binding.type,
  };
}
