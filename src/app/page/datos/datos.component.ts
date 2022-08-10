import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  nombre = localStorage.getItem('name');
  
  constructor() { }

  ngOnInit(): void {
  }

}
