import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { AutGuard } from './guards/aut.guard';
import { CategoriaComponent } from './page/categoria/categoria.component';
import { ComofuncionaComponent } from './page/comofunciona/comofunciona.component';
import { DatosComponent } from './page/datos/datos.component';
import { ErrorComponent } from './page/error/error.component';
import { FaqsComponent } from './page/faqs/faqs.component';
import { GraficoMiscuentasComponent } from './page/grafico-miscuentas/grafico-miscuentas.component';
import { InformesComponent } from './page/informes/informes.component';
import { IngresoComponent } from './page/ingreso/ingreso.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { MetasComponent } from './page/metas/metas.component';
import { PrincipalComponent } from './page/principal/principal.component';
import { RegistroComponent } from './page/registro/registro.component';
import { SoporteComponent } from './page/soporte/soporte.component';
import { UltimosMovimientosComponent } from './page/ultimos-movimientos/ultimos-movimientos.component';
import { ValidaUsuarioComponent } from './page/valida-usuario/valida-usuario.component';
import { AuthGuard } from './guardian/auth.guard';
import { NoauthGuard } from './guardian/noauth.guard';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent},
  { path: 'ingreso', component: IngresoComponent, canActivate:[NoauthGuard]},
  { path: 'registro', component: RegistroComponent, canActivate:[NoauthGuard]},
  { path: 'miscuentas', component: PrincipalComponent, canActivate: [AuthGuard]},
  { path: 'comofunciona', component: ComofuncionaComponent},
  { path: 'faqs', component: FaqsComponent},
  { path: 'informes', component: InformesComponent, canActivate: [AuthGuard]},
  { path: 'metas', component: MetasComponent, canActivate: [AuthGuard]},
  { path: 'soporte', component: SoporteComponent, canActivate: [AuthGuard]},
  { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard]},
  { path: 'modal', component: ModalComponent, canActivate: [AuthGuard] },
  { path: 'validausuario/:id', component: ValidaUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'validausuario/:id/:token', component: ValidaUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'ultimosmovimientos', component: UltimosMovimientosComponent, canActivate: [AuthGuard]},
  { path: 'misdatos', component: DatosComponent, canActivate: [AuthGuard]},
  { path: 'grafico-miscuentas', component: GraficoMiscuentasComponent, canActivate: [AuthGuard]},
  { path: 'notificaciones', component: NotificacionesComponent, canActivate: [AuthGuard]},
  { path: '**', component: ErrorComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
