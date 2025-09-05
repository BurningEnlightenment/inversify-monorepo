import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { OpenApi3Dot1Object } from '@inversifyjs/open-api-types/v3Dot1';
import { Container } from 'inversify';

import { buildExpress4Server } from '../../server/adapter/express4/actions/buildExpress4Server';
import { Server } from '../../server/models/Server';
import { buildSwaggerUiExpress4Controller } from './buildSwaggerUiExpress4Controller';

describe(buildSwaggerUiExpress4Controller, () => {
  describe('having an express http server', () => {
    let apiPathFixture: string;
    let specFixture: OpenApi3Dot1Object;

    let server: Server;

    beforeAll(async () => {
      apiPathFixture = '/api';
      specFixture = {
        info: {
          title: 'Test API',
          version: '1.0.0',
        },
        openapi: '3.1.0',
      };

      const container: Container = new Container();
      const controller: NewableFunction = buildSwaggerUiExpress4Controller({
        api: {
          openApiObject: specFixture,
          path: apiPathFixture,
        },
      });

      container.bind(controller).toSelf().inSingletonScope();

      server = await buildExpress4Server(container);
    });

    afterAll(async () => {
      await server.shutdown();
    });

    describe('when called GET /', () => {
      let response: Response;

      beforeAll(async () => {
        response = await fetch(
          `http://${server.host}:${server.port.toString()}${apiPathFixture}`,
          {
            method: 'GET',
          },
        );
      });

      it('should return an "text/html" Content-Type header', () => {
        expect(response.headers.get('Content-Type')).toStrictEqual(
          expect.stringContaining('text/html'),
        );
      });

      it('should return a 200 response', async () => {
        expect(response.status).toBe(200);
      });
    });

    describe.each<[string]>([
      ['swagger-initializer.js'],
      ['swagger-ui-bundle.js'],
      ['swagger-ui-es-bundle-core.js'],
      ['swagger-ui-es-bundle.js'],
      ['swagger-ui-standalone-preset.js'],
      ['swagger-ui.js'],
    ])('when called GET /resources/%s', (resource: string) => {
      let response: Response;

      beforeAll(async () => {
        response = await fetch(
          `http://${server.host}:${server.port.toString()}${apiPathFixture}/resources/${resource}`,
          {
            method: 'GET',
          },
        );
      });

      it('should return an "application/javascript" Content-Type header', () => {
        expect(response.headers.get('Content-Type')).toStrictEqual(
          expect.stringContaining('application/javascript'),
        );
      });

      it('should return a 200 response', async () => {
        expect(response.status).toBe(200);
      });
    });

    describe('when called GET /resources/spec', () => {
      let response: Response;

      beforeAll(async () => {
        response = await fetch(
          `http://${server.host}:${server.port.toString()}${apiPathFixture}/spec`,
          {
            method: 'GET',
          },
        );
      });

      it('should return an "application/json" Content-Type header', () => {
        expect(response.headers.get('Content-Type')).toStrictEqual(
          expect.stringContaining('application/json'),
        );
      });

      it('should return a 200 response', async () => {
        expect(response.status).toBe(200);
      });

      it('should return the OpenAPI spec', async () => {
        const data: unknown = await response.json();

        expect(data).toStrictEqual(specFixture);
      });
    });
  });
});
