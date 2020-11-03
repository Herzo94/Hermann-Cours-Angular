import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { FourOhFourComponent } from './four-oh-four-component/four-oh-four-component.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AuthService } from './service/auth-service.service'; 
import { ProductInsertComponent } from './product/product-insert/product-insert.component';
import { ReservationInsertComponent } from './reservation/reservation-insert/reservation-insert.component';
import { ReservationEditComponent } from './reservation/reservation-edit/reservation-edit.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './service/auth-guard.service';
import { NoAuthGuardGuard } from './service/no-auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserInsertComponent } from './user/user-insert/user-insert.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';
import { HoraireDispoReservationComponent } from './horaire-dispo-reservation/horaire-dispo-reservation.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, /*canActivate: [NoAuthGuardGuard]*/ },
  { path: 'login', component: LoginComponent/*, canActivate: [NoAuthGuardGuard]*/ },
  //{ path: '', canActivate: [AuthGuardService] , /*component: ReservationComponent,*/children: [
  { path: '', canActivate: [AuthGuardService] , component: TabsComponent, children: [ //Question : je ne souhaite pas que les clients pas admin voient les tabs

    { path: 'personalreservation', component: MesReservationsComponent},
    { path: 'reservations', component: ReservationListComponent },
    { path: 'insert', component: ReservationInsertComponent},
    { path : '', redirectTo: 'personalreservation', pathMatch: 'full'}
  ]},

  { path: 'product', canActivate: [AuthGuardService] , component: ProductListComponent, children: [
    { path: 'insert', component: ProductInsertComponent},
    /*{ path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent}*/
  ] },
 
  { path: 'user', canActivate: [AuthGuardService] , children: [
    { path: '', component: UserListComponent },
    { path: 'insert', component: UserInsertComponent},
    //{ path: ':id', component: UserDetailComponent },
    //{ path: 'details/:id', component: UserDetailComponent }
  ]},

  
 //{ path: 'personalreservation', canActivate: [AuthGuardService] , component: MesReservationsComponent },
  { path: 'horaire-resa', canActivate: [AuthGuardService] , component: HoraireDispoReservationComponent },


  { path: 'user-detail/:id', component: UserDetailComponent , canActivate: [AuthGuardService]},
  
  //tabs
  /*{
    path: 'tabs',
    component: TabsComponent,
    children:[
      { path: 'reservations', canActivate: [AuthGuardService] , children: [
        { path: '', component: ReservationListComponent },
        { path: 'insert', component: ReservationInsertComponent},
      ]},
      {
        path: 'personalreservation',
        component: MesReservationsComponent
      },
      {
        path: '',
        redirectTo: 'tabs/reservations',
        pathMatch: 'full'
      },
    ]
  },
  
  */
  //end tabs


  { path: 'not-found', component: FourOhFourComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
