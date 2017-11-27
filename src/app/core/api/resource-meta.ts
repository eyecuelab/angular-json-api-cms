import { Action } from './action';
import { Type } from 'class-transformer';

export class ResourceMeta {
  @Type(() => Action)
  actions: Action[] = [];

  action(name: string): Action {
    return this.actions.find(a => a.name === name);
  }
}
