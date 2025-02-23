import { HttpStatusCode } from '../HttpStatusCode';
import { ErrorHttpResponse } from './ErrorHttpResponse';

export class GoneHttpResponse extends ErrorHttpResponse {
  constructor(message?: string, error: string = 'Gone') {
    super(HttpStatusCode.GONE, error, message);
  }
}
