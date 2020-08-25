import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { first } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../modal/modal.component';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() data: IUser;  
  public userForm: FormGroup;
  message = '';
  

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userService : UserService, private router: Router, public modalController: ModalController) { }

   async ngOnInit(): Promise<void> {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.userForm.patchValue(this.data); //met le contenu dans le formulaire
  }

   async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async onUpdateReservation() {
    console.log('this.suggestionForm.value', this.userForm.value);
    const result = await this.userService.updateUserWithUID(this.userForm.value as any);
    this.modalController.dismiss();

    await Toast.show({ 
      text: 'Mise à jour effectué avec succès!'
    });
  }
}

