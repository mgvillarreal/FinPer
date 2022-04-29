import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { FooterComponent } from './components/footer/footer.component';
import { IngresoComponent } from './page/ingreso/ingreso.component';

@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    FooterComponent,
    IngresoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
