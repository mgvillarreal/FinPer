import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit {

  muestraMetas:number=1;
  agregaMetaFlag:number=0;
  muestraMensajeFlag:number=0;
  editaMetaFlag:number=0;
  muestraMensajeActFlag:number=0;
  preguntaEliminarFlag:number=0;

  constructor() { }

  cambiaAgregaMetaFlag(){
    if(this.agregaMetaFlag==0){
      this.agregaMetaFlag = 1;
      this.muestraMetas = 0;
    }
    else{
      this.agregaMetaFlag = 0;
    }
  }

  muestraMensajeOk(){
    if(this.muestraMensajeFlag==0){
      this.muestraMensajeFlag = 1;
    }
  }

  volveraMetas(){
    this.agregaMetaFlag = 0;
    this.muestraMensajeFlag = 0;
    this.muestraMetas = 1;
    this.muestraMensajeActFlag = 0;
  }

  crearOtraMeta(){
    this.muestraMensajeFlag = 0;
    this.agregaMetaFlag = 1;
  }

  editarMeta(){
    if(this.editaMetaFlag==0){
      this.editaMetaFlag = 1;
      this.muestraMetas = 0;
    }
  }

  muestraMensajeActOk(){
    if(this.muestraMensajeActFlag==0){
      this.muestraMensajeActFlag = 1;
      this.muestraMetas = 0;
      this.editaMetaFlag = 0;
    }
  }

  preguntaEliminar(){
    if(this.preguntaEliminarFlag==0){
      this.preguntaEliminarFlag = 1;
      this.muestraMetas = 0;
      this.editaMetaFlag = 0;
    }
  }

  eliminaMeta(){
    this.muestraMetas = 1;
    this.editaMetaFlag = 0;
    this.preguntaEliminarFlag = 0;
  }

  cancela(){
    this.muestraMetas = 0;
    this.editaMetaFlag = 1;
  }

  ngOnInit(): void {
  }

  

}
