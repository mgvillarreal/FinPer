import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

@Component({
  selector: 'app-graficosmovimientosmensual',
  templateUrl: './graficosmovimientosmensual.component.html',
  styleUrls: ['./graficosmovimientosmensual.component.css']
})
export class GraficosmovimientosmensualComponent implements OnInit {

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022];
  mesActual:number = Number(new Date().getMonth());
  anioActual:number =  Number(new Date().getFullYear());

  constructor() { }

  ngOnInit(): void {
    this.creaGraficoMovimientosMensual();
  }

  changeMes(){
    this.mesActual = Number(this.mesActual);
    this.anioActual = Number(this.anioActual);
  }

  creaGraficoMovimientosMensual(): void {
    Chart.register(...registerables);

    const data = {
      labels: [
        'Alquiler',
        'Expensas',
        'Servicios',
        'Supermercado',
        'Tarjeta de Crédito',
        'Farmacia',
        'Recargas',
        'Suscripciones',
        'Recreación'
      ],
      datasets: [{
        label: 'Mis Movimientos',
        data: [32000, 8000, 8000, 24000, 16000, 16000, 8000, 8000, 40000],
        backgroundColor: [
          '#F70101',
          '#FA2424',
          '#E34040',
          '#CC3030',
          '#B33F3F',
          '#8A1B1B',
          '#EE3B29',
          '#EF2013',
          '#C6190F'
        ],
        //hoverOffset: 4
      }]
    };

    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Tittle',
            font: {
              size: 18,
              family: 'Poppins, sans-serif',
            }
          },
          legend: {
            display: false
          }
        }
      }
    };

    const chartItem: ChartItem = document.getElementById('grafico-movimientosmensual') as ChartItem;

    new Chart(chartItem, config);
  }

}
