import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  alerta(){
     this.modalService.alerta("Titulo", "Mensaje").subscribe((answer) => {});
  }

  ngOnInit(): void {
  }

}
