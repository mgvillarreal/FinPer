import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  ingreso: number = 9000
  egreso: number = 3500
  balance: number
  tituloModal?: string


  constructor() {
    this.balance = this.ingreso - this.egreso
  }

  ngOnInit(): void {
  }

  modalIngreso(){
    this.tituloModal = 'Ingresos'
  }

}
