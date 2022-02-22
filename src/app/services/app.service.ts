import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  headers!: HttpHeaders;
  token: string = '';
  constructor(private http: HttpClient) {}

  get(url: string) {
    this.getHeader();
    return this.http
      .get<any>(`${environment.apiUrl}/api/${url}`, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(map(result => result));
  }

  post(url: string, record: any) {
    this.getHeader();
    return this.http
      .post<any>(`${environment.apiUrl}/api/${url}`, JSON.stringify(record), {
        headers: this.headers,
      })
      .pipe(map(result => result));
  }

  getHeader() {
    this.token = localStorage.getItem('token') || '';
    if (this.token !== '') {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-token': this.token,
      });
    } else {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }
}
