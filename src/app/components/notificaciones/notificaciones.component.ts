import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  volveraNotificaciones(){
    this.muestraNotificacionFlag = 0;
    this.muestraTodasNotifFlag = 1;
  }

  muestraNotificacion(){
    if(this.muestraNotificacionFlag == 0){
      this.muestraNotificacionFlag = 1;
      this.muestraTodasNotifFlag = 0;
    }
  }

  preguntaEliminarNotificacion(){
    if(this.preguntaEliminNotifFlag == 0){
      this.preguntaEliminNotifFlag = 1;
      this.muestraTodasNotifFlag = 0;
    }
  }

  eliminaNotificacion(){
    this.volveraNotificaciones();
  }

}
