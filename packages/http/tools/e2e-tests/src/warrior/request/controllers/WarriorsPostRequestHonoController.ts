import { Controller, Post, request } from '@inversifyjs/http-core';
import { HonoRequest } from 'hono';

@Controller('/warriors')
export class WarriorsPostRequestHonoController {
  @Post()
  public async createWarrior(
    @request() request: HonoRequest,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.header('x-test-header') as string,
    };
  }
}
