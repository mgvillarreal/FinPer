import { Component, OnInit } from '@angular/core';
import { MovimientoI } from 'src/app/interfaces/movimiento';
import { Movimiento } from 'src/app/models/movimiento.model';
import { MovimientosService } from 'src/app/services/movimientos.service';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  ingreso!: number
  egreso!: number
  balance: number = 0
  tituloModal: string = 'Ingreso'
  monto: Number = 0
  montoString?: string
  dataMovimientos: MovimientoI[]
  fecha: Date

  ingresos: any[] =  []
  egresos: any[] =  []

  constructor(
    private movimientoService: MovimientosService
    ) {
    this.calcula()
  }

  ngOnInit(): void {
  }

  modalIngreso(){
    this.tituloModal = 'Ingresos'
  }

  modalEgreso(){
    this.tituloModal = 'Egresos'
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
      console.log(this.dataMovimientos)
      for(let dat of this.dataMovimientos)
      {
        if(dat[0].mov_idtipo==1){
          console.log("Entre aca")
          this.fecha = dat[0].mov_fcreacion
          this.ingreso += Number(dat[0].mov_monto)
          this.balance += Number(dat[0].mov_monto)
        }else{
          console.log("Tambien entre aca (o no)")
          this.balance -= Number(dat[0].mov_monto)
          this.egreso += Number(dat[0].mov_monto)
        }
      }
      console.info(this.ingreso)
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

}
