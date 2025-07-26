import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('@inversifyjs/reflect-metadata-utils');

import {
  buildArrayMetadataWithIndex,
  buildDefaultArrayMetadata,
  setReflectMetadata,
  updateOwnReflectMetadata,
} from '@inversifyjs/reflect-metadata-utils';

import { InversifyHttpAdapterError } from '../../error/models/InversifyHttpAdapterError';
import { InversifyHttpAdapterErrorKind } from '../../error/models/InversifyHttpAdapterErrorKind';
import { controllerMethodParameterMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodParameterMetadataReflectKey';
import { controllerMethodUseNativeHandlerMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodUseNativeHandlerMetadataReflectKey';
import { ControllerMethodParameterMetadata } from '../../routerExplorer/model/ControllerMethodParameterMetadata';
import { RequestMethodParameterType } from '../models/RequestMethodParameterType';
import { requestParam } from './requestParam';

describe(requestParam, () => {
  describe('having a parameterType RESPONSE or NEXT', () => {
    describe('when called', () => {
      let targetFixture: NewableFunction;
      let keyFixture: string;
      let indexFixture: number;
      let controllerMethodParameterMetadataFixture: ControllerMethodParameterMetadata;

      beforeAll(() => {
        targetFixture = class Test {};
        keyFixture = 'keyFixture';
        indexFixture = 0;
        controllerMethodParameterMetadataFixture = {
          parameterType: RequestMethodParameterType.Response,
          pipeList: [],
        };

        requestParam(controllerMethodParameterMetadataFixture)(
          targetFixture,
          keyFixture,
          indexFixture,
        );
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call setReflectMetadata', () => {
        expect(setReflectMetadata).toHaveBeenCalledWith(
          targetFixture.constructor,
          controllerMethodUseNativeHandlerMetadataReflectKey,
          true,
          keyFixture,
        );
      });
    });
  });

  describe('having an undefined key', () => {
    describe('when called', () => {
      let targetFixture: NewableFunction;
      let keyFixture: undefined;
      let indexFixture: number;
      let controllerMethodParameterMetadataFixture: ControllerMethodParameterMetadata;
      let result: unknown;

      beforeAll(() => {
        targetFixture = class Test {};
        keyFixture = undefined;
        indexFixture = 0;
        controllerMethodParameterMetadataFixture = {
          parameterType: RequestMethodParameterType.Query,
          pipeList: [],
        };

        try {
          result = requestParam(controllerMethodParameterMetadataFixture)(
            targetFixture,
            keyFixture,
            indexFixture,
          );
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should throw an InversifyHttpAdapterError', () => {
        expect(InversifyHttpAdapterError.is(result)).toBe(true);
        expect((result as InversifyHttpAdapterError).kind).toBe(
          InversifyHttpAdapterErrorKind.requestParamIncorrectUse,
        );
      });
    });
  });

  describe('having a string key', () => {
    describe('when called', () => {
      let targetFixture: NewableFunction;
      let keyFixture: string;
      let indexFixture: number;
      let controllerMethodParameterMetadataFixture: ControllerMethodParameterMetadata;
      let callbackFixture: (arrayMetadata: unknown[]) => unknown[];

      beforeAll(() => {
        targetFixture = class Test {};
        keyFixture = 'keyFixture';
        indexFixture = 2;
        controllerMethodParameterMetadataFixture = {
          parameterType: RequestMethodParameterType.Query,
          pipeList: [],
        };
        callbackFixture = (arrayMetadata: unknown[]): unknown[] =>
          arrayMetadata;

        vitest
          .mocked(buildArrayMetadataWithIndex)
          .mockReturnValueOnce(callbackFixture);

        requestParam(controllerMethodParameterMetadataFixture)(
          targetFixture,
          keyFixture,
          indexFixture,
        );
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildArrayMetadataWithIndex', () => {
        expect(buildArrayMetadataWithIndex).toHaveBeenCalledTimes(1);
        expect(buildArrayMetadataWithIndex).toHaveBeenCalledWith(
          controllerMethodParameterMetadataFixture,
          indexFixture,
        );
      });

      it('should call updateOwnReflectMetadata', () => {
        expect(updateOwnReflectMetadata).toHaveBeenCalledTimes(1);
        expect(updateOwnReflectMetadata).toHaveBeenCalledWith(
          targetFixture.constructor,
          controllerMethodParameterMetadataReflectKey,
          buildDefaultArrayMetadata,
          callbackFixture,
          keyFixture,
        );
      });
    });
  });
});
