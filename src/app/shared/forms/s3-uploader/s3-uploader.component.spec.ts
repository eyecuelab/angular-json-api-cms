import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { S3UploaderComponent } from './s3-uploader.component';
import { RouterLinkStubDirective } from '../../../../testing/router-stubs';
import { SharedTestingModule } from '../../testing/shared.module';

describe('S3UploaderComponent', () => {
  let component: S3UploaderComponent;
  let fixture: ComponentFixture<S3UploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, SharedTestingModule ],
      declarations: [ RouterLinkStubDirective ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(S3UploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
