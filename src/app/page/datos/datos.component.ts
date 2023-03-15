import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngresoI } from 'src/app/interfaces/ingreso';
import { PaisI } from 'src/app/interfaces/pais';
import { ProfesionI } from 'src/app/interfaces/profesion';
import { UsuarioI } from 'src/app/interfaces/usuario';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  usuario = new Usuario();
  user: UsuarioI
  public forma: FormGroup;

  /* FLAGS */
  muestraPerfil: number = 1;
  editaFlag: number = 0;
  eliminaFlag: number = 0;
  parteFormulario: number = 1;
  muestraMensajeFlag: number = 0;
  cambiaContrasenaFlag: number = 0;
  muestraMensajeContrasenaFlag: number = 0;

  /* EDITA DATOS */
  public forma1: FormGroup;
  paises: PaisI[] = [];
  ingresos: IngresoI[] = [];
  profesiones: ProfesionI[] = [];

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private router: Router, public auth: AuthService ) { }

  /* MANEJO DE FLAGS */

  editaPerfilFlag(){
    if(this.editaFlag == 0){
      this.editaFlag = 1;
      this.muestraPerfil = 0;
    }
  }

  volveraPerfil(){
    this.muestraPerfil = 1;
    this.editaFlag = 0;
    this.eliminaFlag = 0;
    this.parteFormulario = 1;
    this.muestraMensajeFlag = 0;
    this.cambiaContrasenaFlag = 0;
    this.muestraMensajeContrasenaFlag = 0;
  }

  eliminaPerfilFlag(){
    if(this.eliminaFlag == 0){
      this.eliminaFlag = 1;
      this.muestraPerfil = 0;
    }
  }

  cambiarContrasenaFlag(){
    if(this.cambiaContrasenaFlag == 0){
      this.cambiaContrasenaFlag = 1;
      this.muestraPerfil = 0;
    }
  }

  /* METODOS */

  muestraPaises(){
    this.usuarioService.traePaises().subscribe(res => {
      this.paises = res;
    });
  }

  muestraProfesiones(){
    this.usuarioService.traeProfesiones().subscribe(res => {
      this.profesiones = res;
    });
  }

  muestraIngresos(){
    this.usuarioService.traeIngresos().subscribe(res => {
     this.ingresos = res;
    });
  }

  guardaFormaUno(){
    this.usuario.nombre = this.forma1.value['nombre'];
    this.usuario.fnacimiento = this.forma1.value['fnacimiento'];
    this.usuario.residencia = this.forma1.value['residencia'];
    this.usuario.modoIngreso = this.forma1.value['modoingreso'];
    this.usuario.profesion = this.forma1.value['profesion'];
    this.muestraMensajeFlag = 1;
    this.parteFormulario = 0;

    let fechaEv = new Date(this.forma1.value['fnacimiento']);

    if (isNaN(fechaEv.getTime())) {
      console.log('Fecha no válida');

      const dateString = this.forma1.value['fnacimiento'];
      const dateParts = dateString.split(' ');

      const dateArr = dateParts[0].split('/');

      const year = +dateArr[2];
      const month = +dateArr[1] - 1;
      const day = +dateArr[0];
      
      const newDate = new Date(year, month, day);

      const newYear = newDate.getFullYear();
      const newMonth = ('0' + (newDate.getMonth() + 1)).slice(-2);
      const newDay = ('0' + newDate.getDate()).slice(-2);

      const formattedDate = `${newYear}-${newMonth}-${newDay}`;

      this.usuario.fnacimiento = formattedDate;
    } 
    this.modificarDatos();
  }

  modificarDatos(){
    let idUser = localStorage.getItem('id');
    
    this.usuarioService.modificaUsuario(this.usuario, idUser).subscribe();
  }

  eliminarPerfil(){
    let idUser = localStorage.getItem('id');
    
    this.usuarioService.eliminaUsuario(idUser).subscribe();
    this.router.navigate(['inicio']);
    this.auth.logout();
  }

  cambiarContrasena(){
    this.usuario.contrasena = this.forma.value['contrasenaConfirm'];
    this.muestraMensajeContrasenaFlag = 1;
    this.cambiaContrasenaFlag = 0;

    let idUser = localStorage.getItem('id');
    this.usuarioService.modificaContrasena(this.forma.value['contrasenaConfirm'], idUser).subscribe();
  }

  async ngOnInit() {
    this.usuario.nombre = localStorage.getItem('name');
    await this.traeDatosUsuario();

    this.forma1 = this.fb.group({
      'nombre': [this.user.usu_nombre, [Validators.required, Validators.pattern(/^([a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?)+([a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s)*[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/u)]],
      'fnacimiento': ['', [Validators.required, this.fechaMayorA15Validator()]],
      'residencia': [this.user.usu_idresidencia, [Validators.required]],
      'modoingreso': [this.user.usu_idmoding, [Validators.required]],
      'profesion': [this.user.usu_idprofesion, [Validators.required]],
    });

    this.forma = this.fb.group({
      'email': ['', [Validators.required]],
      'contrasenaNueva': ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).*$'), Validators.minLength(8)]],
      'contrasenaConfirm': ['', [Validators.required]],
    }, { validators: this.contrasenasIgualesValidator });

    this.muestraPaises();
    this.muestraProfesiones();
    this.muestraIngresos();
  }

  contrasenasIgualesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('contrasenaNueva');
    const pwdConfirm = control.get('contrasenaConfirm');

    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { contrasenasIguales: true } : null;
  };

  fechaMayorA15Validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fnacimiento = new Date(control.value);
      const factual = new Date();
      let years = (factual.getFullYear() - fnacimiento.getFullYear());
  
      return years < 15  || years > 99 ? { fechaInvalida : true } : null;
    }
  }

  async traeDatosUsuario() {
    const resp = await this.usuarioService.traeDatosUsuario(Number(localStorage.getItem('id'))).toPromise();
    this.user = resp[0];
    this.ageCalculator(resp[0].usu_fnacimiento);
  }

  ageCalculator(edad){
    if(edad){
      const convertAge = new Date(edad);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.user.edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
  }


}
