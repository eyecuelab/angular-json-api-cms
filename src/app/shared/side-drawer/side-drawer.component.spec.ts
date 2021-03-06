import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '../testing/shared.module';

import { SideDrawerComponent } from './side-drawer.component';

describe('SideDrawerComponent', () => {
  let component: SideDrawerComponent;
  let fixture: ComponentFixture<SideDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
