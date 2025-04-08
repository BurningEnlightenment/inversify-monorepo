import assert from 'node:assert';

import { Then } from '@cucumber/cucumber';

import { InversifyHttpWorld } from '../../../common/models/InversifyHttpWorld';
import { getServerResponseOrFail } from '../../../server/calculations/getServerResponseOrFail';

async function thenResponseContainsTheCorrectHeadersInformation(
  this: InversifyHttpWorld,
  responseAlias?: string,
): Promise<void> {
  const parsedResponseAlias: string = responseAlias ?? 'default';

  const response: Response =
    getServerResponseOrFail.bind(this)(parsedResponseAlias);

  const responseBody: Record<string, string> =
    (await response.json()) as Record<string, string>;

  assert.ok(responseBody['x-test-header'] !== undefined);
  assert.strictEqual(responseBody['x-test-header'], 'test-value');
}

Then<InversifyHttpWorld>(
  'the response contains the correct headers information',
  async function (this: InversifyHttpWorld): Promise<void> {
    await thenResponseContainsTheCorrectHeadersInformation.bind(this)();
  },
);
