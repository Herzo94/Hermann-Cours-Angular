import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireDispoReservationComponent } from './horaire-dispo-reservation.component';

describe('HoraireDispoReservationComponent', () => {
  let component: HoraireDispoReservationComponent;
  let fixture: ComponentFixture<HoraireDispoReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraireDispoReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireDispoReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
