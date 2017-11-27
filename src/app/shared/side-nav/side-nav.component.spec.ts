import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '../../shared/testing/shared.module';
import { ActivatedRouteStub } from '../../core/testing';
import { ActivatedRoute } from '@angular/router';
import { SideNavComponent } from './side-nav.component';


describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
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
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
