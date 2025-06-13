import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('../../error/calculations/isStackOverflowError');

import { isStackOverflowError } from '../../error/calculations/isStackOverflowError';
import { InversifyCoreError } from '../../error/models/InversifyCoreError';
import { InversifyCoreErrorKind } from '../../error/models/InversifyCoreErrorKind';
import { PlanParams } from '../models/PlanParams';
import { handlePlanError } from './handlePlanError';

describe(handlePlanError, () => {
  let errorFixture: unknown;

  beforeAll(() => {
    errorFixture = Symbol('errorFixture');
  });

  describe('having PlanParams with no servicesBranch', () => {
    let planParamsFixture: PlanParams;

    beforeAll(() => {
      planParamsFixture = {
        servicesBranch: [],
      } as Partial<PlanParams> as PlanParams;
    });

    describe('when called, and isStackOverflowError() returns false', () => {
      let result: unknown;

      beforeAll(() => {
        vitest.mocked(isStackOverflowError).mockReturnValueOnce(false);

        try {
          handlePlanError(planParamsFixture, errorFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should throw the error', () => {
        expect(result).toBe(errorFixture);
      });
    });

    describe('when called, and isStackOverflowError() returns true', () => {
      let result: unknown;

      beforeAll(() => {
        vitest.mocked(isStackOverflowError).mockReturnValueOnce(true);

        try {
          handlePlanError(planParamsFixture, errorFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should throw an InversifyCoreError', () => {
        const expectedErrorProperties: Partial<InversifyCoreError> = {
          cause: errorFixture,
          kind: InversifyCoreErrorKind.planning,
          message: 'Circular dependency found: (No dependency trace)',
        };

        expect(result).toStrictEqual(
          expect.objectContaining(expectedErrorProperties),
        );
      });
    });
  });

  describe('having PlanParams with servicesBranch containing "A", "B", and "A"', () => {
    let planParamsFixture: PlanParams;

    beforeAll(() => {
      planParamsFixture = {
        servicesBranch: ['A', 'B', 'A'],
      } as Partial<PlanParams> as PlanParams;
    });

    describe('when called, and isStackOverflowError() returns true', () => {
      let result: unknown;

      beforeAll(() => {
        vitest.mocked(isStackOverflowError).mockReturnValueOnce(true);

        try {
          handlePlanError(planParamsFixture, errorFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should throw an InversifyCoreError', () => {
        const expectedErrorProperties: Partial<InversifyCoreError> = {
          cause: errorFixture,
          kind: InversifyCoreErrorKind.planning,
          message: 'Circular dependency found: A -> B -> A',
        };

        expect(result).toStrictEqual(
          expect.objectContaining(expectedErrorProperties),
        );
      });
    });
  });
});
