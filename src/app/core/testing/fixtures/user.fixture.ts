import * as Faker from 'faker';
import { Utils } from './utils';

export class UserFixture extends Utils {

  static default() {
    const avatar = Faker.image.avatar();
    return {
      first_name: Faker.name.firstName(),
      last_name: Faker.name.lastName(),
      name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
      email: Faker.internet.email(),
      phone: '+19152027375',
      image_urls: {
        large: avatar,
        preview: avatar,
        retina: avatar,
        thumb: avatar
      }
    };
  }
}
