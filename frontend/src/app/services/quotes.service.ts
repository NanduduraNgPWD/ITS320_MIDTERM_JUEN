import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Quotes = {
  _id: string;
  quote: string;
  author: string;
  published: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http: HttpClient) { }
  Get(): Observable<Quotes[]> {
    return this.http.get<Quotes[]>('http://localhost:3000/quotes');
  }
}
