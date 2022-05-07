import { Component, OnInit } from '@angular/core';
import { Movimiento } from 'src/app/models/movimiento.model';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  ingreso: number = 0
  egreso: number = 3500
  balance?: number
  tituloModal: string = 'Ingreso'
  monto: Number = 0
  montoString?: string

  ingresos: any[] =  [
    { monto: 3000, fecha: '20-04-2022' },
    { monto: 1500, fecha: '15-04-2022' }
  ]
  egresos: any[] =  [
    { monto: 1000, fecha: '17-04-2022' },
    { monto: 2000, fecha: '16-04-2022' }
  ]

  constructor() {
    this.actualizaBalances()
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
    if(tipo === 'Ingresos'){
      let movimiento = { monto: this.monto, fecha: '06-05-2022'}
      this.ingresos.push(movimiento)
    }else{
      let movimiento = { monto: this.monto, fecha: '06-05-2022'}
      this.egresos.push(movimiento)
    }
    this.monto = 0
    this.actualizaBalances()
  }

  actualizaBalances()
  {
    this.ingreso = 0
    for (let ingreso of this.ingresos)
    {
      this.ingreso += ingreso.monto
    }

    this.egreso = 0
    for (let egreso of this.egresos)
    {
      this.egreso += egreso.monto
    }

    this.balance = this.ingreso - this.egreso
  }

}
