import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorHandlingService } from './../error-handling.service';

@Injectable()
export class FakeApiService {
  constructor (
    private http: Http,
    private errorHandling: ErrorHandlingService) {}
}
