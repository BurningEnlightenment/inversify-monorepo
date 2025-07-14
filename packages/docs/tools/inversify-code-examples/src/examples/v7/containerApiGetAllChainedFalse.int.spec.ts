import { describe, expect, it } from 'vitest';

import { Shuriken, weapons } from './containerApiGetAllChainedFalse';

describe('Container API (getAll with chained false)', () => {
  it('should provide weapons', () => {
    expect(weapons).toStrictEqual([new Shuriken()]);
  });
});
