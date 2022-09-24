import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisI } from 'src/app/interfaces/pais';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-edita-datos',
  templateUrl: './edita-datos.component.html',
  styleUrls: ['./edita-datos.component.css']
})
export class EditaDatosComponent implements OnInit {

  public forma1: FormGroup;
  public forma2: FormGroup;
  usuario = new Usuario;

  paises: PaisI[] = [];

  arrayIngresos:any[] = [];

  /* MANEJO DE FLAGS */
  parteFormulario: number = 1;
  muestraMensajeFlag: number = 0;

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.forma1 = this.fb.group({
      'nombre': ['', [Validators.required]],
      'fnacimiento': ['', [Validators.required]],
      'residencia': [13, [Validators.required]],
    });

    this.forma2 = this.fb.group({
      'modoing': ['', [Validators.required]],
      'profesion': ['', [Validators.required]],
    });
  }

  muestraPaises(){
    this.usuarioService.traePaises().subscribe(res => {
      this.paises = res
    })
  }

  guardaFormaUno(){
    this.usuario.nombre = this.forma1.value['nombre'];
    this.usuario.fnacimiento = this.forma1.value['fnacimiento'];
    this.usuario.residencia = this.forma1.value['residencia'];
    this.parteFormulario = 2;
  }

  guardaFormaDos(){
    this.usuario.profesion = this.forma2.value['profesion'];
    this.tomaModosIngreso();
    this.muestraMensajeFlag = 1;
    this.parteFormulario = 0;
    console.log('Datos Modificados del Usuario: ', this.usuario);
  }

  tomaModosIngreso():void{
    let checks = document.querySelectorAll('#modoingreso');
   
    checks.forEach((e)=>{ 
      if((e as HTMLInputElement).checked){
        this.arrayIngresos.push((e as HTMLInputElement).value);
      }
    });
    this.usuario.modoIngreso = (this.arrayIngresos);
  }

}
