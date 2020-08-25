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

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductSearchPipe } from './product/product-search.pipe';
import { ReservationSearchPipe } from './reservation/reservation-search.pipe';
import { UserSearchPipe } from './user/user-search.pipe';
import { ReservationComponent } from './reservation/reservation.component';
import { FourOhFourComponent } from './four-oh-four-component/four-oh-four-component.component'
import { ReservationEditComponent } from './reservation/reservation-edit/reservation-edit.component';
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
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserInsertComponent } from './user/user-insert/user-insert.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';
import { InsertMesReservationComponent } from './mes-reservations/insert-mes-reservation/insert-mes-reservation.component';
import { HoraireDispoReservationComponent } from './horaire-dispo-reservation/horaire-dispo-reservation.component';
import { HoraireDispoInsertReservationComponent } from './horaire-dispo-reservation/horaire-dispo-insert-reservation/horaire-dispo-insert-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SidenavComponent,
    ProductSearchPipe,
    ProductEditComponent,
    ProductListComponent,
    ProductDetailComponent,
    ReservationComponent,
    ReservationSearchPipe,
    FourOhFourComponent,
    ReservationEditComponent,
    ProductInsertComponent,
    ModalComponent,
    ReservationInsertComponent,
    ReservationListComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    UserDetailComponent,
    UserInsertComponent,
    UserEditComponent,
    UserListComponent,
    UserSearchPipe,
    MesReservationsComponent,
    InsertMesReservationComponent,
    HoraireDispoReservationComponent,
    HoraireDispoInsertReservationComponent,
  
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