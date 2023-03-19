import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private contactoServicio: ContactoService, private router: Router) { }

  enviarMensaje(){
    this.mensaje.nombre = this.forma.value['nombre'];
    this.mensaje.mail = this.forma.value['email'];
    this.mensaje.telefono = this.forma.value['telefono'];
    this.mensaje.mensaje = this.forma.value['mensaje'];

    this.contactoServicio.enviarMensaje(this.mensaje).subscribe();

    this.muestraContacto = 0;
    this.mensajeContactoEnviado = 1;
  }

  volveraContacto(){
    this.forma.reset();
    this.router.navigate(['inicio']);
  }

  ngOnInit(): void {
    this.forma = this.fb.group({ 
      'nombre': ['', [Validators.required, Validators.pattern(/^([a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?)+([a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s)*[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/u)]],
      'email': ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\.com$')]],
      'telefono': ['', [Validators.required, Validators.pattern(/^([0-9])*$/), Validators.maxLength(15), Validators.minLength(10)]],
      'mensaje': ['', [Validators.required]]
    })
  }

}
