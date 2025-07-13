import { InversifyCoreError } from '../../error/models/InversifyCoreError';
import { InversifyCoreErrorKind } from '../../error/models/InversifyCoreErrorKind';
import { ClassElementMetadata } from '../models/ClassElementMetadata';
import { ClassElementMetadataKind } from '../models/ClassElementMetadataKind';
import { ManagedClassElementMetadata } from '../models/ManagedClassElementMetadata';
import { MaybeClassElementMetadata } from '../models/MaybeClassElementMetadata';
import { MaybeManagedClassElementMetadata } from '../models/MaybeManagedClassElementMetadata';

type Or<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? First | Or<Rest>
  : never;

type BuildDefaultMetadataFunction<
  TParams extends unknown[][],
  TResult,
> = TParams extends [
  infer First extends unknown[],
  ...infer Rest extends unknown[][],
]
  ? ((...params: First) => TResult) &
      BuildDefaultMetadataFunction<Rest, TResult>
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...params: any[]) => TResult;

type BuildMetadataFromMaybeManagedMetadataFunction<
  TParams extends unknown[][],
  TResult,
> = TParams extends [
  infer First extends unknown[],
  ...infer Rest extends unknown[][],
]
  ? ((
      metadata: MaybeManagedClassElementMetadata | ManagedClassElementMetadata,
      ...params: First
    ) => TResult) &
      BuildMetadataFromMaybeManagedMetadataFunction<Rest, TResult>
  : (
      metadata: MaybeManagedClassElementMetadata | ManagedClassElementMetadata,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...params: any[]
    ) => TResult;

export function buildClassElementMetadataFromMaybeClassElementMetadata<
  TParams extends unknown[][],
>(
  buildDefaultMetadata: BuildDefaultMetadataFunction<
    TParams,
    ClassElementMetadata
  >,
  buildMetadataFromMaybeManagedMetadata: BuildMetadataFromMaybeManagedMetadataFunction<
    TParams,
    ClassElementMetadata
  >,
): (
  ...params: Or<TParams>
) => (metadata: MaybeClassElementMetadata | undefined) => ClassElementMetadata {
  return (...params: Or<TParams>) =>
    (metadata: MaybeClassElementMetadata | undefined): ClassElementMetadata => {
      if (metadata === undefined) {
        return buildDefaultMetadata(...params);
      }

      if (metadata.kind === ClassElementMetadataKind.unmanaged) {
        throw new InversifyCoreError(
          InversifyCoreErrorKind.injectionDecoratorConflict,
          'Unexpected injection found. Multiple @inject, @multiInject or @unmanaged decorators found',
        );
      }

      return buildMetadataFromMaybeManagedMetadata(metadata, ...params);
    };
}
