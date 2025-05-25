import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

import { bindingTypeValues } from '../models/BindingType';
import { ConstantValueBinding } from '../models/ConstantValueBinding';
import { DynamicValueBinding } from '../models/DynamicValueBinding';
import { Factory } from '../models/Factory';
import { FactoryBinding } from '../models/FactoryBinding';
import { InstanceBinding } from '../models/InstanceBinding';
import { Provider } from '../models/Provider';
import { ProviderBinding } from '../models/ProviderBinding';
import { ResolvedValueBinding } from '../models/ResolvedValueBinding';
import { ServiceRedirectionBinding } from '../models/ServiceRedirectionBinding';
import { cloneBinding } from './cloneBinding';
import { cloneConstantValueBinding } from './cloneConstantValueBinding';
import { cloneDynamicValueBinding } from './cloneDynamicValueBinding';
import { cloneFactoryBinding } from './cloneFactoryBinding';
import { cloneInstanceBinding } from './cloneInstanceBinding';
import { cloneProviderBinding } from './cloneProviderBinding';
import { cloneResolvedValueBinding } from './cloneResolvedValueBinding';
import { cloneServiceRedirectionBinding } from './cloneServiceRedirectionBinding';

// Mock all clone functions
vitest.mock('./cloneConstantValueBinding');
vitest.mock('./cloneDynamicValueBinding');
vitest.mock('./cloneFactoryBinding');
vitest.mock('./cloneInstanceBinding');
vitest.mock('./cloneProviderBinding');
vitest.mock('./cloneResolvedValueBinding');
vitest.mock('./cloneServiceRedirectionBinding');

describe(cloneBinding.name, () => {
  // Common setup
  beforeAll(() => {
    // Reset mocks before each test
    vitest.mocked(cloneConstantValueBinding).mockReset();
    vitest.mocked(cloneDynamicValueBinding).mockReset();
    vitest.mocked(cloneFactoryBinding).mockReset();
    vitest.mocked(cloneInstanceBinding).mockReset();
    vitest.mocked(cloneProviderBinding).mockReset();
    vitest.mocked(cloneResolvedValueBinding).mockReset();
    vitest.mocked(cloneServiceRedirectionBinding).mockReset();
  });

  afterAll(() => {
    vitest.clearAllMocks();
  });

  describe('having a ConstantValueBinding', () => {
    let bindingFixture: ConstantValueBinding<unknown>;

    beforeAll(() => {
      bindingFixture = {
        cache: {
          isRight: false,
          value: undefined,
        },
        id: 0,
        isSatisfiedBy: () => true,
        moduleId: 1,
        onActivation: vitest.fn(),
        onDeactivation: vitest.fn(),
        scope: 'Singleton',
        serviceIdentifier: Symbol(),
        type: bindingTypeValues.ConstantValue,
        value: Symbol(),
      };
    });

    describe('when called', () => {
      let clonedBindingFixture: ConstantValueBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        clonedBindingFixture = { ...bindingFixture };

        vitest
          .mocked(cloneConstantValueBinding)
          .mockReturnValueOnce(clonedBindingFixture);

        result = cloneBinding(bindingFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call cloneConstantValueBinding', () => {
        expect(cloneConstantValueBinding).toHaveBeenCalledTimes(1);
        expect(cloneConstantValueBinding).toHaveBeenCalledWith(bindingFixture);
      });

      it('should return the cloned binding', () => {
        expect(result).toBe(clonedBindingFixture);
      });
    });
  });

  describe('having a DynamicValueBinding', () => {
    let bindingFixture: DynamicValueBinding<unknown>;

    beforeAll(() => {
      bindingFixture = {
        cache: {
          isRight: false,
          value: undefined,
        },
        id: 0,
        isSatisfiedBy: () => true,
        moduleId: 1,
        onActivation: vitest.fn(),
        onDeactivation: vitest.fn(),
        scope: 'Singleton',
        serviceIdentifier: Symbol(),
        type: bindingTypeValues.DynamicValue,
        value: vitest.fn(),
      };
    });

    describe('when called', () => {
      let clonedBindingFixture: DynamicValueBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        clonedBindingFixture = { ...bindingFixture };

        vitest
          .mocked(cloneDynamicValueBinding)
          .mockReturnValueOnce(clonedBindingFixture);

        result = cloneBinding(bindingFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call cloneDynamicValueBinding', () => {
        expect(cloneDynamicValueBinding).toHaveBeenCalledTimes(1);
        expect(cloneDynamicValueBinding).toHaveBeenCalledWith(bindingFixture);
      });

      it('should return the cloned binding', () => {
        expect(result).toBe(clonedBindingFixture);
      });
    });
  });

  describe('having a FactoryBinding', () => {
    let bindingFixture: FactoryBinding<Factory<unknown>>;
    let clonedBindingFixture: FactoryBinding<Factory<unknown>>;
    let result: unknown;

    beforeAll(() => {
      bindingFixture = {
        cache: {
          isRight: false,
          value: undefined,
        },
        factory: vitest.fn(),
        id: 0,
        isSatisfiedBy: () => true,
        moduleId: 1,
        onActivation: vitest.fn(),
        onDeactivation: vitest.fn(),
        scope: 'Singleton',
        serviceIdentifier: Symbol(),
        type: bindingTypeValues.Factory,
      };

      clonedBindingFixture = { ...bindingFixture };

      vitest
        .mocked(cloneFactoryBinding)
        .mockReturnValueOnce(clonedBindingFixture);

      result = cloneBinding(bindingFixture);
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call cloneFactoryBinding', () => {
      expect(cloneFactoryBinding).toHaveBeenCalledTimes(1);
      expect(cloneFactoryBinding).toHaveBeenCalledWith(bindingFixture);
    });

    it('should return the cloned binding', () => {
      expect(result).toBe(clonedBindingFixture);
    });
  });

  describe('having an InstanceBinding', () => {
    let bindingFixture: InstanceBinding<unknown>;
    let clonedBindingFixture: InstanceBinding<unknown>;
    let result: unknown;

    beforeAll(() => {
      bindingFixture = {
        cache: {
          isRight: false,
          value: undefined,
        },
        id: 0,
        implementationType: class {},
        isSatisfiedBy: () => true,
        moduleId: 1,
        onActivation: vitest.fn(),
        onDeactivation: vitest.fn(),
        scope: 'Singleton',
        serviceIdentifier: Symbol(),
        type: bindingTypeValues.Instance,
      };

      clonedBindingFixture = { ...bindingFixture };

      vitest
        .mocked(cloneInstanceBinding)
        .mockReturnValueOnce(clonedBindingFixture);

      result = cloneBinding(bindingFixture);
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call cloneInstanceBinding', () => {
      expect(cloneInstanceBinding).toHaveBeenCalledTimes(1);
      expect(cloneInstanceBinding).toHaveBeenCalledWith(bindingFixture);
    });

    it('should return the cloned binding', () => {
      expect(result).toBe(clonedBindingFixture);
    });
  });

  describe('having a ProviderBinding', () => {
    let bindingFixture: ProviderBinding<Provider<unknown>>;
    let clonedBindingFixture: ProviderBinding<Provider<unknown>>;
    let result: unknown;

    beforeAll(() => {
      bindingFixture = {
        cache: {
          isRight: false,
          value: undefined,
        },
        id: 0,
        isSatisfiedBy: () => true,
        moduleId: 1,
        onActivation: vitest.fn(),
        onDeactivation: vitest.fn(),
        provider: vitest.fn(),
        scope: 'Singleton',
        serviceIdentifier: Symbol(),
        type: bindingTypeValues.Provider,
      };

      clonedBindingFixture = { ...bindingFixture };

      vitest
        .mocked(cloneProviderBinding)
        .mockReturnValueOnce(clonedBindingFixture);

      result = cloneBinding(bindingFixture);
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call cloneProviderBinding', () => {
      expect(cloneProviderBinding).toHaveBeenCalledTimes(1);
      expect(cloneProviderBinding).toHaveBeenCalledWith(bindingFixture);
    });

    it('should return the cloned binding', () => {
      expect(result).toBe(clonedBindingFixture);
    });
  });

  describe('having a ResolvedValueBinding', () => {
    let bindingFixture: ResolvedValueBinding<unknown>;
    let clonedBindingFixture: ResolvedValueBinding<unknown>;
    let result: unknown;

    beforeAll(() => {
      bindingFixture = {
        cache: {
          isRight: false,
          value: undefined,
        },
        factory: vitest.fn(),
        id: 0,
        isSatisfiedBy: () => true,
        metadata: {
          arguments: [],
        },
        moduleId: 1,
        onActivation: vitest.fn(),
        onDeactivation: vitest.fn(),
        scope: 'Singleton',
        serviceIdentifier: Symbol(),
        type: bindingTypeValues.ResolvedValue,
      };

      clonedBindingFixture = { ...bindingFixture };

      vitest
        .mocked(cloneResolvedValueBinding)
        .mockReturnValueOnce(clonedBindingFixture);

      result = cloneBinding(bindingFixture);
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call cloneResolvedValueBinding', () => {
      expect(cloneResolvedValueBinding).toHaveBeenCalledTimes(1);
      expect(cloneResolvedValueBinding).toHaveBeenCalledWith(bindingFixture);
    });

    it('should return the cloned binding', () => {
      expect(result).toBe(clonedBindingFixture);
    });
  });

  describe('having a ServiceRedirectionBinding', () => {
    let bindingFixture: ServiceRedirectionBinding<unknown>;
    let clonedBindingFixture: ServiceRedirectionBinding<unknown>;
    let result: unknown;

    beforeAll(() => {
      bindingFixture = {
        id: 0,
        isSatisfiedBy: () => true,
        moduleId: 1,
        serviceIdentifier: Symbol(),
        targetServiceIdentifier: Symbol(),
        type: bindingTypeValues.ServiceRedirection,
      };

      clonedBindingFixture = { ...bindingFixture };

      vitest
        .mocked(cloneServiceRedirectionBinding)
        .mockReturnValueOnce(clonedBindingFixture);

      result = cloneBinding(bindingFixture);
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call cloneServiceRedirectionBinding', () => {
      expect(cloneServiceRedirectionBinding).toHaveBeenCalledTimes(1);
      expect(cloneServiceRedirectionBinding).toHaveBeenCalledWith(
        bindingFixture,
      );
    });

    it('should return the cloned binding', () => {
      expect(result).toBe(clonedBindingFixture);
    });
  });
});
