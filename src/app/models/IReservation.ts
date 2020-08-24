export interface IReservation {
  id?: string;
  uid: string;
  name: string; //displayName: string;
  type: string; 
  employe: string;
  date: string;
  heure: string;
  createdAt: number;
}
