import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  pregUnoFlag: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  muestraPreguntaUno(){
    if(this.pregUnoFlag == 0){
      this.pregUnoFlag = 1;
    }
    else{
      this.pregUnoFlag = 0;
    }
  }

}
