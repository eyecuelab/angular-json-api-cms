import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '../../shared/testing/shared.module';
import { ActivatedRouteStub } from '../../core/testing';
import { ActivatedRoute } from '@angular/router';

import { MainTabsComponent } from './main-tabs.component';

describe('MainTabsComponent', () => {
  let component: MainTabsComponent;
  let fixture: ComponentFixture<MainTabsComponent>;
  const ars: ActivatedRouteStub = new ActivatedRouteStub();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedTestingModule ],
      providers: [ { provide: ActivatedRoute, useValue: ars } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
