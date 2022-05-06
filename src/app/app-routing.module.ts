import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'ingreso', component: IngresoComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'principal', component: PrincipalComponent},
  { path: 'comofunciona', component: ComofuncionaComponent},
  { path: 'faqs', component: FaqsComponent},
  { path: 'informes', component: InformesComponent},
  { path: 'metas', component: MetasComponent},
  { path: 'soporte', component: SoporteComponent},
  { path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
