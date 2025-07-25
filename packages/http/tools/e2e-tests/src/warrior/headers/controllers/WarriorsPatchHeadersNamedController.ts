import { Controller, headers, Patch } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPatchHeadersNamedController {
  @Patch()
  public async patchWarrior(
    @headers('x-test-header') testHeader: string,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': testHeader,
    };
  }
}
