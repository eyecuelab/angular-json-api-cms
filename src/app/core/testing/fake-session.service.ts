import { Injectable } from '@angular/core';
import { Action } from '../api/action';
import { Field } from '../api/field';
import { plainToClass } from 'class-transformer';
import { Resource } from '../api/resource';
import { Session } from '../api/session';

@Injectable()
export class FakeSessionService {
  instance: Session;
  actions = [{ name: 'reset_password',
    fields: [ { defaultValue: '',
                name: 'email',
                type: 'email' } ]
  }];

  links = { self: 'self-link',
            user: 'user-link' };

  provider: Resource = plainToClass(Resource, {
    id: 1,
    type: 'provider',
    attributes: {
      name: 'Fakey Provider',
      images: {
        logo: '',
        bg: '',
        bw_logo: ''
      },
      color: ''
    },
    links: { self: 'self-link' }
  });

  user: Resource = plainToClass(Resource, {
    id: 1,
    type: 'user',
    attributes: {
      first_name: 'test first',
      last_name: 'test last',
      image_urls: {
        thumb: '',
        preview: '',
        retina: '',
        large: ''
      }
    },
    links: { self: 'self-link' }
  });

  provider_user: Resource = plainToClass(Resource, {
    id: 1,
    type: 'provider_user',
    attributes: {
      roles: ['owner'],
    },
    links: { self: 'self-link' }
  });

  constructor() {
    this.instance = plainToClass(Session, {
      meta: { actions: this.actions },
      relationships: {
        provider: { data: { id: 1, type: 'provider' } },
        user: { data: { id: 1, type: 'user' } },
        provider_user: { data: { id: 1, type: 'provider_user' } }
      },
      included: [
        this.provider,
        this.user,
        this.provider_user
      ],
      links: this.links
    });
  }

  get loggedIn(): boolean {
    return true;
  }

  // get provider(): Resource {
  //   return this.includeFromRelName('provider');
  // }
  //
  // get user(): Resource {
  //   return this.includeFromRelName('user');
  // }
  //
  // get providerUser(): Resource {
  //   return this.includeFromRelName('provider_user');
  // }

  get loginAction(): Action {
    const action = new Action;
    const fieldData = { email: 'email',
                        password: 'password',
                        remember: 'checkbox' };
    action.fields = [];
    for (const key of Object.keys(fieldData)) {
      action.fields.push(plainToClass(Field, {
        defaultValue: '',
        name: key,
        type: fieldData[key]
      }));
    }

    return action;
  }
}
