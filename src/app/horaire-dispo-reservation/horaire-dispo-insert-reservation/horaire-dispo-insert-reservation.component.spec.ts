import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireDispoInsertReservationComponent } from './horaire-dispo-insert-reservation.component';

describe('HoraireDispoInsertReservationComponent', () => {
  let component: HoraireDispoInsertReservationComponent;
  let fixture: ComponentFixture<HoraireDispoInsertReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraireDispoInsertReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireDispoInsertReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
