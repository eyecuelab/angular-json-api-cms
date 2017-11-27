import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '../testing/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

import { DrawerTabsComponent } from './drawer-tabs.component';

describe('DrawerTabsComponent', () => {
  let component: DrawerTabsComponent;
  let fixture: ComponentFixture<DrawerTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ DrawerTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DrawerTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // TODO: 'There is no directive with "exportAs" set to "routerLinkActive"'
});
