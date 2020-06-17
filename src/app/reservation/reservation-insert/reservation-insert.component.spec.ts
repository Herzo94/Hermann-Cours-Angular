import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationInsertComponent } from './reservation-insert.component';

describe('ReservationInsertComponent', () => {
  let component: ReservationInsertComponent;
  let fixture: ComponentFixture<ReservationInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
