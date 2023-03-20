import { Component, OnInit } from '@angular/core';
import { MovimientoI } from 'src/app/interfaces/movimiento';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-ultimos-movimientos',
  templateUrl: './ultimos-movimientos.component.html',
  styleUrls: ['./ultimos-movimientos.component.scss']
})
export class UltimosMovimientosComponent implements OnInit {

  listadoMovimientos: MovimientoI[] = [];
  mesUltMov: any;
  anioUltiMov: any;
  usuUltMov: any;
  paginaActual = 1;
  movimientosPorPagina = 10;

  constructor(private MovimientoServ: MovimientosService) { }

  muestraMovimientos(): void {
    this.mesUltMov = this.MovimientoServ.mesUltMov;
    this.anioUltiMov = this.MovimientoServ.anioUltMov;
    this.usuUltMov = this.MovimientoServ.usuUltMov;
    
    this.MovimientoServ.traeMovimientosMesAnio(this.usuUltMov, this.mesUltMov, this.anioUltiMov).subscribe(
      resp => {
        this.listadoMovimientos = resp;
      });
  }

  ngOnInit(): void {
    this.muestraMovimientos();
  }

  getPage(page: number): void {
    this.paginaActual = page;
  }

  get totalPaginas(): number {
    return Math.ceil(this.listadoMovimientos.length / this.movimientosPorPagina);
  }

  get movimientosEnPagina(): MovimientoI[] {
    const startIndex = (this.paginaActual - 1) * this.movimientosPorPagina;
    const endIndex = startIndex + this.movimientosPorPagina;
    return this.listadoMovimientos.slice(startIndex, endIndex);
  }
}