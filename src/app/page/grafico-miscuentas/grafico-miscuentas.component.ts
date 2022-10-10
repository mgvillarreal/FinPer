import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartConfiguration, ChartItem, registerables} from 'node_modules/chart.js';

@Component({
  selector: 'app-grafico-miscuentas',
  templateUrl: './grafico-miscuentas.component.html',
  styleUrls: ['./grafico-miscuentas.component.css']
})
export class GraficoMiscuentasComponent implements OnInit {

  @Input() porcentajeIngreso = 0;
  @Input() porcentajeEgreso = 0;

  constructor() { }

  ngOnInit(): void {
    this.creaGrafico();
  }

  /* GRAFICO DE LINEA
  creaGrafico(): void {
    Chart.register(...registerables);

    const data = {
      labels: ['Enero','Febrero','Marzo','Abril','Mayo', 'Junio'],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [10, 5, 2, 20, 30, 45],
      }]
    }

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: false
        }
      }
    }

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: options
    }

    const chartItem: ChartItem = document.getElementById('my-chart') as ChartItem

    new Chart(chartItem, config)
  }*/

  creaGrafico(): void {
    Chart.register(...registerables);

    const data = {
      labels: [
        '% Ingresos',
        '% Gastos',
      ],
      datasets: [{
        label: 'Mis Cuentas',
        //data: [76, 24],
        data: [this.porcentajeIngreso, this.porcentajeEgreso],
        backgroundColor: [
          '#3fd22f',
          'rgba(255, 0, 0, 0.903)',
        ],
        hoverOffset: 4
      }]
    };

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: data,
    };

    const chartItem: ChartItem = document.getElementById('grafico-miscuentas') as ChartItem;

    new Chart(chartItem, config);
  }

}
