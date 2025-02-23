import { InversifyHttpAdapterErrorKind } from './InversifyHttpAdapterErrorKind';

const isHttpAdapterErrorSymbol: unique symbol = Symbol.for(
  '@inversifyjs/http-core/InversifyHttpAdapterError',
);

export class InversifyHttpAdapterError extends Error {
  public [isHttpAdapterErrorSymbol]: true;

  constructor(
    public readonly kind: InversifyHttpAdapterErrorKind,
    message?: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this[isHttpAdapterErrorSymbol] = true;
  }

  public static is(value: unknown): value is InversifyHttpAdapterError {
    return (
      typeof value === 'object' &&
      value !== null &&
      (value as Record<string | symbol, unknown>)[isHttpAdapterErrorSymbol] ===
        true
    );
  }

  public static isErrorOfKind(
    value: unknown,
    kind: InversifyHttpAdapterErrorKind,
  ): value is InversifyHttpAdapterError {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return InversifyHttpAdapterError.is(value) && value.kind === kind;
  }
}
