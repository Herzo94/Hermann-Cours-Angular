import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
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
import { ProductChildComponent } from './product/product-child.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SidenavComponent,
    AboutComponent,
    ContactComponent,
    StarComponent,
    HomeComponent,
    ProductChildComponent,
  
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
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }