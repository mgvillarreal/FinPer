import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, Color, layouts, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import  html2canvas  from 'html2canvas';
import autotable, { ThemeType } from 'jspdf-autotable';
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
  ingresosMes:number[]=[];
  egresosMes:number[]=[];

  tempIngresos:any[] = [];
  tempEgresos:any[] = [];

  myChartIngreso;
  myChartEgreso;

  constructor(private movimientoService: MovimientosService)
  {
    this.traeDatos();
  }

  ngOnInit(): void { }

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

      for (let datos of this.dataMovimientos) {
        if (datos.tmov_descripcion == 'Ingreso') {
          this.categoriasIngreso.push(datos.cmov_descripcion);
          this.totalIngresos += Number(datos.Total_Categoria);
          this.ingresosMes.push(Number(datos.Total_Categoria));
        }
        else{ //datos.tmov_descripcion == 'Egreso'
          this.categoriasEgreso.push(datos.cmov_descripcion);
          this.totalEgresos += Number(datos.Total_Categoria);
          this.egresosMes.push(Number(datos.Total_Categoria));
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
        responsive: true,
        maintainAspectRatio: false,
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
        responsive: true,
        maintainAspectRatio: false,
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

  descargaCategoria(){
    let pdf = new jsPDF();

    pdf.addImage('./assets/img/icons/FinPerLogo.png','png', 10, 7, 13, 13);
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(25); pdf.setTextColor(65,159,62);
    pdf.text('FinPer App', 25, 17);
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(12); pdf.setTextColor(0);
    pdf.text('Consulta:', 10, 27); 
    pdf.setFont('helvetica', 'normal');
    pdf.text('Informe Mensual de Categorías', 31, 27);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Período: ', 10, 33);
    pdf.setFont('helvetica', 'normal');
    pdf.text(this.arrMeses[this.mesActual]+' '+this.anioActual.toString(), 29, 33);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Nombre: ', 10, 39);
    pdf.setFont('helvetica', 'normal');
    pdf.text(localStorage.getItem('name'), 29, 39);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Fecha: ', 10, 45);
    pdf.setFont('helvetica', 'normal');
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString()}`;
    pdf.text(formattedDate, 25, 45);
    
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(14);
    pdf.text('Ingresos ', 90, 145);
    var columns = ['Categoría', 'Monto (ARS)', 'Pocentaje (%)'];
    var datosTabla = [];
    for (var key in this.categoriasIngreso){
      var temp = [this.categoriasIngreso[key], this.ingresosMes[key].toLocaleString(), this.porcentajesIngresos[key].toLocaleString()];
      datosTabla.push(temp);
    }
    
    autotable(pdf, {
      columns: columns,
      body: datosTabla,
      headStyles: {
        fillColor: '#92EA8F',
        textColor: "#FFFFFF",
        font: 'helvetica',
        fontSize: 12,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fillColor: "#FFFFFF",
        textColor: 0,
        fontSize: 10,
        font: 'helvetica',
        cellPadding: 2,
        cellWidth: 'auto'
      },
      didDrawCell: (datosTabla) =>{
        margin:{100}
      },
      startY: 150,
    });
    let finalY = (pdf as any).lastAutoTable.finalY;

    pdf.text("Egresos", 90, finalY + 10 );
    var columns2 = ['Categoría', 'Monto (ARS)', 'Porcentaje (%)'];
    var datosTabla2 = [];
    for (var key in this.categoriasEgreso){
      var temp2 = [this.categoriasEgreso[key], this.egresosMes[key].toLocaleString(), this.porcentajesEgresos[key].toLocaleString()];
      datosTabla2.push(temp2);
    }

    autotable(pdf, {
      columns: columns2,
      body: datosTabla2,
      headStyles: {
        fillColor: "#F68576",
        textColor: "#FFFFFF",
        font: 'helvetica',
        fontSize: 12,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fillColor: "#FFFFFF",
        textColor: 0,
        fontSize: 10,
        font: 'helvetica',
        cellPadding: 2,
        cellWidth: 'auto'
      },
      didDrawCell: (datosTabla2) =>{ },
      startY: finalY + 15
    });

    var data = document.getElementById('grafico-ingresosmensual');
    html2canvas(data).then(canvas => {
      var imgWidth = 90; //100
      var pageHeight = 190; //190
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png', 10)
      var options = {
        size: '70px',
        background: '#fff',
        pagesplit: true,
      };
      var position = 47; //20;
      var width = pdf.internal.pageSize.width;
      var height = pdf.internal.pageSize.height;
      pdf.addImage(contentDataURL, 'PNG', 5,  position, imgWidth, imgHeight)
      pdf.addImage(contentDataURL, 'PNG', 5,  position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight;
      }
      //pdf.save('Movimientos Ingreso Categorias.pdf');
    });

    var data1 = document.getElementById('grafico-gastosmensual');
    html2canvas(data1).then(canvas => {
      var imgWidth = 90;
      var pageHeight = 190;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL2 = canvas.toDataURL('image/png', 10)
      var options = {
        size: '70px',
        background: '#fff',
        pagesplit: true,
      };
      var position = 47;
      var width = pdf.internal.pageSize.width;
      var height = pdf.internal.pageSize.height;

  
      pdf.addImage(contentDataURL2, 'PNG', 105,  position, imgWidth, imgHeight)
      pdf.addImage(contentDataURL2, 'PNG', 105,  position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL2, 'PNG', 105, position, imgWidth, imgHeight)
        heightLeft -= pageHeight;
      }
      const formattedDate2 = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear().toString()}`;
      pdf.save('FinPerApp_InformeMensualCategorias_'+formattedDate2+'.pdf'); 
    });  
      //  const formattedDate2 = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear().toString()}`;
      //  pdf.save('FinPerApp_InformeMensualCategorias_'+formattedDate2+'.pdf'); 
  }

}
