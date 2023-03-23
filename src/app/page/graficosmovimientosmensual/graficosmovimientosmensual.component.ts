import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import  html2canvas  from 'html2canvas'
import autotable from 'jspdf-autotable';
import { catchError, throwError } from 'rxjs';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-graficosmovimientosmensual',
  templateUrl: './graficosmovimientosmensual.component.html',
  styleUrls: ['./graficosmovimientosmensual.component.css']
})
export class GraficosmovimientosmensualComponent implements OnInit {

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022, 2023, 2024];
  mesActual:number = Number(new Date().getMonth());
  anioActual:number =  Number(new Date().getFullYear());
  categoria=[
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
  ];
  importe=[70000, 0, 15000, 32000, 8000, 8000, 24000, 16000, 16000, 8000, 8000, 40000];

  dataMovimientos:any[];
  categoriasIngreso:string[] = [];
  categoriasEgreso:string[] = [];
  categorias:string[] = [];
  montosIngresos:number[] = [];
  montosEgresos:number[] = [];
  montos:number[] = [];
  countIngresos:number = 0;
  countEgresos:number = 0;
  coloresIngresos:string[] = ['#359B08', '#50BD20', '#7EF013', '#49F013', '#38C50A', '#3CB116']
  coloresEgresos:string[] = ['#F70101', '#FA2424', '#E34040', '#CC3030', '#B33F3F', '#8A1B1B', '#EE3B29', '#EF2013', '#C6190F', '#EE533E', '#DA3B25', '#C42F1A', '#E73A22', '#B83422', '#D95D4C', '#F16552', '#F1351C', '#D54C3A', '#F7280D', '#A92311'];
  coloresCatIngresos:string[] = [];
  coloresCatEgresos:string[] = [];
  colores:string[] = [];

  myChart;

  constructor(private movimientoService: MovimientosService) {
    this.traeDatos();
  }

  ngOnInit(): void {
    //this.creaGraficoMovimientosMensual();
  }

  cambiarMes(){
    this.mesActual = Number(this.mesActual);
    this.anioActual = Number(this.anioActual);

    this.categoriasIngreso = [];
    this.categoriasEgreso = [];
    this.categorias = [];
    this.montosIngresos = [];
    this.montosEgresos = [];
    this.montos = [];
    this.countIngresos = 0;
    this.countEgresos = 0;
    this.coloresCatIngresos = [];
    this.coloresCatEgresos = [];
    this.colores = [];

    this.traeDatos();
  }

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
          this.montosIngresos.push(datos.Total_Categoria);
          this.countIngresos += 1;
        } else { //datos.tmov_descripcion == 'Egreso'
          this.categoriasEgreso.push(datos.cmov_descripcion);
          this.montosEgresos.push(datos.Total_Categoria);
          this.countEgresos += 1;
        }
        this.categorias = this.categoriasIngreso.concat(this.categoriasEgreso);
        this.montos = this.montosIngresos.concat(this.montosEgresos);
        console.log("Datos Gráfico: ", datos);
      }

      this.seleccionaColores();
      this.creaGraficoMovimientosMensual();
    });
  }

  seleccionaColores(){
    this.countIngresos -= 1;
    this.countEgresos -= 1;

    for(let i=0; i<=this.countIngresos; i++){
      this.coloresCatIngresos.push(this.coloresIngresos[i]);
    }

    for(let i=0; i<=this.countEgresos; i++){
      this.coloresCatEgresos.push(this.coloresEgresos[i]);
    }

    this.colores = this.coloresCatIngresos.concat(this.coloresCatEgresos);
  }

  creaGraficoMovimientosMensual(): void {
    if (this.myChart) {
      this.myChart.destroy();
    }

    Chart.register(...registerables);

    const data = {
      labels: this.categorias,
        datasets: [{
        label: 'Mis Movimientos',
        data: this.montos,
        backgroundColor: this.colores,
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

    this.myChart = new Chart(chartItem, config);
  }

  descargaMensual(){
    let pdf = new jsPDF();

    pdf.addImage('./assets/img/icons/FinPerLogo.png','png', 10, 7, 13, 13);
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(25); pdf.setTextColor(65,159,62);
    pdf.text('FinPer App', 25, 17);
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(12); pdf.setTextColor(0);
    pdf.text('Consulta:', 10, 27); 
    pdf.setFont('helvetica', 'normal');
    pdf.text('Informe Mensual de Movimientos', 31, 27);
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
    
    var columns = ['Categoría', 'Importe (ARS)'];
    var datosTabla = [];
    for (var key in this.categorias){
      var temp = [this.categorias[key], Number(this.montos[key]).toLocaleString()];
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

    //autotable(pdf,{columns: columns,body: datosTabla, didDrawCell: (datosTabla)=>{ margin:{100}},startY: 150,});
 
    var data = document.getElementById('grafico-movimientosmensual');
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
      //pdf.addImage(contentDataURL, 'PNG', 10,  position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)
        heightLeft -= pageHeight;
      }
    const formattedDate2 = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear().toString()}`;
    pdf.save('FinPerApp_InformeMensualMovimientos_'+formattedDate2+'.pdf');
    });


    

  }
}
