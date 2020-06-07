import { Injectable } from '@angular/core';
import { IReservation, Reservation } from './../reservation/reservation'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationsFromAPI: IReservation[] = [
    {
        "id": 1,
        "reservationName": "TestResa1",
        "reservationDate": "20 mai 2020",
   },
    {
        "id": 2,
        "reservationName": "TestResa2",
        "reservationDate": "22 mai 2020",},
  ]

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private _reservations: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);
  private reservations$: Observable<Reservation[]> = this._reservations.asObservable();

  constructor(public http: HttpClient) {
    this.fetch()
  }
  
  public fetch() {
    // Create an observable from the get method of HttpClient service
    // which will return a IReservation[] object
    this.http.get<Reservation[]>('http://localhost:3000/reservations').pipe(
      map(reservations => reservations.map(reservation => new Reservation(reservation))),
      tap(reservations => console.log(`Reservations number: ${reservations.length}`))
    ).subscribe(
      reservations => this._reservations.next(reservations)
    )
  }
  public getReservations$(): Observable<Reservation[]> {
    return this.reservations$
  }

  public getReservationById$(id: number): Observable<Reservation> {
    return this.reservations$.pipe(
      map(reservations => reservations.find(reservation => reservation.id === id))
    )
  }

  public save(reservation: IReservation): Observable<IReservation> {
    if (reservation.id === null) { // We have to create the reservation (POST)
      return this.http.post<IReservation>('http://localhost:3000/reservations', reservation, this.httpOptions).pipe(
        tap(reservation => console.log(`New reservation: ${reservation.id}`)),
        tap(() => this.fetch())
      )
    } else { // We have to update a product (PUT)
      return this.http.put<IReservation>(`http://localhost:3000/reservations/${reservation.id}`, reservation, this.httpOptions).pipe(
        tap(reservation => console.log(`Edit reservation: ${reservation.id}`)),
        tap(() => this.fetch())
      )
    }
  }
  public getReservation(): IReservation[] {
    // Use the spread operator to return a cloned version of the array
    return [...this.reservationsFromAPI]
  }
}