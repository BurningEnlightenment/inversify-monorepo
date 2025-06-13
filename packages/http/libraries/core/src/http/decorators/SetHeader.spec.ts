import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('@inversifyjs/reflect-metadata-utils');
vitest.mock('../calculations/buildSetHeaderMetadata');

import { updateOwnReflectMetadata } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodHeaderMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodHeaderMetadataReflectKey';
import { buildDefaultMapMetadata } from '../calculations/buildDefaultMapMetadata';
import { buildSetHeaderMetadata } from '../calculations/buildSetHeaderMetadata';
import { setHeader } from './SetHeader';

describe(setHeader, () => {
  describe('when called', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let descriptorFixture: PropertyDescriptor;
    let keyFixture: string;
    let valueFixture: string;
    let callbackFixture: (
      mapMetadata: Map<string, string>,
    ) => Map<string, string>;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';
      descriptorFixture = {
        value: 'value-descriptor-example',
      } as PropertyDescriptor;
      keyFixture = 'key-example';
      valueFixture = 'value-example';
      callbackFixture = (
        mapMetadata: Map<string, string>,
      ): Map<string, string> => mapMetadata;

      vitest
        .mocked(buildSetHeaderMetadata)
        .mockReturnValueOnce(callbackFixture);

      setHeader(keyFixture, valueFixture)(
        controllerFixture,
        controllerMethodKeyFixture,
        descriptorFixture,
      );
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call buildSetHeaderMetadata', () => {
      expect(buildSetHeaderMetadata).toHaveBeenCalledTimes(1);
      expect(buildSetHeaderMetadata).toHaveBeenCalledWith(
        keyFixture,
        valueFixture,
      );
    });

    it('should call setReflectMetadata', () => {
      expect(updateOwnReflectMetadata).toHaveBeenCalledTimes(1);
      expect(updateOwnReflectMetadata).toHaveBeenCalledWith(
        controllerFixture.constructor,
        controllerMethodHeaderMetadataReflectKey,
        buildDefaultMapMetadata,
        callbackFixture,
        controllerMethodKeyFixture,
      );
    });
  });
});
