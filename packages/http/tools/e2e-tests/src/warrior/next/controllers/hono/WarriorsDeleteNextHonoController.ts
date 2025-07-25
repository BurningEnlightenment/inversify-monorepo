import {
  applyMiddleware,
  Controller,
  DELETE,
  MiddlewarePhase,
  next,
} from '@inversifyjs/http-core';
import { Next } from 'hono';

import { NextHonoMiddleware } from '../../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsDeleteNextHonoController {
  @applyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @DELETE()
  public async deleteWarrior(@next() nextFn: Next): Promise<void> {
    await nextFn();
  }
}
