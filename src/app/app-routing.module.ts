import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProfilComponent } from './profil/profil.component';
import { ContactComponent } from './contact/contact.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { FourOhFourComponent } from './four-oh-four-component/four-oh-four-component.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CommandeComponent } from './commande/commande.component';
import { AuthService } from './service/auth-service.service'; 
import { ProductInsertComponent } from './product/product-insert/product-insert.component';
import { ReservationInsertComponent } from './reservation/reservation-insert/reservation-insert.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { ReservationEditComponent } from './reservation/reservation-edit/reservation-edit.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { PrestationComponent } from './prestation/prestation.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  
  //{ path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-list', canActivate: [AuthGuardService] , component: UserListComponent },
  { path: 'user-details/:id', /*canActivate: [AuthGuardService] ,*/ component: UserDetailsComponent },
  //{ path: 'user', canActivate: [AuthGuardService], component: UserComponent },
  { path: 'prestation', canActivate: [AuthGuardService] , component: PrestationComponent },
  { path: 'dashboard', canActivate: [AuthGuardService] , component: DashboardComponent },
  { path: 'product', canActivate: [AuthGuardService] , component: ProductComponent, children: [
    { path: '', component: ProductListComponent },
    { path: 'insert', component: ProductInsertComponent},
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent}
  ] },
  { path: 'reservation', canActivate: [AuthGuardService] , component: ReservationComponent, children: [
    { path: '', component: ReservationListComponent },
    { path: 'insert', component: ReservationInsertComponent},
    { path: ':id', component: ReservationDetailComponent },
    { path: ':id/edit', component: ReservationEditComponent}
  ]
 },
  { path: 'commande', canActivate: [AuthGuardService] , component: CommandeComponent },
  { path: 'profil', canActivate: [AuthGuardService] , component: ProfilComponent },
  { path: 'contact', canActivate: [AuthGuardService] , component: ContactComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full'},
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
