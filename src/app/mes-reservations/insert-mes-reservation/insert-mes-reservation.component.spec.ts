import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMesReservationComponent } from './insert-mes-reservation.component';

describe('InsertMesReservationComponent', () => {
  let component: InsertMesReservationComponent;
  let fixture: ComponentFixture<InsertMesReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertMesReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertMesReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
