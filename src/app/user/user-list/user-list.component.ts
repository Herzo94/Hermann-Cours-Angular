import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/service/user.service';
import { IUser } from '../../models/IUser';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UserInsertComponent } from '../user-insert/user-insert.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users$: Observable<any[]>;
  /*private usersCollection: AngularFirestoreCollection<IUser>;
  users$: Observable<IUser[]>
  users: IUser[] = [];
  sub;
  public searchTerm: string = '';
*/
  //constructor(private userService: UserService, private router : Router, public authService : AuthService, public modalController: ModalController) { }

  constructor(private afs: UserService, public authService : AuthService, public modalController: ModalController) { }

  ngOnInit(): void {
    this.users$ = this.afs.getUsers();
  }

  public async insertUser(){
  
    const modal = await this.modalController.create({
      component: UserInsertComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();  
}
  
  /*async ngOnInit() {
    
    this.usersCollection = await this.userService.readUser();
    this.sub = this.usersCollection.valueChanges({
      idField: 'id',
      
    }).subscribe(data => {
      this.users = data;
    }) 
  }

  userSearch: string;

 */

}
