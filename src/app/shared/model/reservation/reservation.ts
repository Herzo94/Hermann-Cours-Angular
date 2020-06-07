export interface IReservation {
    id: number
    reservationName: string
    reservationDate: string
}

export class Reservation implements IReservation {
    public id: number
    public reservationName: string
    public reservationDate: string

  
    constructor(data: IReservation) {
        this.fromData(data)
    }
  
    private fromData(data: IReservation) {
        this.id = data.id || null
        this.reservationName = data.reservationName || ''
        this.reservationDate = data.reservationDate || ''
    }
  
    public toString(): string {
        return `${this.id} - ${this.reservationName } - ${this.reservationDate}`
    }
  }
  
