import { Component, OnInit } from '@angular/core';
import { MovimientoI } from 'src/app/interfaces/movimiento';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-ultimos-movimientos',
  templateUrl: './ultimos-movimientos.component.html',
  styleUrls: ['./ultimos-movimientos.component.scss']
})
export class UltimosMovimientosComponent implements OnInit {

  listadoMovimientos:MovimientoI[];

  constructor(private MovimientoServ: MovimientosService) { }

  muestraMovimientos():void{
    this.MovimientoServ.traeMovimientos(localStorage.getItem("id")).subscribe(resp => {
                                                                                          this.listadoMovimientos = resp;
                                                                                        })
  }

  ngOnInit(): void {
    this.muestraMovimientos();
  }

}
