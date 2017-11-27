import { Resource } from './resource';
import { ResourceMeta } from './resource-meta';
import { ResourceId } from './resource-id';

import { Action } from './action';
import { Relationship } from './relationship';
import { Type, plainToClass } from 'class-transformer';

export class ResourceList {
  @Type(() => Resource)
  data: Resource[] = [];
  links: any;
  @Type(() => ResourceMeta)
  meta: ResourceMeta;
  @Type(() => Resource)
  included: Resource[] = [];

  static fromObject<T extends ResourceList>(klass, object): T {
    const instance = plainToClass<T, Object>(klass, object);

    for (const value of (object.included || [])) {
      instance.included.push(Resource.fromObject(Resource, value));
    }
    return instance;
  }

  includeFromRel(rel: Relationship): Resource {
    return this.included.find((value): boolean => {
      return rel.data.id === value.id && rel.data.type === value.type;
    });
  }

  action(name: string): Action {
    return this.meta.action(name);
  }

  replaceItem(item: Resource) {
    for (let i = 0; i !== this.data.length; i++) {
      if (this.data[i].id === item.id) {
        this.data[i] = item;
        break;
      }
    }
  }

  linkFromId(id: string, linkRef?: string): string {
    const res = this.data.find((value): boolean => {
      return value.id === id;
    });
    return res.link(linkRef) || res.links.self;
  }

  addOrUpdateInc(resource: Resource, include: Resource, relName: string) {
    const i = this.included.findIndex((inc) => {
      return inc.id === include.id && inc.type === include.type;
    });
    i > -1 ? this.included[i] = include : this.included.push(include);
    resource.relationships[relName] = Relationship.fromInclude(include);
    this.replaceItem(resource);
   }
}
