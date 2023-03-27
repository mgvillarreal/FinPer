import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraficoscategoriasComponent } from 'src/app/page/graficoscategorias/graficoscategorias.component';

@Component({
  selector: 'app-graficosprincipal',
  templateUrl: './graficosprincipal.component.html',
  styleUrls: ['./graficosprincipal.component.css']
})

export class GraficosprincipalComponent implements OnInit {

  muestraGrafico = 0;

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022, 2023, 2024];
  mesActual:number = Number(new Date().getMonth());
  anioActual:number =  Number(new Date().getFullYear());

  constructor(private router: Router,
    private GraficosCategorias: GraficoscategoriasComponent
    ) { }

  ngOnInit(): void {
  }

  cambiaMes(){
    this.mesActual = Number(this.mesActual)+1;
    this.anioActual = Number(this.anioActual);
    console.log("fecha: ", this.mesActual, this.anioActual)
  }

  esResolucionChica() {
    return window.innerWidth < 768;
  }

  manejoBotonInformeCategorias(){
    if (this.esResolucionChica()) {
      console.log('Acción en resolución menor a 768px');
      console.log("fecha en funcion: ", this.mesActual, this.anioActual);
      this.GraficosCategorias.traeDatosPrincipal(this.mesActual, this.anioActual);
      this.GraficosCategorias.descargaCategoriaPrincipal();
    } else {
      console.log('Acción en resolución mayor o igual a 768px');
      this.router.navigate(['/graficoscategoriasmensual']);
    }
  }

}
