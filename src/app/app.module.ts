import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { FooterComponent } from './components/footer/footer.component';
import { IngresoComponent } from './page/ingreso/ingreso.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { PrincipalComponent } from './page/principal/principal.component';
import { FaqsComponent } from './page/faqs/faqs.component';
import { ComofuncionaComponent } from './page/comofunciona/comofunciona.component';
import { SoporteComponent } from './page/soporte/soporte.component';
import { MetasComponent } from './page/metas/metas.component';
import { InformesComponent } from './page/informes/informes.component';
import { ErrorComponent } from './page/error/error.component';
import { RegistroComponent } from './page/registro/registro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    FooterComponent,
    IngresoComponent,
    InicioComponent,
    PrincipalComponent,
    FaqsComponent,
    ComofuncionaComponent,
    SoporteComponent,
    MetasComponent,
    InformesComponent,
    ErrorComponent,
    RegistroComponent,
    ModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
