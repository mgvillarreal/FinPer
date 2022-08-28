import { Component, OnInit } from '@angular/core';
import { MetasService } from 'src/app/services/metas.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {

  constructor(private modalService: ModalService, private metaServicio: MetasService) { }

  mostrarMensaje(){
     this.modalService.alerta("Titulo", "Mensaje", "Boton").subscribe((answer) => {});
  }

  ngOnInit(): void {
  }

  guardaDatos(){
    let fecha = new Date();
    //let hoy = '${fecha.getFullYear()}-${('0'+(fecha.getMonth()+1)).slice(-2)}-${fecha.getDate()}';
    let datos = {
      "met_idusuario": 1,
      "met_monto": 10500,
      "met_nombre": "Bariloche",
      "met_flimite": "2022-08-26",
      "met_idmoneda": 1
      //met_estado: 1
    }
    
    this.metaServicio.guardaMetas(datos).subscribe(data =>{
      console.log(data);
    });
  }

}
