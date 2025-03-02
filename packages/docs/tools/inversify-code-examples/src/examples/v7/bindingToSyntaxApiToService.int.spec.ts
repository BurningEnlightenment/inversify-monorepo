import { describe, expect, it } from 'vitest';

import {
  cardCatalogProviders,
  LorcanaCardCatalogProvider,
  MtgCardCatalogProvider,
} from './bindingToSyntaxApiToService';

describe('BindingToSyntax API (toService)', () => {
  it('should bind catalog providers', () => {
    expect(cardCatalogProviders).toStrictEqual([
      new LorcanaCardCatalogProvider(),
      new MtgCardCatalogProvider(),
    ]);
  });
});
