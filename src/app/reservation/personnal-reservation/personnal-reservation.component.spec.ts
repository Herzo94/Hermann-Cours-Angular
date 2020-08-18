import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalReservationComponent } from './personnal-reservation.component';

describe('PersonnalReservationComponent', () => {
  let component: PersonnalReservationComponent;
  let fixture: ComponentFixture<PersonnalReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnalReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnalReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
