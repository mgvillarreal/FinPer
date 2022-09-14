import { Component, OnInit } from '@angular/core';
import { MovimientoI } from 'src/app/interfaces/movimiento';
import { Movimiento } from 'src/app/models/movimiento.model';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  ingreso: number;
  egreso: number;
  balance: number = 0;
  monto: Number = 0;
  montoString: string;
  dataMovimientos: MovimientoI[];
  fecha: Date;

  ingresos: any[] =  [];
  egresos: any[] =  [];

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

  arrMeses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrAnios:number[] = [2021, 2022];
  mesActual = new Date().getMonth();

  constructor(private movimientoService: MovimientosService, private fb: FormBuilder, private authService: AuthService) {
    this.calcula()
  }

  ngOnInit(): void {
    this.fecha = new Date()

    /*NUEVO*/
    this.forma = this.fb.group({
      'monto': ['', [Validators.required]],
      'categoria': ['', [Validators.required]],
      'detalle': ['', [Validators.required]],
      'fecha': ['', [Validators.required]]
    });
  }

  agregaNumero(numero: number){
    this.montoString = String(this.monto)
    this.montoString += "" + numero
    this.monto = Number(this.montoString)
  }

  nuevoIngreso(tipo: string)
  {
    let movimiento;
    if(tipo === 'Ingresos'){
      movimiento = { monto: this.monto, tipo: 1 }
    }else{
      movimiento = { monto: this.monto, tipo: 2 }
    }


    this.movimientoService.guardaMovimiento(movimiento).subscribe(
      resp => {
        this.calcula()
      }
    )
    this.monto = 0

  }

  actualizaBalances()
  {

  }

  calcula(): void{
    this.ingreso = 0;
    this.egreso = 0;
    this.balance = 0;
    this.movimientoService.traeMovimientos2(localStorage.getItem('id'))
    .subscribe(respuesta => {
      this.dataMovimientos  = respuesta
      for(let dat of this.dataMovimientos)
      {
        //console.log(dat)
        if(dat.tmov_descripcion=='Ingreso'){
          //console.log("Entre aca")
          this.fecha = dat.mov_fcreacion
          this.ingreso += Number(dat.mov_monto)
          this.balance += Number(dat.mov_monto)
        }else{
          //console.log("Tambien entre aca (o no)")
          this.balance -= Number(dat.mov_monto)
          this.egreso += Number(dat.mov_monto)
        }
      }
      //console.info(this.ingreso)
    })

  }

  calculaEgresos(): number{
    let egreso = 0
    this.movimientoService.traeMovimientos2('11')
    .subscribe(respuesta => {
      let { data } = respuesta
      data = JSON.parse(data)
      for(let dat of data)
      {
        if(dat['tipo']==2){
          egreso += dat['monto']
        }
      }
    })
    return egreso
  }

  /*NUEVO*/
  seleccionaTipoMovimiento(tipoMovimiento: number){
  
    if(tipoMovimiento == 1){
      this.movimiento.tipo = 1;
      this.nuevoIngFlag = 1;
      this.muestraPrincipalFlag = 0;
    }
    else{
      this.movimiento.tipo = 2;
      this.nuevoEgrFlag = 1;
      this.muestraPrincipalFlag = 0;
    }
  }

  crearNuevoMovimiento(){
    this.movimiento.usuario = Number(localStorage.getItem("id"));
    this.movimiento.monto = this.forma.value['monto'];
    this.movimiento.categoria = this.forma.value['categoria'];
    this.movimiento.detalle = this.forma.value['detalle'];
    this.movimiento.fecha = this.forma.value['fecha'];
    console.log('Movimiento creado: ', this.movimiento);
    this.muestraMsjAltaOk();
  }

  volveraPrincipal(){
    this.muestraPrincipalFlag = 1;
    this.nuevoIngFlag = 0;
    this.nuevoEgrFlag = 0;
    this.msjAltaOk = 0;
    this.editaIngFlag = 0;
    this.detalleIngFlag = 0;
    this.muestraMensajeActFlag = 0;
    this.detalleEgrFlag = 0;
  }

  muestraMsjAltaOk(){
    this.msjAltaOk = 1;
    this.muestraPrincipalFlag = 0;
    this.nuevoIngFlag = 0;
    this.nuevoEgrFlag = 0;
  }

  seleccionaDetalleIng(){
    this.detalleIngFlag = 1;
    this.muestraPrincipalFlag = 0;
    this.editaIngFlag = 0;
  }

  seleccionaDetalleEgr(){
    this.detalleEgrFlag = 1;
    this.muestraPrincipalFlag = 0;
    this.editaEgrFlag = 0;
  }

  editarIngreso(){
    if(this.editaIngFlag==0){
      this.editaIngFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.detalleIngFlag = 0;
    }
  }

  editarEgreso(){
    if(this.editaEgrFlag==0){
      this.editaEgrFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.detalleEgrFlag = 0;
    }
  }


  actualizarMovimiento(){
    this.movimiento.usuario = Number(localStorage.getItem("id"));
    this.movimiento.monto = this.forma.value['monto'];
    this.movimiento.categoria = this.forma.value['categoria'];
    this.movimiento.detalle = this.forma.value['detalle'];
    this.movimiento.fecha = this.forma.value['fecha'];
    console.log('Movimiento modificado: ', this.movimiento);

    this.muestraMensajeActOk();
  }

  muestraMensajeActOk(){
    if(this.muestraMensajeActFlag==0){
      this.muestraMensajeActFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.editaIngFlag = 0;
      this.editaEgrFlag = 0;
    }
  }

  preguntaEliminar(){
    if(this.preguntaEliminarFlag==0){
      this.preguntaEliminarFlag = 1;
      this.muestraPrincipalFlag = 0;
      this.editaIngFlag = 0;
      this.editaEgrFlag = 0;
    }
  }

  eliminaMovimiento(){
    this.detalleIngFlag = 1;
    this.editaIngFlag = 0;
    this.preguntaEliminarFlag = 0;
  }

  cancelaEliminar(){
    this.muestraPrincipalFlag = 0;
    this.editaIngFlag = 1;
    this.preguntaEliminarFlag = 0;
  }
}
