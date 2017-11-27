import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorHandlingService } from './../core/error-handling.service';
import { ApiError } from './../core/api/api_error';

@Component({
  selector: 'app-oops',
  templateUrl: './oops.component.html',
  styleUrls: ['./oops.component.scss']
})
export class OopsComponent {
  constructor (private errorHandler: ErrorHandlingService) {}

  get errors(): ApiError[] {
    return this.errorHandler.errors;
  }
}
