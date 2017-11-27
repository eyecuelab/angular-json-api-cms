import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { ApiService,
         Action,
         ResourceList,
         Resource,
         SessionService,
         Relationship
        } from '../core';

import { Session } from './api/session';

const DEFAULT_INTERVAL_IN_MS = 10000;
const FINISHED_STATE = 'pending';

interface JobError {
  klass: string;
  message: string;
  backtrace: string[];
}

interface Job {
  state: string;
  ts: string;
  results?: { [x: string ]: any };
  error?: JobError;
}

@Injectable()
export class JobService {
  private jobNames: string[] = [];
  private polling = false;
  private resource: Resource;



  constructor (private api: ApiService,
               private sessionService: SessionService) {
    this.startPolling();
  }

  jobFromResList(res: ResourceList, rel: Relationship): void {
    this.resource = res.includeFromRel(rel);
  }

  jobFromRes(res: Resource, relName?: string): void {
    if (relName) {
      this.resource = res.includeFromRelName(relName);
    } else {
      this.resource = res;
    }
  }

  addJob(job: string) {
    this.jobNames.push(job);
  }

  get jobs(): { [x: string ]: Job } {
    return this.resource.attributes.jobs;
  }

  clearJobsState(jobName: string) {
    const job = this.jobs[jobName];
    if (!job) { return; }

    job.state = '';
    this.startPolling();
  }

  isJobRunning(jobName: string) {
    return this.jobs[jobName] && this.jobs[jobName].state !== FINISHED_STATE;
  }

  jobResults(jobName: string) {
    const job = this.jobs[jobName];
    if (!job) { return {}; }

    return job.results;
  }

  get jobsComplete() {
    for (const jobName of this.jobNames) {
      if (this.isJobRunning(jobName)) {
        return false;
      }
    }
    return true;
  }

  startPolling() {
    if (this.polling) { return; }
    Observable.interval(DEFAULT_INTERVAL_IN_MS).flatMap(() => {
      if (this.jobsComplete) { return Observable.of(null); }
      this.polling = true;
      return this.api.get(this.resource.links.self);
    }).subscribe((response) => {
      if (!response) { return; }
      this.resource.attributes.jobs = response.attributes.jobs;
    });
  }
}
