import { HttpStatusCode } from './HttpStatusCode';

export class HttpResponse {
  constructor(
    public readonly statusCode: HttpStatusCode,
    public body?: object | string | number | boolean,
  ) {}
}
