import { InversifyExpressHttpAdapter } from '@inversifyjs/http-express-v4';
import express, { Application } from 'express4';
import { Container } from 'inversify';

import { DEFAULT_PORT } from '../../constant/defaultPort';
import { AppController } from '../../scenario/currentInversify/AppController';

async function setUp(): Promise<void> {
  const container: Container = new Container({ defaultScope: 'Singleton' });

  container.bind(AppController).toSelf();

  const server: InversifyExpressHttpAdapter = new InversifyExpressHttpAdapter(
    container,
    {
      logger: false,
    },
    express(),
  );

  const app: Application = await server.build();

  app.listen(DEFAULT_PORT);
}

void setUp();
