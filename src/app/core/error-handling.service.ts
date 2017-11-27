import { Injectable } from '@angular/core';

import { ApiError } from './api/api_error';

@Injectable()
export class ErrorHandlingService {
  errors: Array<ApiError> = [];
}
