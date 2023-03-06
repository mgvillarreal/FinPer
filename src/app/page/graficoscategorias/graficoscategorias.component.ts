import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, layouts, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import  html2canvas  from 'html2canvas'
import { catchError, throwError } from 'rxjs';
import { MovimientosService } from 'src/app/services/movimientos.service';

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

  constructor(private movimientoService: MovimientosService)
  {
    this.traeDatos();
  }

  ngOnInit(): void {
    // this.creaGraficoIngresos();
    // this.creaGraficoGastos();
  }

  traeDatos()
  {
    this.movimientoService.traeMovimientosMes(localStorage.getItem('id'), this.mesActual+1, this.anioActual)
    .pipe(
      catchError((error: any) => {
        //this.muestraGraficoFlag = 0;
        return throwError(error);
      })
    )
    .subscribe((data) => {
      this.dataMovimientos = data;
      for (let datos of this.dataMovimientos) {
        if (datos.tmov_descripcion == 'Ingreso') {
          this.totalIngresos += Number(datos.mov_monto);
          this.categoriasIngreso.push(datos.cmov_descripcion);
        } else { //datos.tmov_descripcion == 'Egreso'
          this.totalEgresos += Number(datos.mov_monto);
          this.categoriasEgreso.push(datos.cmov_descripcion);
        }
        console.log("Datos Gráfico: ", datos);
      }

      for(let datos of this.dataMovimientos){
       let porcentaje = 0;
        if(datos.tmov_descripcion == 'Ingreso'){
          porcentaje = Number((Number(Number(datos.mov_monto)/this.totalIngresos)*100).toFixed(2));
          this.porcentajesIngresos.push(porcentaje);
        } else {
          porcentaje = Number((Number(Number(datos.mov_monto)/this.totalEgresos)*100).toFixed(2));
          this.porcentajesEgresos.push(porcentaje);
        }
      }

      this.creaGraficoIngresos();
      this.creaGraficoGastos();
    });
  }

  changeMes(){
    this.mesActual = Number(this.mesActual);
    this.anioActual = Number(this.anioActual);
  }

  creaGraficoIngresos(): void {
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

    new Chart(chartItem, config);
  }

  creaGraficoGastos(): void {
    Chart.register(...registerables);

    const data = {
      labels:
        // [ '%Alquiler', '%Expensas', '%Servicios', '%Supermercado', '%Tarjeta de Crédito', '%Farmacia', '%Recargas', '%Suscripciones', '%Recreación'],
        this.categoriasEgreso,
      datasets: [{
        label: 'Mis Cuentas',
        data: this.porcentajesEgresos, //[20, 5, 5],
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

    let myChart = new Chart(chartItem, config);
    myChart.clear();
  }

  descargaCategoria(){
    let pdf = new jsPDF()//('p', 'mm', 'a4',1); // A4 size page of PDF
    pdf.text('Informe Mensual Categorias '+this.arrMeses[this.mesActual]+' '+this.anioActual.toString(),50,10);
    pdf.addImage('./assets/img/icons/FinPerLogo.png','png',15, 1,10,10);

    var data = document.getElementById('grafico-ingresosmensual');
    html2canvas(data).then(canvas => {
      var imgWidth = 100;
      var pageHeight = 190;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png', 10)
      var options = {
      size: '70px',
      background: '#fff',
      pagesplit: true,
    };
    var position = 25;
    var width = pdf.internal.pageSize.width;
    var height = pdf.internal.pageSize.height;
    pdf.addImage(contentDataURL, 'PNG', 5,  position, imgWidth, imgHeight)
    pdf.addImage(contentDataURL, 'PNG', 5,  position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)//, options);
      //pdf.addImage(contentDataURL2, 'PNG', 50, position, imgWidth, imgHeight)//, options);
      heightLeft -= pageHeight;
    }
    //pdf.save('Movimientos Ingreso Categorias.pdf'); // Generated PDF
  });

    var data1 = document.getElementById('grafico-gastosmensual');
    html2canvas(data1).then(canvas => {
      var imgWidth = 100;
      var pageHeight = 190;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL2 = canvas.toDataURL('image/png', 10)
      var options = {
      size: '70px',
      background: '#fff',
      pagesplit: true,
    };
    var position = 25;
    var width = pdf.internal.pageSize.width;
    var height = pdf.internal.pageSize.height;

  
    pdf.addImage(contentDataURL2, 'PNG', 105,  position, imgWidth, imgHeight)
    pdf.addImage(contentDataURL2, 'PNG', 105,  position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      //pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)//, options);
      pdf.addImage(contentDataURL2, 'PNG', 105, position, imgWidth, imgHeight)//, options);
      heightLeft -= pageHeight;
    }
    pdf.save('Movimientos Categorias.pdf'); // Generated PDF
  });
  
    
  }
  
}
