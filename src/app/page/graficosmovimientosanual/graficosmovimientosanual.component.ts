import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { catchError, skip, throwError } from 'rxjs';
import { MetasService } from 'src/app/services/metas.service';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-graficosmovimientosanual',
  templateUrl: './graficosmovimientosanual.component.html',
  styleUrls: ['./graficosmovimientosanual.component.css']
})
export class GraficosmovimientosanualComponent implements OnInit {

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022, 2023];
  //mesActual:number = Number(new Date().getMonth());
  anioActual:number =  Number(new Date().getFullYear());

  dataMovimientos:any[];
  ingresosEne:number = 0; ingresosFeb:number = 0; ingresosMar:number = 0; ingresosAbr:number = 0; ingresosMay:number = 0; ingresosJun:number = 0; ingresosJul:number = 0; ingresosAgo:number = 0; ingresosSep:number = 0; ingresosOct:number = 0; ingresosNov:number = 0; ingresosDic:number = 0;
  egresosEne:number = 0; egresosFeb:number = 0; egresosMar:number = 0; egresosAbr:number = 0; egresosMay:number = 0; egresosJun:number = 0; egresosJul:number = 0; egresosAgo:number = 0; egresosSep:number = 0; egresosOct:number = 0; egresosNov:number = 0; egresosDic:number = 0;
  dataMontos:any[];
  ahorrosEne:number = 0; ahorrosFeb:number = 0; ahorrosMar:number = 0; ahorrosAbr:number = 0; ahorrosMay:number = 0; ahorrosJun:number = 0; ahorrosJul:number = 0; ahorrosAgo:number = 0; ahorrosSep:number = 0; ahorrosOct:number = 0; ahorrosNov:number = 0; ahorrosDic:number = 0;

  constructor(private movimientoService: MovimientosService, private metasService: MetasService) {
    this.traeMovimientos();
  }

  traeMovimientos(){
    this.movimientoService.traeMovimientosAnio(localStorage.getItem('id'), this.anioActual)
    .pipe(
      catchError((error: any) => {
        //this.muestraGraficoFlag = 0;
        return throwError(error);
      })
    )
    .subscribe((data) => {
      this.dataMovimientos = data;

      for (let datos of this.dataMovimientos) {
        if (datos.mov_idtipo == 1) //MOVIMIENTOS DE INGRESO
        { 
          //datos.mov_fcreacion.substr(5,2);
          switch(datos.mov_fcreacion.substr(5,2)){
            case '01':
              this.ingresosEne += Number(datos.mov_monto);
              break;
            case '02':
              this.ingresosFeb += Number(datos.mov_monto);
              break;
            case '03':
              this.ingresosMar += Number(datos.mov_monto);
              break;
            case '04':
              this.ingresosAbr += Number(datos.mov_monto);
              break;
            case '05':
              this.ingresosMay += Number(datos.mov_monto);
              break;
            case '06':
              this.ingresosJun += Number(datos.mov_monto);
              break;
            case '07':
              this.ingresosJul += Number(datos.mov_monto);
              break;
            case '08':
              this.ingresosAgo += Number(datos.mov_monto);
              break;
            case '09':
              this.ingresosSep += Number(datos.mov_monto);
              break;
            case '10':
              this.ingresosOct += Number(datos.mov_monto);
              break;
            case '11':
              this.ingresosNov += Number(datos.mov_monto);
              break;
            case '12':
              this.ingresosDic += Number(datos.mov_monto);
              break;
            default:
              console.log("Error al extraer el mes del movimiento.");
          }
        }
        else //MOVIMIENTOS DE EGRESO
        { 
          switch(datos.mov_fcreacion.substr(5,2)){
            case '01':
              this.egresosEne += Number(datos.mov_monto);
              break;
            case '02':
              this.egresosFeb += Number(datos.mov_monto);
              break;
            case '03':
              this.egresosMar += Number(datos.mov_monto);
              break;
            case '04':
              this.egresosAbr += Number(datos.mov_monto);
              break;
            case '05':
              this.egresosMay += Number(datos.mov_monto);
              break;
            case '06':
              this.egresosJun += Number(datos.mov_monto);
              break;
            case '07':
              this.egresosJul += Number(datos.mov_monto);
              break;
            case '08':
              this.egresosAgo += Number(datos.mov_monto);
              break;
            case '09':
              this.egresosSep += Number(datos.mov_monto);
              break;
            case '10':
              this.egresosOct += Number(datos.mov_monto);
              break;
            case '11':
              this.egresosNov += Number(datos.mov_monto);
              break;
            case '12':
              this.egresosDic += Number(datos.mov_monto);
              break;
            default:
              console.log("Error al extraer el mes del movimiento.");
          }
        }
        
      }

      this.traeAhorros();
    });
  }

  traeAhorros(){
    this.metasService.traeMontosPorAnio(localStorage.getItem('id'), this.anioActual)
    .pipe(
      catchError((error: any) => {
        //this.muestraGraficoFlag = 0;
        return throwError(error);
      })
    )
    .subscribe((data) => {
      this.dataMontos = data;

      for (let datos of this.dataMontos) {
        switch(datos.mmet_fcreacion.substr(5,2)){
          case '01':
            this.ahorrosEne += Number(datos.mmet_monto);
            break;
          case '02':
            this.ahorrosFeb += Number(datos.mmet_monto);
            break;
          case '03':
            this.ahorrosMar += Number(datos.mmet_monto);
            break;
          case '04':
            this.ahorrosAbr += Number(datos.mmet_monto);
            break;
          case '05':
            this.ahorrosMay += Number(datos.mmet_monto);
            break;
          case '06':
            this.ahorrosJun += Number(datos.mmet_monto);
            break;
          case '07':
            this.ahorrosJul += Number(datos.mmet_monto);
            break;
          case '08':
            this.ahorrosAgo += Number(datos.mmet_monto);
            break;
          case '09':
            this.ahorrosSep += Number(datos.mmet_monto);
            break;
          case '10':
            this.ahorrosOct += Number(datos.mmet_monto);
            break;
          case '11':
            this.ahorrosNov += Number(datos.mmet_monto);
            break;
          case '12':
            this.ahorrosDic += Number(datos.mmet_monto);
            break;
          default:
            console.log("Error al extraer el mes del monto.");
        }      
      }
      
      this.creaGraficoMovimientosAnual();
    });
  }
  

  ngOnInit(): void {
    //this.creaGraficoMovimientosAnual();
  }

  changeMes(){
    //this.mesActual = Number(this.mesActual);
    this.anioActual = Number(this.anioActual);
  }

  creaGraficoMovimientosAnual(): void {
    Chart.register(...registerables);

    const data = {
      labels: this.arrMeses,
      datasets: [
        {
          label: 'Ingresos',
          data: [this.ingresosEne, this.ingresosFeb, this.ingresosMar, this.ingresosAbr, this.ingresosMay, this.ingresosJun, this.ingresosJul, this.ingresosAgo, this.ingresosSep, this.ingresosOct, this.ingresosNov, this.ingresosDic],
          fill: false,
          borderColor: '#3fd22f',
          tension: 0.19,
          pointBorderColor: '#3fd22f',
          pointBackgroundColor: '#3fd22f',
        },
        {
          label: 'Gastos',
          data: [this.egresosEne, this.egresosFeb, this.egresosMar, this.egresosAbr, this.egresosMay, this.egresosJun, this.egresosJul, this.egresosAgo, this.egresosSep, this.egresosOct, this.egresosNov, this.egresosDic],
          fill: false,
          borderColor: 'rgba(255, 0, 0, 0.903)',
          tension: 0.19,
          pointBorderColor: 'rgba(255, 0, 0, 0.903)',
          pointBackgroundColor: 'rgba(255, 0, 0, 0.903)',
        },
        {
          label: 'Ahorros',
          data: [this.ahorrosEne, this.ahorrosFeb, this.ahorrosMar, this.ahorrosAbr, this.ahorrosMay, this.ahorrosJun, this.ahorrosJul, this.ahorrosAgo, this.ahorrosSep, this.ahorrosOct, this.ahorrosNov, this.ahorrosDic],
          fill: false,
          borderColor: '#F7D501',
          tension: 0.19,
          pointBorderColor: '#F7D501',
          pointBackgroundColor: '#F7D501',
        }
    ]
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        scales: {
          yAxes: {
            ticks: {
              stepSize: 20000,
              maxTicksLimit: 400000
            },
            beginAtZero: false
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Movimientos por Mes',
            font: {
              size: 18,
              family: 'Poppins, sans-serif',
            }
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: {
                size: 11,
                family: 'Poppins, sans-serif',
              },
            }
          },
        }
      }
    };

    const chartItem: ChartItem = document.getElementById('grafico-movimientosanual') as ChartItem;

    new Chart(chartItem, config);
  }

}
