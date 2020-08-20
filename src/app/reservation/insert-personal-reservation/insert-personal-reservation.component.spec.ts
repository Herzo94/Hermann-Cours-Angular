import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPersonalReservationComponent } from './insert-personal-reservation.component';

describe('InsertPersonalReservationComponent', () => {
  let component: InsertPersonalReservationComponent;
  let fixture: ComponentFixture<InsertPersonalReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPersonalReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPersonalReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
