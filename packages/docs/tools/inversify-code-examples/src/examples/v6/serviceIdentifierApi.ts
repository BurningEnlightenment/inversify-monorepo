/* eslint-disable @typescript-eslint/typedef */
import { Container, interfaces } from 'inversify';

class UserService {}

const container: Container = new Container();

// Begin-example
// Using a class as a service identifier (most common)
container.bind(UserService).toSelf();

// Using a string as a service identifier
container.bind('IUserService').to(UserService);

// Using a symbol as a service identifier
const userServiceId: interfaces.ServiceIdentifier<UserService> =
  Symbol.for('UserService');
const castedUserServiceId: interfaces.ServiceIdentifier<UserService> =
  Symbol.for('UserService') as interfaces.ServiceIdentifier<UserService>;
container.bind(userServiceId).to(UserService);

// Resolving with a class identifier
const firstUserService = container.get(UserService);

// Resolving with a string identifier
const secondUserService = container.get('IUserService');

// Resolving with a symbol identifier
const thirdUserService = container.get(userServiceId);

// Resolving with a symbol identifier
const fourthUserService = container.get(castedUserServiceId);
// End-example

export {
  firstUserService,
  secondUserService,
  thirdUserService,
  fourthUserService,
  UserService,
};
