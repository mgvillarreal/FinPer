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
  mesUltMov:any;
  anioUltiMov: any;
  usuUltMov: any;

  constructor(private MovimientoServ: MovimientosService) { }

  muestraMovimientos():void{
    this.mesUltMov = this.MovimientoServ.mesUltMov;
    this.anioUltiMov = this.MovimientoServ.anioUltMov;
    this.usuUltMov = this.MovimientoServ.usuUltMov;

    console.log("datos en ultimos mov: ", this.mesUltMov, this.anioUltiMov, this.usuUltMov);
    
    this.MovimientoServ.traeMovimientosMesAnio(this.usuUltMov, this.mesUltMov, this.anioUltiMov).subscribe(
      resp => {
                this.listadoMovimientos = resp;
              });
      console.log("Listado Ultimos movimientos: ", this.listadoMovimientos);
  }

  ngOnInit(): void {
    this.muestraMovimientos();
  }

}
