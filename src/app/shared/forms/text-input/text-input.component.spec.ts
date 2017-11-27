import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { TextInputComponent } from './text-input.component';
import { SharedTestingModule } from '../../testing/shared.module';
import { ActivatedRouteStub } from '../../../core/testing';
import { ActivatedRoute } from '@angular/router';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;
  const ars: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedTestingModule],
      declarations: [ ],
      providers: [{ provide: ActivatedRoute, useValue: ars }]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
