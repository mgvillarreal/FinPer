import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { AutGuard } from './guards/aut.guard';
import { CategoriaComponent } from './page/categoria/categoria.component';
import { ComofuncionaComponent } from './page/comofunciona/comofunciona.component';
import { ErrorComponent } from './page/error/error.component';
import { FaqsComponent } from './page/faqs/faqs.component';
import { InformesComponent } from './page/informes/informes.component';
import { IngresoComponent } from './page/ingreso/ingreso.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { MetasComponent } from './page/metas/metas.component';
import { PrincipalComponent } from './page/principal/principal.component';
import { RegistroComponent } from './page/registro/registro.component';
import { SoporteComponent } from './page/soporte/soporte.component';
import { UltimosMovimientosComponent } from './page/ultimos-movimientos/ultimos-movimientos.component';
import { ValidaUsuarioComponent } from './page/valida-usuario/valida-usuario.component';

const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'ingreso', component: IngresoComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'miscuentas', component: PrincipalComponent, canActivate: [AutGuard]},
  { path: 'comofunciona', component: ComofuncionaComponent},
  { path: 'faqs', component: FaqsComponent},
  { path: 'informes', component: InformesComponent},
  { path: 'metas', component: MetasComponent},
  { path: 'soporte', component: SoporteComponent},
  { path: 'categoria', component: CategoriaComponent},
  { path: 'modal', component: ModalComponent},
  { path: 'validausuario', component: ValidaUsuarioComponent},
  { path: 'ultimosmovimientos', component: UltimosMovimientosComponent},
  { path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
