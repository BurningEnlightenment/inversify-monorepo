import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodHeaderMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodHeaderMetadataReflectKey';

export function exploreControllerMethodHeaderMetadataList(
  controller: NewableFunction,
  methodKey: string | symbol,
): [string, string][] {
  const headerMetadata: Map<string, string> | undefined =
    getReflectMetadataWithProperty(
      controller.prototype as object,
      controllerMethodHeaderMetadataReflectKey,
      methodKey,
    );

  const headerMetadataList: [string, string][] = [];

  if (headerMetadata !== undefined) {
    headerMetadataList.push(...headerMetadata.entries());
  }

  return headerMetadataList;
}
