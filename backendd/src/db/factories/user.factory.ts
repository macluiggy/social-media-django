import { setSeederFactory } from 'typeorm-extension';
import { entitiesObject } from '../entities';
const { Users } = entitiesObject;

export default setSeederFactory(Users, (faker) => {
  const user = new Users();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.password = faker.internet.password();
  user.phone = faker.phone.number();
  user.username = faker.internet.userName({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  return user;
});
