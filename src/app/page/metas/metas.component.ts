import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/components/services/mensajes.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {

  constructor(private mensajesService: MensajesService) { }

  alerta(){
    this.mensajesService.alerta("Titulo", "Mensaje").subscribe((answer) => {});
  }

  ngOnInit(): void {
  }

}
