import { ResourceId } from './resource-id';
import { ResourceMeta } from './resource-meta';
import { Relationship } from './relationship';
import { Type, plainToClass } from 'class-transformer';
import { Action } from './action';

interface Rels {
  [key: string]: Relationship;
}

export class Resource extends ResourceId {
  attributes: any;
  links: any;
  @Type(() => ResourceMeta)
  meta: ResourceMeta;
  relationships: Rels;
  included: Resource[] = [];

  static fromObject<T extends Resource>(klass, object): T {
    const data = object.data ? object.data : object;
    const instance = plainToClass<T, Object>(klass, data);
    if (!instance) return;
    for (const key in instance.relationships) {
      if (instance.relationships.hasOwnProperty(key)) {
        const value = instance.relationships[key];
        instance.relationships[key] = plainToClass<Relationship, Object>(Relationship, value);
      }
    }
    for (const value of (object.included || [])) {
      const res: Resource = Resource.fromObject(Resource, value);
      instance.included ? instance.included.push(res) : instance.included = [res];
    }
    return instance;
  }

  action(name: string): Action {
    if (!this.meta) { return; }
    return this.meta.action(name);
  }

  relation(key: string): Relationship {
    if (!this.relationships) return;
    return this.relationships[key];
  }

  match(data: ResourceId): boolean {
    return data.id === this.id && data.type === this.type;
  }

  includeFromRel(rel: Relationship): Resource {
    return this.included.find(value => value.match(rel.data));
  }

  includeFromRelName(name: string): Resource {
    const rel = this.relation(name);
    if (!rel) { return null; }

    return this.includeFromRel(rel);
  }

  link(name: string, params?: any): string {
    let url = this.links[name];
    if (!url) { return; }
    url = this.parameterizeUrl(url, params);
    return url;
  }

  addOrUpdateInc(include: Resource, relName: string) {
    const i = this.included.findIndex((inc) => {
      return inc.id === include.id && inc.type === include.type;
    });
    i > -1 ? this.included[i] = include : this.included.push(include);
    this.relationships[relName] = Relationship.fromInclude(include);
  }

  private parameterizeUrl(url: string, params?: any): string {
    url = decodeURIComponent(url);
    if (!params || !Object.keys(params).length) { return url; }

    for (const key of Object.keys(params)) {
      const re = new RegExp(`\{${key}\}`);
      url = url.replace(re, params[key]);
    }
    url = url.replace(/[\&]*[\w]+\=\{[\w]+\}/g, '').replace(/\?\&/g, '?');
    return url;
  }
}
