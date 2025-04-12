import { injectable } from 'inversify7';

import { Inversify7BaseScenario } from './Inversify7BaseScenario';

@injectable()
class FinalNode {
  public log() {
    return 'log!';
  }
}

@injectable()
class Node1 {
  readonly #node: FinalNode;

  constructor(node: FinalNode) {
    this.#node = node;
  }

  public log() {
    return this.#node.log();
  }
}

export class Inversify7GetComplexServiceInSingletonScope extends Inversify7BaseScenario {
  public override async setUp(): Promise<void> {
    this._container.bind(FinalNode).toSelf().inSingletonScope();
    this._container.bind(Node1).toSelf().inSingletonScope();
  }

  public async execute(): Promise<void> {
    this._container.get(Node1);
  }

  public override async tearDown(): Promise<void> {
    await this._container.unbindAll();
  }
}
