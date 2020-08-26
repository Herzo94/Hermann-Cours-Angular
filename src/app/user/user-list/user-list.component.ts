import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { UserService } from 'src/app/service/user.service';
import { IUser } from '../../models/IUser';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UserInsertComponent } from '../user-insert/user-insert.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  private usersCollection: AngularFirestoreCollection<unknown>;
  users$: Observable<any>;
  //users$: Observable<IUser[]>;
  users: IUser[] = [];
  sub;
  public searchTerm: string = '';
  public userSearch: string = '';

  user;
  photo = { file: '', title: '' };
  photoServerURL;
  uploadedImgURL = '';
  personalSpace;

  constructor (private userService: UserService, public authService : AuthService, public modalController: ModalController, private afStorage: AngularFireStorage, public alertController : AlertController) { }
 /*ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    console.log('this.users$', this.users$);
    console.log('usersCollection : ', this.usersCollection);
   }*/
  async ngOnInit() {

    this.usersCollection = await this.userService.readUser();
    console.log("UsersCollection : ", this.usersCollection);
    this.sub = this.usersCollection.valueChanges({
      idField: 'id',
      
    }).subscribe((data) => {
      this.users = data as IUser[]; 
    })
   
  }


  public async insertUser(){
  
    const modal = await this.modalController.create({
      component: UserInsertComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();  
  }

  public async updateUserWithUID(id){
  
      const modal = await this.modalController.create({
        component: UserEditComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          data: this.users.find( element => element.id === id )
        }
      });
      return await modal.present();  
  }

  async deleteUser(id){
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: "Voulez-vous vraiment supprimer cette reservation ?",
      buttons: [
        {
         text: 'Oui',
         role:'delete',
         handler: () =>{
           Toast.show({ 
            text: 'Suppression effectuée avec succès!'
          });
          this.userService.deleteUser(id)
           console.log('delete clicked');
           
         }
        },
        {
          text: 'Non',
          role:'NoDelete',
          handler: () =>{
            console.log('Cancel clicked');
          }
         },
      ]
    });
  alert.present();

    /*if(confirm('Etes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id)
    await Toast.show({ 
      text: 'Suppression effectuée avec succès!'
    });
  }*/

    
    /*if(confirm('Etes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id)
    await Toast.show({ 
      text: 'Suppression effectuée avec succès!'
    });
  }

  else {

    return null;
  }*/
}
  
 ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
