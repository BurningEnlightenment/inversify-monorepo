import { describe, expect, it } from 'vitest';

import { Katana, Shuriken, weapons } from './containerApiGetAll';

describe('Container API (getAll)', () => {
  it('should provide weapons', () => {
    expect(weapons).toStrictEqual([new Katana(), new Shuriken()]);
  });
});
