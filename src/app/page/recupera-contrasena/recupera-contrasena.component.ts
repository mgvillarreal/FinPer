import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recupera-contrasena',
  templateUrl: './recupera-contrasena.component.html',
  styleUrls: ['./recupera-contrasena.component.css']
})
export class RecuperaContrasenaComponent implements OnInit {

  public forma: FormGroup;

  constructor(private fb: FormBuilder, private route: Router) { }

  recuperarContrasena(){
    this.route.navigate(['ingreso']);
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'contrasena': ['', [Validators.required]],
      'pwdConfirm': ['', Validators.required],
    }), { validators: this.contrasenasIgualesValidator};
  }

  contrasenasIgualesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('contrasena');
    const pwdConfirm = control.get('pwdConfirm');

    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { contrasenasIguales: true } : null;
  }


}
