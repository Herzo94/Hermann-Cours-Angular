import { TestBed } from '@angular/core/testing';

import { PersonalReservationService } from './personal-reservation.service';

describe('PersonalReservationService', () => {
  let service: PersonalReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
