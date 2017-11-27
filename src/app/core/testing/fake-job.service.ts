import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Subject } from 'rxjs/Subject';
import { FakeApiService } from './fake-api.service';
import { FakeSessionService } from './fake-session.service';
import { Action,
         ApiService,
         SessionService,
         ResourceList,
         Resource,
         Relationship
       } from '../../core';


const jobs = {
  'covered': [ ],
  'invalied': [ ],
  'out_of_state_prefixes': [ ],
  'out_of_state': [ ],
  'prefixes': [ ],
  'processed_zip_count': { }
};

@Injectable()
export class FakeJobService {
  constructor (
              private api: ApiService,
              private sessionService: SessionService) {
  }

  jobResults(jobName: any) {
    return jobs;
  }

}
