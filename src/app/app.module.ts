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
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaComponent } from './page/categoria/categoria.component';
import { HttpClientModule } from '@angular/common/http';


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
    CategoriaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
