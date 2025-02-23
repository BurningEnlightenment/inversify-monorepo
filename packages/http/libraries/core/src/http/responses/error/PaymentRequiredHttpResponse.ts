import { HttpStatusCode } from '../HttpStatusCode';
import { ErrorHttpResponse } from './ErrorHttpResponse';

export class PaymentRequiredHttpResponse extends ErrorHttpResponse {
  constructor(message?: string, error: string = 'Payment Required') {
    super(HttpStatusCode.PAYMENT_REQUIRED, error, message);
  }
}
