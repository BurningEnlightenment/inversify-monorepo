import { beforeAll, describe, expect, it } from 'vitest';

import { buildArrayMetadataWithArray } from './buildArrayMetadataWithArray';

describe(buildArrayMetadataWithArray.name, () => {
  describe('when called', () => {
    let newMetadata: number[];
    let arrayMetadata: number[];
    let result: number[];

    beforeAll(() => {
      newMetadata = [1, 2];
      arrayMetadata = [3, 4];

      result = buildArrayMetadataWithArray(newMetadata)(arrayMetadata);
    });

    it('should return the array with the new metadata', () => {
      expect(result).toStrictEqual([3, 4, 1, 2]);
    });

    it('should return the same array reference', () => {
      expect(result).toBe(arrayMetadata);
    });
  });
});
