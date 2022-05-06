import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  ingreso: number = 9000
  egreso: number = 3500
  balance: number


  constructor() {
    this.balance = this.ingreso - this.egreso
  }

  ngOnInit(): void {
  }

}
