import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  modalSwitch = 0

  mostrarMensaje(){
     this.modalService.alerta("Titulo", "Mensaje", "Boton").subscribe((answer) => {});
  }

  ngOnInit(): void {
  }

  llamaModal(){
    this.modalSwitch = 1
  }

}
