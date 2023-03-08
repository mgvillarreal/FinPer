import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, layouts, registerables } from 'chart.js';
import { catchError, throwError } from 'rxjs';
import { MovimientosService } from 'src/app/services/movimientos.service';

import 'chart.js/auto';

@Component({
  selector: 'app-graficoscategorias',
  templateUrl: './graficoscategorias.component.html',
  styleUrls: ['./graficoscategorias.component.css']
})
export class GraficoscategoriasComponent implements OnInit {

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022, 2023, 2024];
  mesActual:number = Number(new Date().getMonth());
  anioActual:number =  Number(new Date().getFullYear());

  dataMovimientos:any[];
  categoriasIngreso:string[] = [];
  categoriasEgreso:string[] = [];
  totalIngresos:number = 0;
  totalEgresos:number = 0;
  porcentajesIngresos:number[] = [];
  porcentajesEgresos:number[] = [];

  tempIngresos:any[] = [];
  tempEgresos:any[] = [];

  myChartIngreso;
  myChartEgreso;

  constructor(private movimientoService: MovimientosService)
  {
    this.traeDatos();
  }

  ngOnInit(): void {
    
  }

  traeDatos()
  {
    this.movimientoService.traeMovimientosGraficoCategorias(localStorage.getItem('id'), this.mesActual+1, this.anioActual)
    .pipe(
      catchError((error: any) => {
        //this.muestraGraficoFlag = 0;
        return throwError(error);
      })
    )
    .subscribe((data) => {
      this.dataMovimientos = data;
      console.log("Movimientos: ", this.dataMovimientos);

      for (let datos of this.dataMovimientos) {
        if (datos.tmov_descripcion == 'Ingreso') {
          this.categoriasIngreso.push(datos.cmov_descripcion);
          this.totalIngresos += Number(datos.Total_Categoria);
        }
        else{ //datos.tmov_descripcion == 'Egreso'
          this.categoriasEgreso.push(datos.cmov_descripcion);
          this.totalEgresos += Number(datos.Total_Categoria);
        }
      }

      for(let datos of this.dataMovimientos){
        let porcentaje = 0;
         if(datos.tmov_descripcion == 'Ingreso'){
          porcentaje = Number((Number(Number(datos.Total_Categoria)/this.totalIngresos)*100).toFixed(2));
          this.porcentajesIngresos.push(porcentaje);
        }
        else {
          porcentaje = Number((Number(Number(datos.Total_Categoria)/this.totalEgresos)*100).toFixed(2));
          this.porcentajesEgresos.push(porcentaje);
        }
      }
     
      this.creaGraficoIngresos();
      this.creaGraficoGastos();

    });
  }

  cambiaMes(){
    this.mesActual = Number(this.mesActual);
    this.anioActual = Number(this.anioActual);

    this.dataMovimientos = [];
    this.categoriasIngreso = [];
    this.categoriasEgreso = [];
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.porcentajesIngresos = [];
    this.porcentajesEgresos = [];

    this.traeDatos();
  }

  creaGraficoIngresos(): void {
    if (this.myChartIngreso) {
      this.myChartIngreso.destroy();
    }

    Chart.register(...registerables);

    const data = {
      labels: 
        this.categoriasIngreso,
      datasets: [{
        label: 'Mis Cuentas',
        data:
          this.porcentajesIngresos,
        backgroundColor: [
          '#359B08',
          '#50BD20',
          '#7EF013',
          '#49F013',
          '#38C50A',
          '#3CB116'
        ],
        hoverOffset: 4
      }]    
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Porcentaje de Ingresos por Categoría',
            font: {
              size: 18,
              family: 'Poppins, sans-serif',
            }
          },
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 11,
                family: 'Poppins, sans-serif',
              }
            }
          }
        },
        layout: {
          padding: {
            left: 15
          }
        }
      }
    };

    const chartItem: ChartItem = document.getElementById('grafico-ingresosmensual') as ChartItem;

    this.myChartIngreso = new Chart(chartItem, config);
  }

  creaGraficoGastos(): void {
    if (this.myChartEgreso) {
      this.myChartEgreso.destroy();
    }

    Chart.register(...registerables);

    const data = {
      labels: this.categoriasEgreso,
      datasets: [{
        label: 'Mis Cuentas',
        data: this.porcentajesEgresos,
        backgroundColor: [
          '#F70101',
          '#FA2424',
          '#E34040',
          '#CC3030',
          '#B33F3F',
          '#8A1B1B',
          '#EE3B29',
          '#EF2013',
          '#C6190F',
          '#EE533E',
          '#DA3B25',
          '#C42F1A',
          '#E73A22',
          '#B83422',
          '#D95D4C',
          '#F16552',
          '#F1351C',
          '#D54C3A',
          '#F7280D',
          '#A92311'
        ],
        hoverOffset: 4
      }]
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Porcentaje de Gastos por Categoría',
            font: {
              size: 18,
              family: 'Poppins, sans-serif',
            }
          },
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 11,
                family: 'Poppins, sans-serif',
              }
            }
          }
        },
        layout: {
          padding: {
            left: 15
          }
        }
      }
    };

    const chartItem: ChartItem = document.getElementById('grafico-gastosmensual') as ChartItem;
    
    this.myChartEgreso = new Chart(chartItem, config);
    
  }

}
