import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit/*, OnDestroy*/ {
  private usersCollection: AngularFirestoreCollection<unknown>;
  users$: Observable<IUser[]>;
  users: IUser[] = [];
  sub;
  public searchTerm: string = '';
  public userSearch: string = '';

  user;
  photo = { file: '', title: '' };
  photoServerURL;
  uploadedImgURL = '';
  personalSpace;

  constructor (private userService: UserService, public authService : AuthService, public modalController: ModalController, private afStorage: AngularFireStorage) { }

  async ngOnInit() {

    this.usersCollection = await this.userService.readUser();
    console.log("UsersCollection : ", this.usersCollection);
    this.sub = this.usersCollection.valueChanges({
      idField: 'id',
      
    }).subscribe(data => {
      console.log('Code à décomenter : //this.users = data ')
      //this.users = data;
    })
    
  }

  onFileChange(e) {
    console.log(e.target.files[0]);
    this.photo.file = e.target.files[0];
  }

  /*
    postPhoto() {
    console.log(this.photo);
    const uid = this.user.uid;
    const photoPathOnServer = `image-producs/${uid}/${this.photo.title}`;
    const photoRef = this.afStorage.ref(photoPathOnServer);
    this.photoServerURL = '';

    console.log('photoPathOnServer', photoPathOnServer);
    console.log('uid', uid);
    console.log('this.photo.file', this.photo.file);
    console.log('this.photo.title', this.photo.title);

    const currentUpload = this.afStorage.upload(
      photoPathOnServer,
      this.photo.file
    );

    currentUpload.catch((err) => console.error(err));

    currentUpload
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.photoServerURL = photoRef.getDownloadURL();
          this.photoServerURL.subscribe((data) => {
            console.log('data >>> ', data);
            this.uploadedImgURL = data;
            this.db.updatePersonalSpacePhotoURLs(
              this.user,
              this.uploadedImgURL
            );
          });
        })
      )
      .subscribe();

    // clear form
    this.photo = { file: '', title: '' };
  }
  */



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
    this.userService.deleteUser(id)

    await Toast.show({ 
      text: 'Suppression effectuée avec succès!'
    });
  }
  
 ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
