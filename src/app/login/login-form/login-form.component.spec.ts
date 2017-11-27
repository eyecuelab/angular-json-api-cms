import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from '../../shared/testing/shared.module';

import { LoginFormComponent } from './login-form.component';
import { TextInputComponent } from '../../shared';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedTestingModule ],
      declarations: [ LoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
