import { Pipe, PipeTransform } from '@angular/core';
import { IReservation } from '../models/IReservation';

@Pipe({
  name: 'reservationSearch'
})
export class ReservationSearchPipe implements PipeTransform {

  transform(value: IReservation[], term: string = ''): IReservation[] {
    console.log(value);
    if (!value) return;
    if (Array.isArray(value)) {
      return value.filter(reservation => {
       const name = reservation.name.toLowerCase()
        return name.indexOf(term.toLowerCase()) > -1
      })
    } else {
      console.error('Given value must be an array! 💥')
      return []
    }
  }

}
