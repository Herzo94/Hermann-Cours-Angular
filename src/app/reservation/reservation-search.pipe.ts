import { Pipe, PipeTransform } from '@angular/core';
import { Reservation } from '../models/reservation';

@Pipe({
  name: 'reservationSearch'
})
export class ReservationSearchPipe implements PipeTransform {

  transform(value: Reservation[], term: string = ''): Reservation[] {
    if (Array.isArray(value)) {
      return value.filter(reservation => {
        //const name = reservation.reservationName.toLowerCase()
        //return name.indexOf(term.toLowerCase()) > -1
      })
    } else {
      console.error('Given value must be an array! 💥')
      return []
    }
  }

}
