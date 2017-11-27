import { Resource } from './resource';

export class Session extends Resource {
  constructor() {
    super();
  }

  get loggedIn(): boolean {
    return !!this.relationships;
  }

  get provider(): Resource {
    return this.includeFromRelName('provider');
  }

  get user(): Resource {
    return this.includeFromRelName('user');
  }

  get providerUser(): Resource {
    return this.includeFromRelName('provider_user');
  }

  get serverData(): any {
    const data = this.includeFromRelName('server_data');
    if (!data) return;
    return data.attributes;
  }

  get applicationAgreement(): any {
    return this.includeFromRelName('application_agreement');
  }

  hasRole(role) {
    const attrs = this.providerUser.attributes;
    return attrs.roles.indexOf(role) > -1;
  }
}
