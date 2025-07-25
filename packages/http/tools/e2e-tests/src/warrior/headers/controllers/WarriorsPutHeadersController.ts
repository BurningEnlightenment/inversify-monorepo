import { controller, headers, Put } from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsPutHeadersController {
  @Put()
  public async putWarrior(
    @headers() headers: Record<string, string>,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': headers['x-test-header'] as string,
    };
  }
}
