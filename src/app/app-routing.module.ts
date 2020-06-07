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

const routes: Routes = [
  
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product', component: ProductComponent, children: [
    { path: '', component: ProductListComponent },
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent}
  ] },
  { path: 'reservation', component: ReservationComponent },
  { path: 'commande', component: CommandeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
