import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SharedTestingModule } from '../../testing/shared.module';
import { SelectComponent } from './select.component';
import { ActivatedRouteStub } from '../../../core/testing';
import { ActivatedRoute } from '@angular/router';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  const ars: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedTestingModule ],
      declarations: [  ],
      providers: [{ provide: ActivatedRoute, useValue: ars }]
    })
    .compileComponents();
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SelectComponent);
  //   component = fixture.componentInstance;
  //   component.name = 'test'
  //   let controls = {}
  //   controls[component.name] = new FormControl()
  //   component.form = new FormGroup(controls)
  //   fixture.detectChanges();
  // });
  //
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
