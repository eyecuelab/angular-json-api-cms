import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from '../../shared/testing/shared.module';

import { ResetPasswordComponent } from './reset-password.component';
import { TextInputComponent } from '../../shared';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedTestingModule ],
      declarations: [ ResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
