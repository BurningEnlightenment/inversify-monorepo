import { describe, expect, it } from 'vitest';

import { Container } from 'inversify';

import { AnotherService, Service } from './lazyServiceIdentifier';

describe('getting started', () => {
  it('should resolve services', () => {
    const container: Container = new Container();

    container.bind(Service).toSelf();
    container.bind(AnotherService).toSelf();

    const service: Service = container.get(Service);
    const anotherService: AnotherService = container.get(AnotherService);

    expect(service).toBeInstanceOf(Service);
    expect(anotherService).toBeInstanceOf(AnotherService);
    expect(service.dependency).toBeInstanceOf(AnotherService);
  });
});
