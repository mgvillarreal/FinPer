import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import  html2canvas  from 'html2canvas';
import autotable from 'jspdf-autotable';
//import 'jspdf-autotable';
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
  anioActual:number =  Number(new Date().getFullYear());
  ingresos=[];
  egresos=[];
  ahorros=[];

  dataMovimientos:any[];
  ingresosEne:number = 0; ingresosFeb:number = 0; ingresosMar:number = 0; ingresosAbr:number = 0; ingresosMay:number = 0; ingresosJun:number = 0; ingresosJul:number = 0; ingresosAgo:number = 0; ingresosSep:number = 0; ingresosOct:number = 0; ingresosNov:number = 0; ingresosDic:number = 0;
  egresosEne:number = 0; egresosFeb:number = 0; egresosMar:number = 0; egresosAbr:number = 0; egresosMay:number = 0; egresosJun:number = 0; egresosJul:number = 0; egresosAgo:number = 0; egresosSep:number = 0; egresosOct:number = 0; egresosNov:number = 0; egresosDic:number = 0;
  dataMontos:any[];
  ahorrosEne:number = 0; ahorrosFeb:number = 0; ahorrosMar:number = 0; ahorrosAbr:number = 0; ahorrosMay:number = 0; ahorrosJun:number = 0; ahorrosJul:number = 0; ahorrosAgo:number = 0; ahorrosSep:number = 0; ahorrosOct:number = 0; ahorrosNov:number = 0; ahorrosDic:number = 0;

  myChart;

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
    this.ingresos=[this.ingresosEne,this.ingresosFeb,this.ingresosMar,this.ingresosAbr,this.ingresosMay,this.ingresosJun,this.ingresosJul,this.ingresosAgo,this.ingresosSep,this.ingresosOct,this.ingresosNov,this.ingresosDic];
    this.egresos=[this.egresosEne,this.egresosFeb,this.egresosMar,this.egresosAbr,this.egresosMay,this.egresosJun,this.egresosJul,this.egresosAgo,this.egresosSep,this.egresosOct,this.egresosNov,this.egresosDic];

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
      console.log("ahorros: ", this.dataMontos)
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
      this.ahorros=[this.ahorrosEne,this.ahorrosFeb,this.ahorrosMar,this.ahorrosAbr,this.ahorrosMay,this.ahorrosJun,this.ahorrosJul,this.ahorrosAgo,this.ahorrosSep,this.ahorrosOct,this.ahorrosNov,this.ahorrosDic];

      this.creaGraficoMovimientosAnual();
    });
  }

  ngOnInit(): void {

  }

  cambiaAnio(){
    this.anioActual = Number(this.anioActual);

    this.dataMovimientos = [];
    this.ingresosEne = 0; this.ingresosFeb = 0; this.ingresosMar = 0; this.ingresosAbr = 0; this.ingresosMay = 0; this.ingresosJun = 0; this.ingresosJul = 0; this.ingresosAgo = 0; this.ingresosSep = 0; this.ingresosOct = 0; this.ingresosNov = 0; this.ingresosDic = 0;
    this.egresosEne = 0; this.egresosFeb = 0; this.egresosMar = 0; this.egresosAbr = 0; this.egresosMay = 0; this.egresosJun = 0; this.egresosJul = 0; this.egresosAgo = 0; this.egresosSep = 0; this.egresosOct = 0; this.egresosNov = 0; this.egresosDic = 0;
    this.dataMontos = [];
    this.ahorrosEne = 0; this.ahorrosFeb = 0; this.ahorrosMar = 0; this.ahorrosAbr = 0; this.ahorrosMay = 0; this.ahorrosJun = 0; this.ahorrosJul = 0; this.ahorrosAgo = 0; this.ahorrosSep = 0; this.ahorrosOct = 0; this.ahorrosNov = 0; this.ahorrosDic = 0;

    this.traeMovimientos();
  }

  creaGraficoMovimientosAnual(): void {
    if (this.myChart) {
      this.myChart.destroy();
    }

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
        responsive: true,
        maintainAspectRatio: false,
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

    this.myChart = new Chart(chartItem, config);
  }

  descargaAnual(){
    let pdf = new jsPDF()
    pdf.addImage('./assets/img/icons/FinPerLogo.png','png', 10, 7, 13, 13);
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(25); pdf.setTextColor(65,159,62);
    pdf.text('FinPer App', 25, 17);
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(12); pdf.setTextColor(0);
    pdf.text('Consulta:', 10, 27); 
    pdf.setFont('helvetica', 'normal');
    pdf.text('Informe Anual de Movimientos', 31, 27);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Período: ', 10, 33);
    pdf.setFont('helvetica', 'normal');
    pdf.text(this.anioActual.toString(), 29, 33);
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

    var columns = ['Mes', 'Ingresos (ARS)', 'Egresos (ARS)','Ahorros (ARS)'];
    var datosTabla = []
    for (var key in this.arrMeses){
      var temp = [this.arrMeses[key], this.ingresos[key].toLocaleString(), this.egresos[key].toLocaleString(), this.ahorros[key].toLocaleString()];
      datosTabla.push(temp);
    }

    autotable(pdf, {
      columns: columns,
      body: datosTabla,
      headStyles: {
        fillColor: '#419f3e',
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

    var data = document.getElementById('grafico-movimientosanual');
    html2canvas(data).then(canvas => {
      var imgWidth = 190;
      var pageHeight = 190;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png', 10)
      var options = {
        size: '70px',
        background: '#fff',
        pagesplit: true,
      };

      var position = 47;
      var width = pdf.internal.pageSize.width;
      var height = pdf.internal.pageSize.height;
      pdf.addImage(contentDataURL, 'PNG', 10,  position, imgWidth, imgHeight)
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)
        heightLeft -= pageHeight;
      }
      
      const formattedDate2 = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear().toString()}`;
      pdf.save('FinPerApp_InformeAnualMovimientos_'+formattedDate2+'.pdf');
    });

  }

}
