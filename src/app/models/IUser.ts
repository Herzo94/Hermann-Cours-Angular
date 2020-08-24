export interface IUser {
    id?: string; 
    //uid: string; //Problème ici ?
    name: string;
    email: string;
    password: string; 
    type: string;
    createdAt: string;
  }