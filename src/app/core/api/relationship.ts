import { ResourceId } from './resource-id';
import { Resource } from './resource';
import { Type, plainToClass} from 'class-transformer';

export class Relationship {
  @Type(() => ResourceId)
  data: ResourceId;
  links: { [key: string]: string };

  get url(): string {
    return this.links['self'];
  }

  static fromInclude(include: Resource): Relationship {
    const rel = { data: { id: include.id, type: include.type }, links: include.links };
    return plainToClass<Relationship, Object>(Relationship, rel);
  }
}
