
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FaqI } from '../interfaces/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  urlv5 = 'https://hostinjor.com/apifinper/v5/faqs/'

  constructor(private http: HttpClient) { }

  traeFaqs()
  {
    return this.http.get<FaqI[]>(this.urlv5);
  }
}
