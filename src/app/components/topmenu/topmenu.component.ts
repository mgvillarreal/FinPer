import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  menu:string = "cerrado";

  constructor() { }

  cambiaEstadoMenu(): void{
    if(this.menu === 'abierto')
    {
      this.menu = 'cerrado';
    }
    else
    {
      this.menu = 'abierto';
    }
    
  }

  ngOnInit(): void {
  }

}
