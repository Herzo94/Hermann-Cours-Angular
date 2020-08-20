export interface IPersonalReservation { //Question : Cette interface n'est pas utile puisq'il y a l'interface "IReservation.ts" qui fait la même chose
  id?: number; 
  uid: string; //clé étrangère de l'utilisateur connecté
  name: string;
  type: string; 
  employe: string;
  date: string;
  heure: string;
}