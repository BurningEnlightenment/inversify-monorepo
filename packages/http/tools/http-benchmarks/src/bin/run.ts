#!/usr/bin/env node

import { Scenario } from '@inversifyjs/benchmark-utils';

import { executeHttpBenchmark } from '../benchmark/calculations/executeHttpBenchmark';
import { printHttpBenchmarkResults } from '../benchmark/calculations/printHttpBenchmarkResults';
import { K6Summary } from '../k6/model/K6Summary';
import { CurrentInversifyExpressBasicGetScenario } from '../scenario/currentInversifyExpress/CurrentInversifyExpressBasicGetScenario';
import { CurrentInversifyExpress4BasicGetScenario } from '../scenario/currentInversifyExpress4/CurrentInversifyExpress4BasicGetScenario';
import { CurrentInversifyHonoBasicGetScenario } from '../scenario/currentInversifyHono/CurrentInversifyHonoBasicGetScenario';
import { ExpressBasicGetScenario } from '../scenario/express/ExpressBasicGetScenario';
import { Express4BasicGetScenario } from '../scenario/express4/Express4BasicGetScenario';
import { FastifyBasicGetScenario } from '../scenario/fastify/FastifyBasicGetScenario';
import { HonoBasicGetScenario } from '../scenario/hono/HonoBasicGetScenario';
import { Platform } from '../scenario/models/Platform';
import { NestJsExpressBasicGetScenario } from '../scenario/nestJsExpress/NestJsExpressBasicGetScenario';
import { NestJsFastifyBasicGetScenario } from '../scenario/nestJsFastify/NestJsFastifyBasicGetScenario';

export async function run(): Promise<void> {
  // Run express basic get request scenarios
  {
    const scenarioList: Scenario<Platform, K6Summary>[] = [
      new CurrentInversifyExpressBasicGetScenario(),
      new ExpressBasicGetScenario(),
      new NestJsExpressBasicGetScenario(),
    ];

    const summaryList: K6Summary[] = await executeHttpBenchmark(scenarioList);

    printHttpBenchmarkResults('Express Basic Get Request', summaryList);
  }

  // Run express v4 basic get request scenarios
  {
    const scenarioList: Scenario<Platform, K6Summary>[] = [
      new CurrentInversifyExpress4BasicGetScenario(),
      new Express4BasicGetScenario(),
    ];

    const summaryList: K6Summary[] = await executeHttpBenchmark(scenarioList);

    printHttpBenchmarkResults('Express v4 Basic Get Request', summaryList);
  }

  // Run fastify basic get request scenarios
  {
    const scenarioList: Scenario<Platform, K6Summary>[] = [
      new FastifyBasicGetScenario(),
      new NestJsFastifyBasicGetScenario(),
    ];

    const summaryList: K6Summary[] = await executeHttpBenchmark(scenarioList);

    printHttpBenchmarkResults('Fastify Basic Get Request', summaryList);
  }

  // Run Hono basic get request scenarios
  {
    const scenarioList: Scenario<Platform, K6Summary>[] = [
      new CurrentInversifyHonoBasicGetScenario(),
      new HonoBasicGetScenario(),
    ];

    const summaryList: K6Summary[] = await executeHttpBenchmark(scenarioList);

    printHttpBenchmarkResults('Hono Basic Get Request', summaryList);
  }
}
