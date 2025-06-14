// Is-inversify-import-example
import { Container, inject, injectable, interfaces } from 'inversify';

interface Weapon {
  damage: number;
}

const ninjaServiceId: interfaces.ServiceIdentifier<Ninja> =
  Symbol.for('NinjaServiceId');

const weaponServiceId: interfaces.ServiceIdentifier<Weapon> =
  Symbol.for('WeaponServiceId');

@injectable()
class Katana {
  public readonly damage: number = 10;
}

@injectable()
class Ninja {
  constructor(
    @inject(weaponServiceId)
    public readonly weapon: Weapon,
  ) {}
}

const container: Container = new Container();

container.bind(ninjaServiceId).to(Ninja);
container.bind(weaponServiceId).to(Katana);

const ninja: Ninja = container.get(ninjaServiceId);

console.log(ninja.weapon.damage); // Prints 10
// End-example

export { ninja };
