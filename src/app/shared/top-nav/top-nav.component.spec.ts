import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavComponent } from './top-nav.component';
import { SharedTestingModule } from '../testing/shared.module';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../core/testing';
import { UserFixture } from '../../core/testing/fixtures/user.fixture';
import * as Faker from 'faker';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;
  const ars: ActivatedRouteStub = new ActivatedRouteStub();
  // const user: UserFixture;

  ars.addToResourceList( 'user', 0 , {
    first_name: Faker.name.firstName(),
    last_name: Faker.name.lastName(),
    phone: Faker.phone.phoneNumber(),
    email: Faker.internet.email(),
    image_urls: { thumb: Faker.image.avatar() }
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedTestingModule ],
      declarations: [ ],
      providers: [ { provide: ActivatedRoute, useValue: ars } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
