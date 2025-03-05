import { describe, expect, it } from 'vitest';

import { katana } from './bindingToSyntaxApiToResolvedValue';

describe('BindingToSyntax API (toResolvedValue)', () => {
  it('should provide a weapon with right damage', () => {
    expect(katana.damage).toBe(10);
  });
});
