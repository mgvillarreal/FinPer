import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ModalNoticeComponent } from '../modal/modal-notice/modal-notice.component';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  alerta(titulo:string, mensaje:string): Observable<string>{
    const initialState = {
      titulo,
      mensaje
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
