export interface IReservation {
    id?: number; // QuesRepondu : Pourquoi on met le point t'intérogation là ? //Réponse propriété de l'interface est optionnel donc pas obligé de le renseigner très pratique pour créer une resa car pas encore ID // ? = Optionnel //Depuis ES06
    name: string;
    type: string; 
    employe: string;
    date: string;
    heure: string;
  }
