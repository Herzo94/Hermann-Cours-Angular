import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

//Components
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { SidenavComponent } from './sidenav/sidenav.component';

// Search Module
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { StarComponent } from './shared/star/star.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { ProductEditComponent } from './product/product-edit.component';
import { ProductSearchPipe } from './product/product-search.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CommandeComponent } from './commande/commande.component';
import { FourOhFourComponent } from './four-oh-four-component/four-oh-four-component.component'
import { AuthComponent } from './auth/auth.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { ReservationEditComponent } from './reservation/reservation-edit/reservation-edit.component';
import { ReservationViewComponent } from './reservation/reservation-view/reservation-view.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SidenavComponent,
    AboutComponent,
    ContactComponent,
    StarComponent,
    HomeComponent,
    ProductSearchPipe,
    ProductEditComponent,
    ProductListComponent,
    ProductDetailComponent,
    DashboardComponent,
    ReservationComponent,
    CommandeComponent,
    FourOhFourComponent,
    AuthComponent,
    ReservationDetailComponent,
    ReservationEditComponent,
    ReservationViewComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }