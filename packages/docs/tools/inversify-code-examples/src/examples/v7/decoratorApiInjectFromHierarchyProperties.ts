// Is-inversify-import-example
import { Container, inject, injectable, injectFromHierarchy } from 'inversify7';

const container: Container = new Container();

// Begin-example
type Weapon = unknown;

@injectable()
abstract class BaseSoldier {
  @inject('Weapon')
  public weapon: Weapon;
}

@injectable()
abstract class IntermediateSoldier extends BaseSoldier {}

@injectable()
@injectFromHierarchy({
  extendConstructorArguments: false,
  extendProperties: true,
})
class Soldier extends IntermediateSoldier {}

// Exclude-from-example
{
  container.bind('Weapon').toConstantValue('sword');
  container.bind(Soldier).toSelf();
}

// Returns a soldier with a weapon
const soldier: Soldier = container.get(Soldier);
// End-example

export { soldier };
