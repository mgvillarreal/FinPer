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
    this.creaGraficoMovimientosMensual();
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
          this.categoriasIngreso.push(datos.cmov_descripcion);
          this.montosIngresos.push(datos.mov_monto);
          this.countIngresos += 1;
        } else { //datos.tmov_descripcion == 'Egreso'
          this.categoriasEgreso.push(datos.cmov_descripcion);
          this.montosEgresos.push(datos.mov_monto);
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

  changeMes(){
    this.mesActual = Number(this.mesActual);
    this.anioActual = Number(this.anioActual);
  }

  creaGraficoMovimientosMensual(): void {
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

    if (this.myChart) {
      this.myChart.destroy();
    }

    this.myChart = new Chart(chartItem, config);
  }

  descargaMensual(){
    let pdf = new jsPDF()//('p', 'mm', 'a4',1); // A4 size page of PDF
    pdf.text('Informe Movimientos Mensuales '+this.arrMeses[this.mesActual]+' '+this.anioActual.toString(),50,10);
    pdf.text('',1,20);
    var columns = ['Categoria', 'Importe'];
    var datosTabla = []
    
    for (var key in this.categoria){
      var temp = [this.categoria[key],this.importe[key]];
      datosTabla.push(temp);
    }
    autotable(pdf,{columns: columns,body: datosTabla, didDrawCell: (datosTabla)=>{ margin:{100}},});
 
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
    var position = 135;
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
