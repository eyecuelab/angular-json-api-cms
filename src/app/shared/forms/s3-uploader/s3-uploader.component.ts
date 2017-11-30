import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';

import { ApiService, SessionService, Session, Field, Action } from './../../../core';

@Component({
  selector: 'app-s3-uploader',
  templateUrl: './s3-uploader.component.html',
  styleUrls: ['./s3-uploader.component.scss']
})
export class S3UploaderComponent implements OnInit {
  @Input() action: Action;
  @Input() field: string;
  @Input() config: string;
  @Input() defaultStatus = 'Drag and Drop File Here';
  @Input() failStatus = 'Invalid File';
  @Input() successStatus = 'Uploaded!';
  @Input() buttonLabel = 'Upload From Desktop';
  @Input() allowedExtensions = [];
  @Input() compact = false;
  @Output() success = new EventEmitter<any>();
  @Output() failure = new EventEmitter<any>();
  status: string;
  credentials: any;
  fieldIndex: number;
  formControlName: string;
  showProgressBar = false;
  file: any;
  progress: number;
  creds: any;

  constructor(protected sessionService: SessionService,
              private api: ApiService) { }

  ngOnInit() {
    this.fieldIndex = this.action.fields.findIndex(field => field.name === this.field);
    this.formControlName = this.field;
    this.status = this.defaultStatus;
  }

  changeStatus(newStatus: string) {
    this.status = newStatus;
    setTimeout(() => {
      this.status = this.defaultStatus;
    }, 5000);
  }

  upload(value) {
    this.showProgressBar = true;
    this.creds = value.attributes;
    this.uploadToS3().map(res => res).subscribe(res => this.afterUpload(res));
  }

  afterUpload(res) {
    const url = this.uploadHost + this.creds.key.replace('${filename}', '') + this.file.name;
    this.showProgressBar = false;
    this.setFieldValue(url);
    this.changeStatus(this.successStatus);
    this.success.emit(url);
  }

  filesChanged(e) {
    this.file = e.target.files[0];
    this.requestCredentials().subscribe((value) => this.upload(value));
  }

  filesDropped(files) {
    this.file = files[0];
    this.requestCredentials().subscribe(value => this.upload(value));
  }

  invalidFiles(error) {
    this.failure.emit(error);
    this.changeStatus(this.failStatus);
  }

  requestCredentials(): Observable<Session> {
    const response = this.api.actionRequest(this.configAction,
                                            { mode: this.config,
                                              mimetype: this.file.type }, Session);
    response.subscribe(
      value => value,
      error => this.invalidFiles(error));
    return response;
  }

  uploadToS3() {
    return Observable.fromPromise(new Promise((resolve, reject) => {
      const fd = new FormData();

      fd.append('key', this.creds.key);
      fd.append('AWSAccessKeyId', this.creds.awsAccessKeyId);
      fd.append('acl', this.creds.acl);
      fd.append('success_action_status', '201');
      fd.append('policy', this.creds.s3Policy);
      fd.append('signature', this.creds.s3Signature);
      // fd.append('utf8', '');
      if (this.creds.contentType) {
        fd.append('Content-Type', this.file.type);
      }
      // File must be added last
      fd.append('file', this.file);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e: any) => {
        if (e.lengthComputable) {
          this.progress = Math.round(e.loaded * 100 / e.total);
        }
      });

      xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };

      xhr.open('POST', this.uploadHost, true);
      xhr.send(fd);
    }));
  }

  setFieldValue(value) {
    const data = {};
    data[this.formControlName] = value;
    this.form.patchValue(data);
    this.action.fields[this.fieldIndex].value = value;
  }

  get uploadHost(): string {
    return 'https://' + this.creds.s3Bucket + '.s3-us-west-2.amazonaws.com/';
  }

  get configAction(): Action {
    return this.sessionService.instance.action('uploader_config');
  }

  get form(): FormGroup {
    return this.action.form;
  }
}
