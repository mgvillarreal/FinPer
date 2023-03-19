import { Component, OnInit } from '@angular/core';
import { MetasI } from 'src/app/interfaces/metas';
import { MontosI } from 'src/app/interfaces/montos';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Meta } from 'src/app/models/meta.model';
import { AuthService } from 'src/app/services/auth.service';
import { MetasService } from 'src/app/services/metas.service';
import { ModalService } from 'src/app/services/modal.service';
import { Monto } from 'src/app/models/monto.model';
import { catchError, throwError } from 'rxjs';

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
  retiraMontoFlag: number = 0;
  muestraMensajeMontoRetFlag: number = 0;
  tieneMetasFlag: number = 0;
  tieneMontosFlag: number = 0;

  estado = 1;
  metas = [];

  metaSeleccionada;
  montoPorAlcanzar: number = 0;
  mensajeValidaMonto: string = "";

  //datos usados para pasar a moficacion con ngmodel
  modificarId: number;
  modificarMonto: number;
  modificarDetalle: string;
  modificarMoneda: number;
  modificarFecha: Date;
  modificarEstado: number;
  metaAModificar: MetasI;

  public forma: FormGroup;
  public forma2: FormGroup;
  public editaForma: FormGroup;
  public formaMonto: FormGroup;
  public formaMontoRet: FormGroup;
  meta = new Meta();
  monto = new Monto();

  // Montos
  arrMontos = []
  arrMontosAhorrados = []
  arrDiferencia = []
  //datos usados para pasar a moficacion con ngmodel
  modificarIdMonto: number;
  modificarMontoMonto: number;
  modificarFechaMonto: Date;
  modificarEstadoMonto: number;
  montoAModificar: MontosI;
  montoSeleccionado: any;

  //estados
  arrEstados = [
    { value: 0, name: "Pendientes" },
    { value: 1, name: "Alcanzadas" },
    { value: 2, name: "Canceladas" },
    { value: 10, name: "Todas" }
  ];
  estadoMeta:any = 0;

  //valor del dolar oficial del dia anterior -- harcodeado
  valorDolarOficial: number = 214.5;

  constructor(
    private fb: FormBuilder,
    private metaServicio: MetasService
  ) {
    this.traeMetaPorEstado(0);
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
    this.retiraMontoFlag = 0;
    this.editaMontoFlag = 0;
    this.muestraMensajeMontoRetFlag = 0;
    this.muestraMensajeActMontoFlag = 0;

    this.forma.reset();
  }

  crearOtraMeta() {
    this.muestraMensajeFlag = 0;
    this.agregaMetaFlag = 1;
  }

  editarMeta(id: number) {
    this.metaSeleccionada = id;
    if (this.editaMetaFlag == 0) {
      this.editaMetaFlag = 1;
      this.muestraMetas = 0;
    }
    this.mostrarDatosEditar(id);
  }

  muestraMensajeActOk() {
    this.muestraMensajeFlag = 0;
    this.muestraMensajeActFlag = 1;
    this.muestraMetas = 0;
    this.editaMetaFlag = 0;

    this.modificaMeta();
  }

  preguntaEliminar() {
    if (this.preguntaEliminarFlag == 0) {
      this.preguntaEliminarFlag = 1;
      this.muestraMetas = 0;
      this.editaMetaFlag = 0;
    }
  }

  async eliminaMeta() {
    await this.metaServicio.eliminarMeta(this.metaSeleccionada).toPromise();;
    this.traeMetaPorEstado(this.estadoMeta);
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
      monto: ['', [Validators.required, Validators.min(1)]],
      detalle: ['', [Validators.required]],
      fechaLimite: ['', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/), this.fechaValidaValidator() ]]
    });

    this.forma2 = this.fb.group({
      monedaEdit: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(1)]],
      detalle: ['', [Validators.required]],
      fechaLimite: ['', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/), this.fechaValidaValidator() ]]
    });

    this.formaMonto = this.fb.group({
      montoMonto: ['', [Validators.required]],
      fechaMonto: ['', [Validators.required]],
    });

    this.formaMontoRet = this.fb.group({
      montoRet: ['', [Validators.required]],
      fechaRet: ['', [Validators.required]],
    });
  }

  fechaValidaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaIngresada = new Date(control.value);
      const factual = new Date();

      return fechaIngresada < factual ? { fechaInvalida : true } : null;
    }
  }

  crearMeta() {
    this.meta.met_idusuario = Number(localStorage.getItem('id'));
    this.meta.met_idmoneda = this.forma.value['moneda'];
    this.meta.met_monto = this.forma.value['monto'];
    this.meta.met_nombre = this.forma.value['detalle'];
    this.meta.met_flimite = this.forma.value['fechaLimite'];
    this.muestraMensajeOk();
    //this.metaServicio.guardaMetas(this.meta);
    this.metaServicio.guardaMetas(this.meta).subscribe((data) => {
      setTimeout(() => {
        this.traeMetaPorEstado(0);
      }, 1500);
    });
    this.forma.reset();
  }

  async traeMetaPorEstado(estado: number) {
    this.metaServicio.traeMetasPorEstado(estado)
    .pipe(
      catchError((error: any) => {
        this.tieneMetasFlag = 0;
        return throwError(error);
      })
    )
    .subscribe((data) => {
      this.metas = data;
      this.calculaMontos();
      this.tieneMetasFlag = 1;
    });
    console.log("Metas:", this.metas);
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
      }
    });
  }

  cambiarMonedaMeta(){
    this.modificarMoneda = this.modificarMoneda;
    console.log("Cambia moneda: ", this.modificarMoneda);
  }

  async modificaMeta() {
    this.meta.met_id=this.modificarId;
    this.meta.met_monto = this.modificarMonto;
    this.meta.met_nombre = this.modificarDetalle;
    this.meta.met_flimite = this.modificarFecha;
    this.meta.met_idmoneda = this.modificarMoneda;
    this.muestraMensajeOk();
    
    await this.metaServicio.cambiaMetas(this.meta).toPromise();
    this.traeMetaPorEstado(this.estadoMeta);
  }

  /*MONTOS DE LAS METAS*/
  async mostrarMontos(meta){
    if(this.muestraMontosFlag==0){
      this.muestraMontosFlag = 1;
      this.muestraMetas = 0;
      this.agregaMontoFlag = 0;
    }
    await this.selMeta(meta);
    
    await this.traerMontos(this.metaSeleccionada.met_id);    
  }

  selMeta(meta){
    return this.metaSeleccionada = meta;
  }

  cambiaAgregaMontoFlag(){
    if (this.agregaMontoFlag == 0) {
      this.agregaMontoFlag = 1;
      this.muestraMetas = 0;
      this.muestraMontosFlag = 0;
    } else {
      this.agregaMontoFlag = 0;
    }

    this.montoPorAlcanzar = this.metaSeleccionada.met_monto - this.metaSeleccionada.sumaMonto;
  }

  async crearMonto(){
    this.forma.reset();
    
    this.monto.meta = this.metaSeleccionada.met_id;
    this.monto.monto = this.formaMonto.value['montoMonto'];
    this.monto.fecha = this.formaMonto.value['fechaMonto'];

    if(this.montoPorAlcanzar > this.monto.monto){
      await this.metaServicio.agregaMonto(this.monto).subscribe(resp => {
      })

      this.monto = new Monto();
      this.muestraMensajeOkMonto();
    }
    else{
      this.mensajeValidaMonto = "El monto a ingresar no puede ser superior al monto por alcanzar de la meta.";
    }
  }

  muestraMensajeOkMonto() {
    if (this.muestraMensajeMontoFlag == 0) {
      this.muestraMensajeMontoFlag = 1;
      this.agregaMontoFlag = 0;
    }
  }

  editarMonto(monto){
    if (this.editaMontoFlag == 0) {
      this.editaMontoFlag = 1;
      this.muestraMetas = 0;
      this.muestraMontosFlag = 0;
    }

    this.mostrarDatosEditarMonto(monto);
    this.montoSeleccionado = monto.mmet_id;
  }

  mostrarDatosEditarMonto(monto) {
    this.montoAModificar = monto;

    this.modificarIdMonto = this.montoAModificar.mmet_id;
    this.modificarMontoMonto = this.montoAModificar.mmet_monto;
    this.modificarFechaMonto = this.montoAModificar.mmet_fcreacion;
  }

  async actualizarMonto(){
    this.monto.mmet_id = this.modificarIdMonto;
    this.monto.mmet_monto = this.modificarMontoMonto;
    this.monto.mmet_fcreacion = this.modificarFechaMonto;
    

    this.muestraMensajeActMontoOk();
    
    await this.metaServicio.modificaMonto(this.monto).toPromise();

    this.traeMetaPorEstado(this.estadoMeta);

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

  async eliminaMonto(){
    console.log('Estado meta: ', this.estadoMeta);
    await this.metaServicio.eliminarMonto(this.montoSeleccionado).toPromise();
    let metid = this.metaSeleccionada.met_id
    this.traerMontos(metid);

    this.muestraMontosFlag = 1;
    this.editaMontoFlag = 0;
    this.preguntaEliminarMontoFlag = 0;

    console.log(this.metaSeleccionada.met_id)
    this.mostrarDatosEditar(metid)
    this.traeMetaPorEstado(this.estadoMeta);
  }

  cambiaEstado() {
    this.traeMetaPorEstado(this.estadoMeta);
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
      this.muestraMensajeActFlag = 0;
    }
  }

  async traerMontos(id){
    await this.metaServicio.traeMontos(id).toPromise().then(
      resp => {
        this.tieneMontosFlag = 1;
        this.arrMontos = resp;
    }).catch((error) => { 
        this.tieneMontosFlag = 0; //No tiene montos.
    });
    
  }

 calculaMontos()
  {
    if(this.metas.length > 0){
      this.metas.forEach(meta => {
        this.calculaUnAhorrado(meta.met_id)
      })
    }
  }

  calculaUnAhorrado(id)
  {
    let ahorrado = 0;

    this.metaServicio.traeMontos(id).subscribe(
    {
      next: resp => {
        resp.forEach( monto => {
          ahorrado += Number(monto.mmet_monto)
        });
        this.arrMontosAhorrados.push(ahorrado)
      },
      error: err => {

      }
    })

  }

  /* RETIRO MONTOS */

  haceRetiroFlag(){
    if(this.retiraMontoFlag==0){
      this.retiraMontoFlag = 1;
      this.muestraMontosFlag = 0;
    }
  }

  async retirarMonto(){
    this.monto.meta = this.metaSeleccionada.met_id;
    this.monto.monto = this.formaMontoRet.value['montoRet'];
    this.monto.fecha = this.formaMontoRet.value['fechaRet'];

    this.muestraMensajeOkMontoRet();
  }

  muestraMensajeOkMontoRet(){
    if (this.muestraMensajeMontoRetFlag == 0) {
      this.retiraMontoFlag = 0;
      this.agregaMontoFlag = 0;
      this.muestraMensajeMontoRetFlag = 1;
    }
  }
}
