import { Component, OnInit } from '@angular/core';
import { MovimientoI } from 'src/app/interfaces/movimiento';
import { Movimiento } from 'src/app/models/movimiento.model';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Chart, ChartConfiguration, ChartItem, registerables} from 'node_modules/chart.js';
import { Router, RouterLink } from '@angular/router';
import { CategoriaI } from 'src/app/interfaces/categoria';
import { catchError, throwError } from 'rxjs';
import { MetasService } from 'src/app/services/metas.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  ingreso: number;
  egreso: number;
  balance: number = 0;
  monto: Number = 0;
  montoString: string;
  dataMovimientos: MovimientoI[];
  fecha: Date;
  fechaActual: Date;
  sumaMontos: any;

  ingresos: any[] = [];
  egresos: any[] = [];

  /*Paginador*/
  paginaActual = 1;
  movimientosPorPagina = 10;

  /*Flags*/
  public forma: FormGroup;
  public forma2: FormGroup;
  movimiento = new Movimiento;
  muestraPrincipalFlag=1;
  nuevoIngFlag:number = 0;
  nuevoEgrFlag:number = 0;
  msjAltaOk:number = 0;
  detalleIngFlag:number = 0;
  editaIngFlag:number = 0;
  muestraMensajeActFlag:number = 0;
  preguntaEliminarFlag:number = 0;
  editaEgrFlag:number = 0;
  detalleEgrFlag:number = 0;
  muestraErrorEgFlag: number = 0;
  muestraIngresosFlag: number = 0;
  muestraEgresosFlag: number = 0;
  muestraGraficoFlag: number = 1;

  /* Grafico */
  porcentajeIngreso: number;
  porcentajeEgreso: number;
  porcentajeAhorro: number;
  porcentajes = 100;
  myChart;

  descripcionMovimiento: string;

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022, 2023];
  mesActual:number = Number(new Date().getMonth());
  anioActual:number =  Number(new Date().getFullYear());

  movimientoSeleccionado: MovimientoI;
  categorias: CategoriaI[];
  categoriasIngreso: CategoriaI[];
  categoriasEgreso: CategoriaI[];
  categoriaSeleccionada = 0;

  balanceTotal: number = 0;

  traeBalanceTotal={
    Balance:0,
  };

  montosDeAhorro:any[] = [];

  constructor(
    private movimientoService: MovimientosService,
    private metasService: MetasService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  )
  {
    this.calcula();
    this.traeSumaAhorros();
    this.traeAhorros();
  }

  ngOnInit(): void {
    this.fecha = new Date();

    this.forma = this.fb.group({
      monto: ['', [Validators.required, Validators.min(1)]],
      categoria: ['0', [Validators.required, Validators.min(1)]],
      detalle: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
    });

    this.forma2 = this.fb.group({
      monto: ['', [Validators.required, Validators.min(1)]],
      categoria: [''], //[Validators.required, Validators.min(1)]
      detalle: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
    });


    this.traeCategorias();
    this.traeBalance();
    this.traeSumaAhorros();
  }

  agregaNumero(numero: number) {
    this.montoString = String(this.monto);
    this.montoString += '' + numero;
    this.monto = Number(this.montoString);
  }

  calcula(): void {
    this.ingresos = [];
    this.egresos = [];
    this.ingreso = 0;
    this.egreso = 0;
    this.balance = 0;
   
    this.traeMovimientos();
  }

  async traeMovimientos(){
    this.movimientoService.traeMovimientosMesAnio(localStorage.getItem('id'), this.mesActual+1, this.anioActual)
    .pipe(
      catchError((error: any) => {
        this.muestraGraficoFlag = 0;
        return throwError(error);
      })
    )
    .subscribe((data) => {
      this.dataMovimientos = data;
      for (let dat of this.dataMovimientos) {
        if (dat.tmov_descripcion == 'Ingreso') {
          this.muestraIngresosFlag = 1;
          this.fecha = dat.mov_fcreacion;
          this.ingreso += Number(dat.mov_monto);
          this.balance += Number(dat.mov_monto);
          this.ingresos.push(dat);
        } else { //dat.tmov_descripcion == 'Egreso'
          this.muestraEgresosFlag = 1;
          this.balance -= Number(dat.mov_monto);
          this.egreso += Number(dat.mov_monto);
          this.egresos.push(dat);
        }
      }
      this.calculaPorcentajes();
    });
  }

  traeBalance(){
    this.movimientoService.traeBalance(localStorage.getItem('id')).subscribe(respuesta => {
      this.balanceTotal = respuesta['balance']['Balance'];
    })
  }

  async calculaPorcentajes() {
    let total = this.ingreso + this.egreso + Number(this.sumaMontos);
    console.log('Ingresos: ', this.ingreso);
    console.log('Gastos: ', this.egreso);
    console.log('Ahorros: ', Number(this.sumaMontos));
    console.log('Total: ', total);

    this.porcentajeIngreso = (this.ingreso/total)*100;
    this.porcentajeEgreso = (this.egreso/total)*100;
    this.porcentajeAhorro = (this.sumaMontos/total)*100;

    await this.creaGrafico();
  }

  seleccionaTipoMovimiento(tipoMovimiento: number) {
    this.fechaActual = new Date();
    this.categoriaSeleccionada = 0;
    if (tipoMovimiento == 1) {
      this.movimiento.tipo = 1;
      this.nuevoIngFlag = 1;
      this.muestraPrincipalFlag = 0;
    } else {
      this.movimiento.tipo = 2;
      this.nuevoEgrFlag = 1;
      this.muestraPrincipalFlag = 0;
    }
    this.forma.reset();
  }

  crearNuevoMovimiento() {
    //aca balance-ingreso
    if (this.movimiento.tipo == 2){
      if(this.balance < this.forma.value['monto']) {
        console.log('El monto ingresado es incorrecto.');
        this.muestraErrorEg();
        return
      }
    }

    this.movimiento.usuario = Number(localStorage.getItem('id'));
    this.movimiento.monto = this.forma.value['monto'];
    this.movimiento.categoria = this.forma.value['categoria'];
    this.movimiento.detalle = this.forma.value['detalle'];

    let fechaEv = new Date(this.forma.value['fecha']);

    if (isNaN(fechaEv.getTime())) {
      const dateString = this.forma.value['fecha'];
      const dateParts = dateString.split(' ');

      const dateArr = dateParts[0].split('/');
      const timeArr = dateParts[1].split(':');

      const year = +dateArr[2];
      const month = +dateArr[1] - 1;
      const day = +dateArr[0];
      const hours = +timeArr[0];
      const minutes = +timeArr[1];

      const newDate = new Date(year, month, day, hours, minutes);

      const newYear = newDate.getFullYear();
      const newMonth = ('0' + (newDate.getMonth() + 1)).slice(-2);
      const newDay = ('0' + newDate.getDate()).slice(-2);
      const newHours = ('0' + newDate.getHours()).slice(-2);
      const newMinutes = ('0' + newDate.getMinutes()).slice(-2);

      const formattedDate = `${newYear}-${newMonth}-${newDay}T${newHours}:${newMinutes}`;

      this.movimiento.fecha = formattedDate;
    } else { 
      this.movimiento.fecha = this.forma.value['fecha'];
    }

    this.movimientoService.guardaMovimiento(this.movimiento).subscribe((data) => {
      this.calcula();
      this.creaGrafico();
    });

    this.muestraMsjAltaOk();
    this.forma.reset();

    setTimeout(() => {
      this.calculaPorcentajes();
    }, 1500);

  }

  volveraPrincipal() {
    this.muestraPrincipalFlag = 1;
    this.nuevoIngFlag = 0;
    this.nuevoEgrFlag = 0;
    this.msjAltaOk = 0;
    this.editaIngFlag = 0;
    this.detalleIngFlag = 0;
    this.muestraMensajeActFlag = 0;
    this.detalleEgrFlag = 0;
    this.muestraErrorEgFlag = 0;
    this.muestraIngresosFlag = 0;
    this.muestraEgresosFlag = 0;

    this.muestraIngresosFlag = 0;
    this.muestraEgresosFlag = 0;

    this.forma.reset();
  }

  muestraMsjAltaOk() {
    this.msjAltaOk = 1;
    this.muestraPrincipalFlag = 0;
    this.nuevoIngFlag = 0;
    this.nuevoEgrFlag = 0;
  }

  seleccionaDetalleIng() {
    this.detalleIngFlag = 1;
    this.muestraPrincipalFlag = 0;
    this.editaIngFlag = 0;

    this.calcula();
  }

  seleccionaDetalleEgr() {
    this.detalleEgrFlag = 1;
    this.muestraPrincipalFlag = 0;
    this.editaEgrFlag = 0;

    this.calcula();
  }

  editarIngreso(movimiento) {
    if (this.editaIngFlag == 0) {
      this.editaIngFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.detalleIngFlag = 0;
    }
    console.log("movimiento seleccionado: ", this.movimiento);
    this.movimientoSeleccionado = movimiento;
    
  }

  editarEgreso(movimiento) {
    if (this.editaEgrFlag == 0) {
      this.editaEgrFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.detalleEgrFlag = 0;
    }

    this.movimientoSeleccionado = movimiento;
  }

  actualizarMovimiento() {
    //this.movimientoSeleccionado.mov_id;
    // this.movimientoSeleccionado.mov_monto = this.forma2.value['monto'];
    // this.movimientoSeleccionado.mov_idcategoria = this.forma2.value['categoria'];
    // this.movimientoSeleccionado.mov_detalle = this.forma2.value['detalle'];
    // this.movimientoSeleccionado.mov_fcreacion = this.forma2.value['fecha'];

    // let fechaEv = new Date(this.forma2.value['fecha']);

    // if (isNaN(fechaEv.getTime())) {
    //   const dateString = this.forma2.value['fecha'];
    //   const dateParts = dateString.split(' ');

    //   const dateArr = dateParts[0].split('/');
    //   const timeArr = dateParts[1].split(':');

    //   const year = +dateArr[2];
    //   const month = +dateArr[1] - 1;
    //   const day = +dateArr[0];
    //   const hours = +timeArr[0];
    //   const minutes = +timeArr[1];

    //   const newDate = new Date(year, month, day, hours, minutes);

    //   const newYear = newDate.getFullYear();
    //   const newMonth = ('0' + (newDate.getMonth() + 1)).slice(-2);
    //   const newDay = ('0' + newDate.getDate()).slice(-2);
    //   const newHours = ('0' + newDate.getHours()).slice(-2);
    //   const newMinutes = ('0' + newDate.getMinutes()).slice(-2);

    //   const formattedDate = `${newYear}-${newMonth}-${newDay}T${newHours}:${newMinutes}`;

    //   this.movimientoSeleccionado.mov_fcreacion = formattedDate;
    // }

    console.log("movimiento seleccionado: ", this.movimientoSeleccionado);
    this.movimientoService.editaUnMovimiento(this.movimientoSeleccionado).subscribe();
    this.muestraMensajeActOk();
  }

  muestraMensajeActOk() {
    if (this.muestraMensajeActFlag == 0) {
      this.muestraMensajeActFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.editaIngFlag = 0;
      this.editaEgrFlag = 0;
    }
  }

  muestraErrorEg(){
    if(this.muestraErrorEgFlag == 0){
      this.muestraErrorEgFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.editaIngFlag = 0;
      this.editaEgrFlag = 0;
      this.nuevoEgrFlag = 0;
    }
  }

  preguntaEliminar() {
    if (this.preguntaEliminarFlag == 0) {
      this.preguntaEliminarFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.editaIngFlag = 0;
      this.editaEgrFlag = 0;
    }
  }

  eliminaMovimiento() {
    console.log("movimiento seleccionado tipo: ", this.movimientoSeleccionado.mov_idtipo);
    if(this.movimientoSeleccionado.mov_idtipo == 1){ //Si es un ingreso
      this.detalleIngFlag = 1;
      this.detalleEgrFlag = 0;
      this.editaIngFlag = 0;
      this.editaEgrFlag = 0;
    }else{ //Si es un egreso
      this.detalleEgrFlag = 1;
      this.detalleIngFlag = 0;
      this.editaEgrFlag = 0;
      this.editaIngFlag = 0;
    }
    this.preguntaEliminarFlag = 0;

    let data = {
      id: this.movimientoSeleccionado.mov_id
    }

    this.movimientoService.borraUnMovimiento(data).subscribe(resp => {
      this.calcula();
    })

  }

  cancelaEliminar() {
    if(this.movimientoSeleccionado.mov_idtipo==1){ //Si es un ingreso
      this.editaIngFlag = 1;
    }else{ //Si es un egreso
      this.editaEgrFlag = 1;
    }
    this.muestraPrincipalFlag = 0;
    this.preguntaEliminarFlag = 0;
  }

  traeCategorias() {
    this.movimientoService.traeCategorias().subscribe((resp) => {
      this.categorias = resp;
      this.divisorCategoria();
    });
  }

  changeMes(){
    this.mesActual = Number(this.mesActual);
    this.anioActual = Number(this.anioActual);
    this.calcula();
    this.creaGrafico();
  }

  seleccionaUltMovimientos(mes, anio){
    this.movimientoService.anioUltMov = anio;
    this.movimientoService.mesUltMov = mes+1;
    this.movimientoService.usuUltMov = localStorage.getItem('id');

    this.router.navigate(['ultimosmovimientos']);
  }

  /* CARD AHORROS */
  traeSumaAhorros(){
    let idUsuario = localStorage.getItem('id');
    this.metasService.traeSumaMontos(idUsuario, this.mesActual+1, this.anioActual).subscribe((respuesta) => {
      this.sumaMontos = respuesta[0]['SUM(monto)'];
    });
  }

  traeAhorros(){
    let idUsuario = localStorage.getItem('id');
    this.metasService.traeMontosDeAhorro(idUsuario, this.mesActual, this.anioActual).subscribe((respuesta => {
      this.montosDeAhorro =  respuesta;
    }));
  }

  /* GRAFICO */
  creaGrafico(): void {
    if (this.myChart) {
      this.myChart.destroy();
      //this.myChart.update();
    }

    Chart.register(...registerables);

    const data = {
      labels: [
        '% Ingresos',
        '% Gastos',
        '% Ahorros'
      ],
      datasets: [{
        label: 'Mis Cuentas',
        data: [this.porcentajeIngreso, this.porcentajeEgreso, this.porcentajeAhorro],
        backgroundColor: [
          '#3fd22f',
          'rgba(255, 0, 0, 0.903)',
          '#F7D501'
        ],
        hoverOffset: 4
      }]
    };

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: data,
    };

    const chartItem: ChartItem = document.getElementById('grafico-miscuentas') as ChartItem;

    //this.myChart = new Chart(chartItem, config);
    new Chart(chartItem, config);
  }

  divisorCategoria(){
    this.categoriasIngreso = this.categorias.filter(categoria => categoria.cmov_tipo == 1)
    this.categoriasEgreso = this.categorias.filter(categoria => categoria.cmov_tipo == 2)
  }

  getPage(page: number): void {
    this.paginaActual = page;
  }

  get totalPaginasIngresos(): number {
    return Math.ceil(this.ingresos.length / this.movimientosPorPagina);
  }

  get movimientosEnPaginaIngresos(): MovimientoI[] {
    const startIndex = (this.paginaActual - 1) * this.movimientosPorPagina;
    const endIndex = startIndex + this.movimientosPorPagina;
    return this.ingresos.slice(startIndex, endIndex);
  }

  get totalPaginasEgresos(): number {
    return Math.ceil(this.egresos.length / this.movimientosPorPagina);
  }

  get movimientosEnPaginaEgresos(): MovimientoI[] {
    const startIndex = (this.paginaActual - 1) * this.movimientosPorPagina;
    const endIndex = startIndex + this.movimientosPorPagina;
    return this.egresos.slice(startIndex, endIndex);
  }
}
