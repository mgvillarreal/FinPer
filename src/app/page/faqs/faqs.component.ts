import { Component, OnInit } from '@angular/core';
import { FaqI } from 'src/app/interfaces/faq';
import { FaqsService } from 'src/app/services/faqs.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  pregUnoFlag: number = 0;
  faqs: FaqI[];

  constructor(private faqService: FaqsService) { }

  ngOnInit(): void {
    this.traeFaqs();
  }

  traeFaqs(){
    this.faqService.traeFaqs().subscribe(resp => {
      this.faqs = resp;
      console.log(resp);
    })
  }

}
