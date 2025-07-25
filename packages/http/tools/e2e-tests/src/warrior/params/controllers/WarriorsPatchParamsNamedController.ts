import { Controller, Params, Patch } from '@inversifyjs/http-core';

import { WarriorWithId } from '../models/WarriorWithId';

@Controller('/warriors')
export class WarriorsPatchParamsNamedController {
  @Patch('/:id')
  public async updateWarrior(@Params('id') id: string): Promise<WarriorWithId> {
    return {
      damage: 10,
      health: 100,
      id,
      range: 1,
      speed: 10,
    };
  }
}
