import { body, Controller, Post } from '@inversifyjs/http-core';

import { WarriorCreationResponse } from '../models/WarriorCreationResponse';
import { WarriorRequest } from '../models/WarriorRequest';

@Controller('/warriors')
export class WarriorsPostBodyController {
  @Post()
  public async createWarrior(
    @body() body: WarriorRequest,
  ): Promise<WarriorCreationResponse> {
    return {
      damage: 10,
      health: 100,
      name: body.name,
      range: 1,
      speed: 10,
      type: body.type,
    };
  }
}
