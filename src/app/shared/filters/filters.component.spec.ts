import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from '../testing/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './filters.component';
import { MaterialModule } from '@angular/material';
import { ActivatedRouteStub, Helper } from '../../core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LabelPipe } from '../pipes/label.pipe';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  const ars: ActivatedRouteStub = new ActivatedRouteStub();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MaterialModule, RouterTestingModule ],
      declarations: [ FiltersComponent, LabelPipe ],
      providers: [{ provide: ActivatedRoute, useValue: ars}]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
