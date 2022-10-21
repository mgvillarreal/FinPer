import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
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
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalNoticeComponent } from './components/modal/modal-notice/modal-notice.component';
import { ModalService } from './services/modal.service';
import { ValidaUsuarioComponent } from './page/valida-usuario/valida-usuario.component';
import { UltimosMovimientosComponent } from './page/ultimos-movimientos/ultimos-movimientos.component';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr);
import { DatosComponent } from './page/datos/datos.component';
import { GraficoMiscuentasComponent } from './page/grafico-miscuentas/grafico-miscuentas.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';

registerLocaleData(localeEsAr, 'es-Ar');
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
    ModalNoticeComponent,
    ValidaUsuarioComponent,
    UltimosMovimientosComponent,
    DatosComponent,
    GraficoMiscuentasComponent,
    NotificacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    ModalService,
    //{ provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalNoticeComponent,

  ]

})
export class AppModule { }
