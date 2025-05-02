import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('@inversifyjs/reflect-metadata-utils');

import { setReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodStatusCodeMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodStatusCodeMetadataReflectKey';
import { HttpStatusCode } from '../responses/HttpStatusCode';
import { statusCode } from './StatusCode';

describe(statusCode.name, () => {
  describe('when called', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let descriptorFixture: PropertyDescriptor;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';
      descriptorFixture = {
        value: 'value-descriptor-example',
      } as PropertyDescriptor;

      statusCode(HttpStatusCode.OK)(
        controllerFixture,
        controllerMethodKeyFixture,
        descriptorFixture,
      );
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call setReflectMetadataWithProperty', () => {
      expect(setReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(setReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture,
        controllerMethodStatusCodeMetadataReflectKey,
        controllerMethodKeyFixture,
        HttpStatusCode.OK,
      );
    });
  });
});
