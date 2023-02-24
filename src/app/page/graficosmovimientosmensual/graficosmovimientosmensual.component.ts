import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import  html2canvas  from 'html2canvas'


@Component({
  selector: 'app-graficosmovimientosmensual',
  templateUrl: './graficosmovimientosmensual.component.html',
  styleUrls: ['./graficosmovimientosmensual.component.css']
})
export class GraficosmovimientosmensualComponent implements OnInit {

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022, 2023];
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
        'Sueldo',
        'Horas Extras',
        'Frelancee',
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
        data: [70000, 0, 15000, 32000, 8000, 8000, 24000, 16000, 16000, 8000, 8000, 40000],
        backgroundColor: [
          '#359B08',
          '#50BD20',
          '#57AB33',
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
            text: 'Movimientos en un Mes',
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

  descargaMensual(){
    
    var data = document.getElementById('grafico-movimientosmensual');
    html2canvas(data).then(canvas => {
      var imgWidth = 200;
      var pageHeight = 190;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png', 10)
      var options = {
      size: '70px',
      background: '#fff',
      pagesplit: true,
    };
    let pdf = new jsPDF()//('p', 'mm', 'a4',1); // A4 size page of PDF
    pdf.text('Informe Movimientos Mensuales '+this.arrMeses[this.mesActual]+' '+this.anioActual.toString(),50,10);
    var position = 15;
    var width = pdf.internal.pageSize.width;
    var height = pdf.internal.pageSize.height;
    pdf.addImage(contentDataURL, 'PNG', 5,  position, imgWidth, imgHeight)
    pdf.addImage(contentDataURL, 'PNG', 5,  position, imgWidth, imgHeight);
    /*pdf.addImage(contentDataURL, 'PNG', 2, position, imgWidth, imgHeight, options)
    pdf.addImage(contentDataURL, 'PNG', 2, position, imgWidth, imgHeight, options);*/
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)//, options);
      heightLeft -= pageHeight;
    }
    pdf.save('Movimientos Mensuales.pdf'); // Generated PDF
    });


  }
}
