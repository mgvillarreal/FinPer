import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinPer';

  menuDesplegado = false

  despliegaMenu(){
    if(this.menuDesplegado)
    {
      this.menuDesplegado = false
    }else{
      this.menuDesplegado = true
    }
  }

  cerrarMenu(){
    this.menuDesplegado = false;
  }
}
