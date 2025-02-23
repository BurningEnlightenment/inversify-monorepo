import { HttpStatusCode } from '../HttpStatusCode';
import { ErrorHttpResponse } from './ErrorHttpResponse';

export class HttpVersionNotSupportedHttpResponse extends ErrorHttpResponse {
  constructor(message?: string, error: string = 'HTTP Version Not Supported') {
    super(HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED, error, message);
  }
}
