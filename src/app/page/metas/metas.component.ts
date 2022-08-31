import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta } from 'src/app/models/meta.model';
import { AuthService } from 'src/app/services/auth.service';
import { MetasService } from 'src/app/services/metas.service';
import { ModalService } from 'src/app/services/modal.service';

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

  public forma: FormGroup;
  meta = new Meta;

  constructor(private fb: FormBuilder, private authService: AuthService, private metaServicio: MetasService) { }

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
    this.preguntaEliminarFlag = 0;
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'moneda': ['', [Validators.required]],
      'monto': ['', [Validators.required]],
      'detalle': ['', [Validators.required]],
      'fechaLimite': ['', [Validators.required]],
    });
  }

  crearMeta(){
    this.meta.met_idusuario = Number(localStorage.getItem("id"));
    this.meta.met_idmoneda = this.forma.value['moneda'];
    this.meta.met_monto = this.forma.value['monto'];
    this.meta.met_nombre = this.forma.value['detalle'];
    this.meta.met_flimite = this.forma.value['fechaLimite'];
    console.log('Meta creada: ', this.meta);
    this.muestraMensajeOk();
    //this.metaServicio.guardaMetas(this.meta);
    this.metaServicio.guardaMetas(this.meta).subscribe( data =>{
      console.log(data)
     });
  }

  

}
