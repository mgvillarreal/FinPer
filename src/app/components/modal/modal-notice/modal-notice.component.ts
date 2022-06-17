import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal-notice',
  templateUrl: './modal-notice.component.html',
  styleUrls: ['./modal-notice.component.css']
})
export class ModalNoticeComponent implements OnInit {

  titulo:string;
  mensaje:string;

  constructor(public bsModalRef: BsModalRef, public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
