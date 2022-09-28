import { Component, OnInit } from '@angular/core';
import { MetasI } from 'src/app/interfaces/metas';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Meta } from 'src/app/models/meta.model';
import { AuthService } from 'src/app/services/auth.service';
import { MetasService } from 'src/app/services/metas.service';
import { ModalService } from 'src/app/services/modal.service';
import { Monto } from 'src/app/models/monto.model';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss'],
})
export class MetasComponent implements OnInit {
  muestraMetas: number = 1;
  agregaMetaFlag: number = 0;
  muestraMensajeFlag: number = 0;
  editaMetaFlag: number = 0;
  muestraMensajeActFlag: number = 0;
  preguntaEliminarFlag: number = 0;
  muestraMontosFlag: number = 0;
  agregaMontoFlag: number = 0;
  muestraMensajeMontoFlag: number = 0;
  editaMontoFlag: number = 0;
  preguntaEliminarMontoFlag: number = 0;
  muestraMensajeActMontoFlag: number = 0;

  estado = 1;
  metas = [];

  //datos usados para pasar a moficacion con ngmodel
  modificarId: number;
  modificarMonto: number;
  modificarDetalle: string;
  modificarMoneda: number;
  modificarFecha: Date;
  //hasta datos a modificar
  modificarEstado: number;
  
  metaAModificar: MetasI;

  public forma: FormGroup;
  public editaForma: FormGroup;
  public formaMonto: FormGroup;
  meta = new Meta();
  monto = new Monto();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private metaServicio: MetasService
  ) {
    this.traeMetaPorEstado(1);
  }

  cambiaAgregaMetaFlag() {
    if (this.agregaMetaFlag == 0) {
      this.agregaMetaFlag = 1;
      this.muestraMetas = 0;
    } else {
      this.agregaMetaFlag = 0;
    }
  }

  muestraMensajeOk() {
    if (this.muestraMensajeFlag == 0) {
      this.muestraMensajeFlag = 1;
    }
  }

  volveraMetas() {
    this.agregaMetaFlag = 0;
    this.muestraMensajeFlag = 0;
    this.muestraMetas = 1;
    this.muestraMensajeActFlag = 0;
    this.editaMetaFlag = 0;
    this.muestraMontosFlag = 0;
    this.agregaMontoFlag = 0;
    this.muestraMensajeMontoFlag = 0;
  }

  crearOtraMeta() {
    this.muestraMensajeFlag = 0;
    this.agregaMetaFlag = 1;
  }

  editarMeta(id: number) {
    if (this.editaMetaFlag == 0) {
      this.editaMetaFlag = 1;
      this.muestraMetas = 0;
    }
    this.mostrarDatosEditar(id);
    //console.log(id);
  }

  muestraMensajeActOk() {
    if (this.muestraMensajeActFlag == 0) {
      this.muestraMensajeActFlag = 1;
      this.muestraMetas = 0;
      this.editaMetaFlag = 0;
    }
    console.log(this.modificarId);
    this.modificaMeta();
  }

  preguntaEliminar() {
    if (this.preguntaEliminarFlag == 0) {
      this.preguntaEliminarFlag = 1;
      this.muestraMetas = 0;
      this.editaMetaFlag = 0;
    }
  }

  eliminaMeta() {
    this.muestraMetas = 1;
    this.editaMetaFlag = 0;
    this.preguntaEliminarFlag = 0;
  }

  cancela() {
    this.muestraMetas = 0;
    this.editaMetaFlag = 1;
    this.preguntaEliminarFlag = 0;
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      moneda: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      fechaLimite: ['', [Validators.required]]
    });

    this.formaMonto = this.fb.group({
      montoMonto: ['', [Validators.required]],
      fechaMonto: ['', [Validators.required]],
    });
  }

  crearMeta() {
    this.meta.met_idusuario = Number(localStorage.getItem('id'));
    this.meta.met_idmoneda = this.forma.value['moneda'];
    this.meta.met_monto = this.forma.value['monto'];
    this.meta.met_nombre = this.forma.value['detalle'];
    this.meta.met_flimite = this.forma.value['fechaLimite'];
    console.log('Meta creada: ', this.meta);
    this.muestraMensajeOk();
    //this.metaServicio.guardaMetas(this.meta);
    this.metaServicio.guardaMetas(this.meta).subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        this.traeMetaPorEstado(1);
      }, 1500);
    });
  }

  cambiaEstado() {
    if (this.estado == 1) {
      this.estado = 2;
    } else {
      this.estado = 1;
    }

    this.traeMetaPorEstado(this.estado);
  }

  traeMetaPorEstado(estado: number) {
    //if (estado == 1) {
    this.metaServicio.traeMetasPorEstado(estado).subscribe((data) => {
      this.metas = data;
    });
    /*} else {
      this.metaServicio.traeMetasPorEstado(2).subscribe((data) => {
        this.metas = data;
      });
    }*/
  }

  mostrarDatosEditar(id: number) {
    this.metas.forEach((meta) => {
      if (id == meta.met_id) {
        this.metaAModificar = meta;
        this.modificarId=this.metaAModificar.met_id;
        this.modificarMonto=this.metaAModificar.met_monto;
        this.modificarDetalle=this.metaAModificar.met_nombre;
        this.modificarFecha=this.metaAModificar.met_fcreacion;
        this.modificarMoneda=this.metaAModificar.met_idmoneda;
        //console.log(meta);
       
      }
    });
  }

  modificaMeta() {
    this.meta.met_id=this.modificarId;
    this.meta.met_monto = this.modificarMonto;
    this.meta.met_nombre = this.modificarDetalle;
    this.meta.met_flimite = this.modificarFecha;
    this.meta.met_idmoneda = this.modificarMoneda;
    console.log('Meta creada: ', this.meta);
    this.muestraMensajeOk();
    //this.metaServicio.guardaMetas(this.meta);
    this.metaServicio.cambiaMetas(this.meta).subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        this.traeMetaPorEstado(1);
      }, 1500);
    });
  }

  /*MONTOS DE LAS METAS*/
  mostrarMontos(idMeta: Number){
    if(this.muestraMontosFlag==0){
      this.muestraMontosFlag = 1;
      this.muestraMetas = 0;
      this.agregaMontoFlag = 0;
    }
    //console.log('ID de la meta selec', idMeta);
    this.monto.mmet_idmeta = idMeta;
  }

  cambiaAgregaMontoFlag(){
    if (this.agregaMontoFlag == 0) {
      this.agregaMontoFlag = 1;
      this.muestraMetas = 0;
      this.muestraMontosFlag = 0;
    } else {
      this.agregaMontoFlag = 0;
    }
  }

  crearMonto(){
    this.monto.mmet_monto = this.formaMonto.value['montoMonto'];
    this.monto.mmet_fcreacion = this.formaMonto.value['fechaMonto'];
    console.log('Monto creado: ', this.monto);
    this.muestraMensajeOkMonto();
  }

  muestraMensajeOkMonto() {
    if (this.muestraMensajeMontoFlag == 0) {
      this.muestraMensajeMontoFlag = 1;
      this.agregaMontoFlag = 0;
    }
  }

  editarMonto(){
    if (this.editaMontoFlag == 0) {
      this.editaMontoFlag = 1;
      this.muestraMetas = 0;
      this.muestraMontosFlag = 0;
    }
    //this.muestraMensajeActMontoOk();
  }

  preguntaEliminarMonto(){
    if (this.preguntaEliminarMontoFlag == 0) {
      this.preguntaEliminarMontoFlag = 1;
      this.muestraMetas = 0;
      this.muestraMontosFlag = 0;
      this.muestraMensajeMontoFlag = 0;
      this.editaMontoFlag = 0;
    }
  }

  eliminaMonto(){
    this.muestraMontosFlag = 1;
    this.editaMontoFlag = 0;
    this.preguntaEliminarMontoFlag = 0;
  }

  cancelaMonto(){
    this.muestraMontosFlag = 0;
    this.editaMontoFlag = 1;
    this.preguntaEliminarMontoFlag = 0;
  }

  muestraMensajeActMontoOk() {
    if (this.muestraMensajeActMontoFlag == 0) {
      this.muestraMensajeActMontoFlag = 1;
      this.muestraMetas = 0;
      this.editaMontoFlag = 0;
    }
  }
}
