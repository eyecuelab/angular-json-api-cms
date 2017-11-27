import { ActivatedRoute, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FakeResourceMeta } from './fake-resource-meta';
import { Resource, Relationship, ResourceList, ResourceMeta, Action, Field } from '../.';
import { plainToClass } from 'class-transformer';

export class ActivatedRouteStub extends ActivatedRoute {
  private resourceLists: { [s: string]: ResourceList; } = {};
  private resources: { [s: string]: Resource; } = {};

  constructor() {
    super();
  }

  addToResource(type: string, id: number | string, attrs: {}, includes?: {[x: string]: {}}) {
    const res = (this.resources[type] || new Resource());
    res.attributes = attrs;
    const relationship = new Relationship();
    for (const key of Object.keys(includes || {})) {
      relationship.data = { id: id.toString(), type: key };
      res.relationships = {};
      res.relationships[key] = relationship;
      const resInclude = new Resource();
      resInclude.id = id.toString();
      resInclude.type = key;
      resInclude.attributes = includes[key];
      res.included.push(resInclude);
    }
    this.resources[type] = res;
  }

  addToResourceList(type: string, id: number | string, attrs: {}, includes?: {[x: string]: {}}) {
    const res = new Resource();
    const resList = (this.resourceLists[type] || new ResourceList());
    res.attributes = attrs;
    const relationship = new Relationship();
    for (const key of Object.keys(includes || {})) {
      relationship.data = { id: id.toString(), type: key };
      res.relationships = {};
      res.relationships[key] = relationship;
      const resInclude = new Resource();
      resInclude.id =  id.toString();
      resInclude.type = key;
      resInclude.attributes = includes[key];
      resList.included.push(resInclude);
    }
    resList.data.push(res);
    this.resourceLists[type] = resList;
  }

  addToResourceMetaAction(type: string, name: string, fields: [{}], url?: string) {
    const resMeta = new ResourceMeta();
    const resList = (this.resourceLists[type] || new ResourceList());
    const action = ((resList.meta && resList.meta.action(name)) || new Action());
    action.name = name;
    action.url = (action.url || (url || '/'));
    fields.forEach((field) => {
      action.fields.push(plainToClass(Field, field));
    });
    resMeta.actions.push(action);
    resList.meta = resMeta;
    this.resourceLists[type] = resList;
  }

  get snapshot(): ActivatedRouteSnapshot {
    const snap = new ActivatedRouteSnapshot();
    const fakeResourceMeta = new FakeResourceMeta();
    const action = new Action();
    const resource = new Resource();
    snap.data = this.mergedResources;
    snap.url = [ new UrlSegment('/test', { id: '1234' }) ];
    snap.params = {};
    snap.queryParams = {};
    snap.data.areaData = resource;
    snap.data.areaData.attributes = {};
    snap.data.areaData.id = '';
    snap.data.areaData.included = [];
    snap.data.areaData.links = {};
    snap.data.areaData.relationship = {};
    snap.data.areaData.type = '';
    snap.data.areaData.meta = fakeResourceMeta;
    snap.data.areaData.meta.actions = [this.actionFunction];

    return snap;
  }

  get data() {
    return Observable.of(this.mergedResources);
  }

  get parent() {
    return this;
  }

  get queryParams() {
    return Observable.of({ search: 'asdf' });
  }

  set queryParams(params) {};
  set data(attrs) {};

  get mergedResources() {
    return Object.assign({}, this.resourceLists, this.resources);
  }
  actionFunction() {
    return true;
  }
}
