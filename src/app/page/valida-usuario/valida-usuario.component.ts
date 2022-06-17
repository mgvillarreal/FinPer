import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-valida-usuario',
  templateUrl: './valida-usuario.component.html',
  styleUrls: ['./valida-usuario.component.css']
})
export class ValidaUsuarioComponent implements OnInit {

  public forma: FormGroup;

  constructor(private fb: FormBuilder) { }

  validar():void{
    console.log("valido token...");
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'token': ['', [Validators.required]]
    });
  }

}
