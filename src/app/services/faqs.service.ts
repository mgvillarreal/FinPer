
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FaqI } from '../interfaces/faq';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  apiUrl = environment.apiUrl;

  urlv5 = `${this.apiUrl}/v5/faqs/`

  constructor(private http: HttpClient) { }

  traeFaqs()
  {
    return this.http.get<FaqI[]>(this.urlv5);
  }
}
