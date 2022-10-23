import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NotificacionI } from 'src/app/interfaces/notificacion';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  /* BANDERAS */
  muestraTodasNotifFlag = 1;
  muestraNotificacionFlag = 0;
  preguntaEliminNotifFlag = 0;
  notificaciones: NotificacionI[] = []
  notificacionSeleccionada: NotificacionI

  constructor(private loc: Location, public notService: NotificacionesService) { }

  ngOnInit(): void {
    this.traeNotificaciones();
  }

  volveraNotificaciones(){
    this.muestraNotificacionFlag = 0;
    this.muestraTodasNotifFlag = 1;
  }

  muestraNotificacion(notificacion: NotificacionI){
    if(this.muestraNotificacionFlag == 0){
      this.muestraNotificacionFlag = 1;
      this.muestraTodasNotifFlag = 0;
      this.preguntaEliminNotifFlag = 0;
    }

    this.seleccionaNotificacion(notificacion);

    this.leeNotificacion();
  }

  preguntaEliminarNotificacion(notificacion: NotificacionI){
    if(this.preguntaEliminNotifFlag == 0){
      this.preguntaEliminNotifFlag = 1;
      this.muestraTodasNotifFlag = 0;
    }

    this.seleccionaNotificacion(notificacion);
  }

  eliminaNotificacion(){
    this.borrarNotificacion();

    this.volveraNotificaciones();
  }

  goBack(){
    this.loc.back();
  }

  traeNotificaciones()
  {
    this.notService.traeNotificaciones(11).subscribe(resp => {
      this.notificaciones = resp;
      console.log(resp)
    })
  }

  leeNotificacion()
  {
    this.notService.leeNotificacion(this.notificacionSeleccionada.not_id).subscribe(resp => {
      console.log(resp)

        this.traeNotificaciones();
    })
  }

  borrarNotificacion()
  {
    this.notService.borrarNotificacion(this.notificacionSeleccionada.not_id).subscribe(resp => {
      console.log(resp)

        this.traeNotificaciones();
    })
  }

  seleccionaNotificacion(notificacion: NotificacionI)
  {
    this.notificacionSeleccionada = notificacion
  }

}