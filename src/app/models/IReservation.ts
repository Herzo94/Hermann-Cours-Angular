export interface IReservation {
    id?: number; // on met le "?" car propriété de l'interface est optionnel donc pas obligé de le renseigner très pratique pour créer une resa car pas encore ID // ? = Optionnel //Depuis ES06
    uid: string; //clé étrangère de l'utilisateur connecté
    name: string;
    type: string; 
    employe: string;
    date: string;
    heure: string;
  }
