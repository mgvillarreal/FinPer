import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Meta } from 'src/app/models/meta.model';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

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
      'fechaLimite': ['', [Validators.required]]
    }, { validators: this.fechaValidaValidator });
  }

  fechaValidaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fechaHoy = new Date;
    const fechaLimite = control.get('fechaLimite');

    return fechaHoy.getDate() < fechaLimite.value ? { fechaInvalida: true } : null;
  };

  crearMeta(){
    this.meta.usuario = Number(localStorage.getItem("id"));
    this.meta.moneda = this.forma.value['moneda'];
    this.meta.monto = this.forma.value['monto'];
    this.meta.detalle = this.forma.value['detalle'];
    this.meta.fechaLimite = this.forma.value['fechaLimite'];
    console.log('Meta creada: ', this.meta);
    this.muestraMensajeOk();
  }

  

}
