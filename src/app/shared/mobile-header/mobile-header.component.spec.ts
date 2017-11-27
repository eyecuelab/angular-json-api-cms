import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from '../testing/shared.module';
import { MobileHeaderComponent } from './mobile-header.component';
import { ActivatedRouteStub } from '../../core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from '../../core/provider.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkStubDirective } from '../../../testing/router-stubs';
import {FakeProviderService } from '../../core/testing/fake-provider.service';

describe('MobileHeaderComponent', () => {
  let component: MobileHeaderComponent;
  let fixture: ComponentFixture<MobileHeaderComponent>;
  const ars: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedTestingModule, RouterTestingModule ],
      declarations: [ RouterLinkStubDirective  ],
      providers: [ {provide: ProviderService, useValue: FakeProviderService} ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MobileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeDefined();
  });
});
