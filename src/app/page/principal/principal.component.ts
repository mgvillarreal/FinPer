import { Component, OnInit } from '@angular/core';
import { MovimientoI } from 'src/app/interfaces/movimiento';
import { Movimiento } from 'src/app/models/movimiento.model';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Chart, ChartConfiguration, ChartItem, registerables} from 'node_modules/chart.js';
import { Router, RouterLink } from '@angular/router';

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

  ingresos: any[] = [];
  egresos: any[] = [];

  /*NUEVO*/
  public forma: FormGroup;
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

  porcentajeIngreso: number;
  porcentajeEgreso: number;

  porcentajes = 100;

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022];
  mesActual:number = Number(new Date().getMonth());
  anioActual:number =  Number(new Date().getFullYear());

  movimientoSeleccionado: MovimientoI;
  categorias = [];

  balanceTotal

  constructor(
    private movimientoService: MovimientosService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.calcula();
  }

  ngOnInit(): void {
    this.fecha = new Date();

    /*NUEVO*/
    this.forma = this.fb.group({
      monto: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', []],
      detalle: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
    });

    this.traeCategorias();
    this.traeBalance()

  }

  agregaNumero(numero: number) {
    this.montoString = String(this.monto);
    this.montoString += '' + numero;
    this.monto = Number(this.montoString);
  }

  calcula(): void {
    // console.log(this.mesActual)
    this.ingresos = [];
    this.egresos = [];
    this.ingreso = 0;
    this.egreso = 0;
    this.balance = 0;
    this.movimientoService
      .traeMovimientosMes(localStorage.getItem('id'), this.mesActual+1, this.anioActual)
      .subscribe((respuesta) => {
        // console.log(respuesta);
        this.dataMovimientos = respuesta;
        for (let dat of this.dataMovimientos) {
          if (dat.tmov_descripcion == 'Ingreso') {
            this.muestraIngresosFlag = 1;
            this.fecha = dat.mov_fcreacion;
            this.ingreso += Number(dat.mov_monto);
            this.balance += Number(dat.mov_monto);
            this.ingresos.push(dat);
          } else {
            //console.log("Tambien entre aca (o no)")
            this.muestraEgresosFlag = 1;
            this.balance -= Number(dat.mov_monto);
            this.egreso += Number(dat.mov_monto);
            this.egresos.push(dat);
          }
        }
        //console.info(this.ingreso)

          this.calculaPorcentajes();
        });
  }

  traeBalance(){
    this.movimientoService.traeBalance(localStorage.getItem('id')).subscribe(resp => {
      console.log(resp)
    })
  }

  calculaPorcentajes(): void{
    let total = this.ingreso + this.egreso;
    // console.log('ingreso: ', this.ingreso);
    // console.log('egreso: ', this.egreso);
    // console.log('total: ', total);

    this.porcentajeIngreso = (7250.5/total)*100;
    this.porcentajeEgreso = (2300/total)*100;

    this.creaGrafico();

    // console.log('porcentajes: ', this.porcentajeIngreso, this.porcentajeEgreso);
  }

  /*NUEVO*/
  seleccionaTipoMovimiento(tipoMovimiento: number) {
    if (tipoMovimiento == 1) {
      this.movimiento.tipo = 1;
      this.nuevoIngFlag = 1;
      this.muestraPrincipalFlag = 0;
    } else {
      this.movimiento.tipo = 2;
      this.nuevoEgrFlag = 1;
      this.muestraPrincipalFlag = 0;
    }
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
    this.movimiento.fecha = this.forma.value['fecha'];
    this.movimientoService
      .guardaMovimiento(this.movimiento)
      .subscribe((data) => {
        console.log(data);
        this.calcula();
      });
    this.muestraMsjAltaOk();

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
  }

  seleccionaDetalleEgr() {
    this.detalleEgrFlag = 1;
    this.muestraPrincipalFlag = 0;
    this.editaEgrFlag = 0;
  }

  editarIngreso(movimiento) {
    if (this.editaIngFlag == 0) {
      this.editaIngFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.detalleIngFlag = 0;
    }

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
    this.movimientoService.editaUnMovimiento(this.movimientoSeleccionado).subscribe()
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
    this.detalleIngFlag = 1;
    this.editaIngFlag = 0;
    this.preguntaEliminarFlag = 0;

    let data = {
      id: this.movimientoSeleccionado.mov_id
    }

    this.movimientoService.borraUnMovimiento(data).subscribe(resp => {
      this.calcula()
    })

    console.log('Eliminar: ', this.movimientoSeleccionado.mov_id);
  }

  cancelaEliminar() {
    this.muestraPrincipalFlag = 0;
    this.editaIngFlag = 1;
    this.preguntaEliminarFlag = 0;
  }

  traeCategorias() {
    this.movimientoService.traeCategorias().subscribe((resp) => {
      this.categorias = resp;
      console.log(this.categorias)
    });
  }

  changeMes(){
    this.mesActual = Number(this.mesActual)
    this.anioActual = Number(this.anioActual)
    this.calcula()
  }

  seleccionaUltMovimientos(mes, anio){
    console.log('Fecha para ultimos movimientos: ', mes, anio);
    this.router.navigate(['ultimosmovimientos']);
  }

  /* GRAFICO */
  creaGrafico(): void {
    Chart.register(...registerables);

    const data = {
      labels: [
        '% Ingresos',
        '% Gastos',
        '% Ahorros'
      ],
      datasets: [{
        label: 'Mis Cuentas',
        //data: [76, 24],
        data: [this.porcentajeIngreso, this.porcentajeEgreso],
        //data: [70, 20, 10],
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

    new Chart(chartItem, config);
  }
}
