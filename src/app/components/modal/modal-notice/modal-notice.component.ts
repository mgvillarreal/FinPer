import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal-notice',
  templateUrl: './modal-notice.component.html',
  styleUrls: ['./modal-notice.component.css']
})
export class ModalNoticeComponent implements OnInit {

  icono:string;
  mensaje:string;
<<<<<<< HEAD
  boton:string;
=======
  tipo: 'ingreso'
>>>>>>> desarrollo-movimientos

  constructor(public bsModalRef: BsModalRef, public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
