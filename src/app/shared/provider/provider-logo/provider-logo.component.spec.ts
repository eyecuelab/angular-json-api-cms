import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '../../../shared/testing/shared.module';

import { ProviderLogoComponent } from './provider-logo.component';
import { ActivatedRouteStub } from '../../../core/testing';
import { ActivatedRoute } from '@angular/router';

describe('ProviderLogoComponent', () => {
  let component: ProviderLogoComponent;
  let fixture: ComponentFixture<ProviderLogoComponent>;
  const ars: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedTestingModule ],
      declarations: [  ],
      providers: [ { provide: ActivatedRoute, useValue: ars } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
