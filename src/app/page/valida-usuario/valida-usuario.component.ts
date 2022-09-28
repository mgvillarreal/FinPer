import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-valida-usuario',
  templateUrl: './valida-usuario.component.html',
  styleUrls: ['./valida-usuario.component.scss']
})
export class ValidaUsuarioComponent implements OnInit {

  public forma: FormGroup;
  id = this.route.snapshot.paramMap.get('id');
  token = this.route.snapshot.paramMap.get('token');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  validar(){
    console.log(this.forma.value)

    this.authService.confirmaCuenta(this.forma.value).subscribe(resp => {
      if(resp.confirmado){
        this.router.navigateByUrl("/ingreso")
      }
    })
  }

  ngOnInit(): void {

    this.forma = this.fb.group({
      'id': [this.route.snapshot.paramMap.get('id'), [Validators.required]],
      'token': ['', [Validators.required]]
    });

    if(this.route.snapshot.paramMap.get('token') != null){
      this.token = this.route.snapshot.paramMap.get('token')
    }
  }

  prueba()
  {
    console.log("token:",this.forma.value);
    console.log("valido token...",this.route.snapshot.paramMap.get('id'));
    console.log("token param:",this.route.snapshot.paramMap.get('token'));
  }

}
