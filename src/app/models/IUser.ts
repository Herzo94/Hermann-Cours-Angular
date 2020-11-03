export interface IUser {
    id?: string; 
    //uid: string; //Problème ici ?
    displayName: string;
    email: string;
    password: string; 
    type: string;
    createdAt: string;
    tel: number;
  }