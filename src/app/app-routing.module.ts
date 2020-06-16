import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { ProductEditComponent } from './product/product-edit.component';
import { FourOhFourComponent } from './four-oh-four-component/four-oh-four-component.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CommandeComponent } from './commande/commande.component';
//import { AuthGuard } from './service/auth-service.service';
import { ProductInsertComponent } from './product/product-insert/product-insert.component';

const routes: Routes = [
  
  { path: 'auth', component: AuthComponent },
  { path: 'home', /*canActivate: [AuthGuard],*/ component: HomeComponent },
  { path: 'dashboard', /*canActivate: [AuthGuard],*/ component: DashboardComponent },
  { path: 'product', /*canActivate: [AuthGuard],*/ component: ProductComponent, children: [
    { path: '', component: ProductListComponent },
    { path: 'insert', component: ProductInsertComponent},
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent}
  ] },
  { path: 'reservation', /*canActivate: [AuthGuard],*/ component: ReservationComponent },
  { path: 'commande', /*canActivate: [AuthGuard],*/ component: CommandeComponent },
  { path: 'about', /*canActivate: [AuthGuard],*/ component: AboutComponent },
  { path: 'contact', /*canActivate: [AuthGuard],*/ component: ContactComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
