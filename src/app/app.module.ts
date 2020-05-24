import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { SidenavComponent } from './sidenav/sidenav.component';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';

import {MatIconModule} from '@angular/material/icon';

import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SidenavComponent,
  
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
  ],
  providers: [],
  /*exports: [
    MatSidenav
  ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }