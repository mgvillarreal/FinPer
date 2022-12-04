import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { skip } from 'rxjs';

@Component({
  selector: 'app-graficosmovimientosanual',
  templateUrl: './graficosmovimientosanual.component.html',
  styleUrls: ['./graficosmovimientosanual.component.css']
})
export class GraficosmovimientosanualComponent implements OnInit {

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022];
  mesActual:number = Number(new Date().getMonth());
  anioActual:number =  Number(new Date().getFullYear());

  constructor() { }

  ngOnInit(): void {
    this.creaGraficoMovimientosAnual();
  }

  changeMes(){
    this.mesActual = Number(this.mesActual);
    this.anioActual = Number(this.anioActual);
  }

  creaGraficoMovimientosAnual(): void {
    Chart.register(...registerables);

    const data = {
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ],
      datasets: [
        {
          label: 'Ingresos',
          data: [80000, 80000, 90000, 87000, 70000, 135000, 100000, 97000, 110000, 110000, 120000, 160000],
          fill: false,
          borderColor: '#3fd22f',
          tension: 0.19,
          pointBorderColor: '#3fd22f',
          pointBackgroundColor: '#3fd22f',
        },
        {
          label: 'Gastos',
          data: [70000, 60000, 80000, 85000, 65000, 100000, 90000, 90000, 100000, 90000, 100000, 160000],
          fill: false,
          borderColor: 'rgba(255, 0, 0, 0.903)',
          tension: 0.19,
          pointBorderColor: 'rgba(255, 0, 0, 0.903)',
          pointBackgroundColor: 'rgba(255, 0, 0, 0.903)',
        },
        {
          label: 'Ahorros',
          data: [10000, 15000, 5000, 7000, 8600, 13000, 18000, 8000, 0, 4500, 6000, 10000],
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
