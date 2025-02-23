import { HttpStatusCode } from '../HttpStatusCode';
import { ErrorHttpResponse } from './ErrorHttpResponse';

export class ServiceUnavailableHttpResponse extends ErrorHttpResponse {
  constructor(message?: string, error: string = 'Service Unavailable') {
    super(HttpStatusCode.SERVICE_UNAVAILABLE, error, message);
  }
}
