import { describe, expect, it } from 'vitest';

import { katana } from './decorateClassDecorator';

describe('decorate API (ClassDecorator)', () => {
  it('should apply injectable decorator to class', () => {
    expect(katana.damage).toBe(10);
  });
});
