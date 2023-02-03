import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mensaje } from 'src/app/models/mensaje.model';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public forma: FormGroup;
  mensaje = new Mensaje;

  /* FLAGS */
  muestraContacto: number = 1;
  mensajeContactoEnviado: number = 0;

  constructor(private fb: FormBuilder, private contactoServicio: ContactoService) { }

  enviarMensaje(){
    this.mensaje.nombre = this.forma.value['nombre'];
    this.mensaje.mail = this.forma.value['email'];
    this.mensaje.telefono = this.forma.value['telefono'];
    this.mensaje.mensaje = this.forma.value['mensaje'];
    console.log('Mensaje contacto: ', this.mensaje);

    this.contactoServicio.enviarMensaje(this.mensaje).subscribe();

    this.muestraContacto = 0;
    this.mensajeContactoEnviado = 1;
  }

  volveraContacto(){
    this.muestraContacto = 1;
    this.mensajeContactoEnviado = 0;
  }

  ngOnInit(): void {
    this.forma = this.fb.group({ 
      'nombre': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'telefono': [''],
      'mensaje': ['', [Validators.required]]
    })
  }

}
