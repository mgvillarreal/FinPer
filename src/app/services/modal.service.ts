import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ModalNoticeComponent } from '../components/modal/modal-notice/modal-notice.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  alerta(icono:string, mensaje:string, boton: string): Observable<string>{
    const initialState = {
      icono,
      mensaje,
      boton
    }
    this.bsModalRef = this.bsModalService.show(ModalNoticeComponent, {initialState});

    return new Observable<string>(this.getAlertaSubscriber());
  }

  private getAlertaSubscriber() {
    return (observer) => {
      const suscription = this.bsModalService.onHidden.subscribe((reason: string) => {
        observer.complete();
      });

      return {
        unsubscribe() {
          suscription.unsubscribe();
        }
      };
    };
  }

}
