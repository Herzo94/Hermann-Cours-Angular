import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Components
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { SidenavComponent } from './sidenav/sidenav.component';

// Search Module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ProfilComponent } from './profil/profil.component';
import { ContactComponent } from './contact/contact.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductSearchPipe } from './product/product-search.pipe';
import { ReservationSearchPipe } from './reservation/reservation-search.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CommandeComponent } from './commande/commande.component';
import { FourOhFourComponent } from './four-oh-four-component/four-oh-four-component.component'
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { ReservationEditComponent } from './reservation/reservation-edit/reservation-edit.component';
import { CommandeViewComponent } from './commande/commande-view/commande-view.component';
import { CommandeEditComponent } from './commande/commande-edit/commande-edit.component';
import { AuthService } from './service/auth-service.service';
import { ProductInsertComponent } from './product/product-insert/product-insert.component';
import { IonicModule } from '@ionic/angular';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { ModalComponent } from './modal/modal.component';
import { ReservationInsertComponent } from './reservation/reservation-insert/reservation-insert.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { PrestationComponent } from './prestation/prestation.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserInsertComponent } from './user/user-insert/user-insert.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PersonnalReservationComponent } from './reservation/personnal-reservation/personnal-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SidenavComponent,
    ProfilComponent,
    ContactComponent,
    ProductSearchPipe,
    ProductEditComponent,
    ProductListComponent,
    ProductDetailComponent,
    DashboardComponent,
    ReservationComponent,
    ReservationSearchPipe,
    CommandeComponent,
    FourOhFourComponent,
    ReservationDetailComponent,
    ReservationEditComponent,
    CommandeViewComponent,
    CommandeEditComponent,
    ProductInsertComponent,
    ModalComponent,
    ReservationInsertComponent,
    ReservationListComponent,
    PrestationComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    UserDetailComponent,
    UserInsertComponent,
    UserEditComponent,
    UserListComponent,
    PersonnalReservationComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
  
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }