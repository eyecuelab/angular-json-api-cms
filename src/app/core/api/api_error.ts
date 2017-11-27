import { Type, plainToClass } from 'class-transformer';

export class ErrorSource {
  parameter: string;
}

export class ApiError {
  status: number;
  title: string;
  detail: string;
  @Type(() => ErrorSource)
  source: ErrorSource;

  get param(): string {
    return this.source && this.source.parameter;
  }

  static fromPlainObject(json: any): ApiError {
    return plainToClass<ApiError, Object>(ApiError, json);
  }

  get notFound(): boolean {
    return this.status === 404;
  }
}
