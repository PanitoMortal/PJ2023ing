import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { userLogin } from '../interfaces/userLogin';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private myAppUrl: string;
  private myApiUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'menu';
  }

  getMenu(/* username: any */): Observable<any> {
/*     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); */
    /* return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}`, { headers: headers }) */
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}`/* , username */);
  }
}
