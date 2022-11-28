import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

@Component({
  selector: 'app-graficoscategorias',
  templateUrl: './graficoscategorias.component.html',
  styleUrls: ['./graficoscategorias.component.css']
})
export class GraficoscategoriasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.creaGraficoIngresos();
    this.creaGraficoGastos();
  }

  creaGraficoIngresos(): void {
    Chart.register(...registerables);

    const data = {
      labels: [
        '%Sueldo',
        '%Horas Extras',
        '%Freelance'
      ],
      datasets: [{
        label: 'Mis Cuentas',
        data: [70, 20, 10],
        backgroundColor: [
          '#359B08',
          '#50BD20',
          '#57AB33'
        ],
        hoverOffset: 4
      }]
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
    };

    const chartItem: ChartItem = document.getElementById('grafico-ingresosmensual') as ChartItem;

    new Chart(chartItem, config);
  }

  creaGraficoGastos(): void {
    Chart.register(...registerables);

    const data = {
      labels: [
        '%Alquiler',
        '%Expensas',
        '%Servicios',
        '%Supermercado',
        '%Tarjeta de Crédito',
        '%Farmacia',
        '%Recargas',
        '%Suscripciones',
        '%Recreación'
      ],
      datasets: [{
        label: 'Mis Cuentas',
        data: [20, 5, 5, 15, 10, 10, 5, 5, 25],
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
        hoverOffset: 4
      }]
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
    };

    const chartItem: ChartItem = document.getElementById('grafico-gastosmensual') as ChartItem;

    new Chart(chartItem, config);
  }

}
