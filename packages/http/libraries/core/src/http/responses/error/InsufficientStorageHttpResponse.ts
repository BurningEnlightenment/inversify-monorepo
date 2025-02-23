import { HttpStatusCode } from '../HttpStatusCode';
import { ErrorHttpResponse } from './ErrorHttpResponse';

export class InsufficientStorageHttpResponse extends ErrorHttpResponse {
  constructor(message?: string, error: string = 'Insufficient Storage') {
    super(HttpStatusCode.INSUFFICIENT_STORAGE, error, message);
  }
}
