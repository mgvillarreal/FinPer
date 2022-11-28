import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

@Component({
  selector: 'app-graficosmovimientosanual',
  templateUrl: './graficosmovimientosanual.component.html',
  styleUrls: ['./graficosmovimientosanual.component.css']
})
export class GraficosmovimientosanualComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.creaGraficoMovimientosAnual();
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
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
        },
        {
          label: 'Gastos',
          data: [70000, 60000, 80000, 85000, 65000, 100000, 90000, 90000, 100000, 90000, 100000, 160000],
          fill: false,
          borderColor: '#EE270C',
          tension: 0.1
        },
    ]
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    };

    const chartItem: ChartItem = document.getElementById('grafico-movimientosanual') as ChartItem;

    new Chart(chartItem, config);
  }

}
