import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })

export class VerMenuService {

    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient){
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'menu';

    }

    getReceta(foodName: string): Observable<any>{
        //return this.http.get<any>(`http://localhost:8888/menu/ViewRecipe?food_name=${foodName}`);
        return this.http.get(`${this.myAppUrl}${this.myApiUrl}/ViewRecipe?food_name=${foodName}`);
    }

    getImagen(imagen: string): Observable<Blob>{
        return this.http.get(`${this.myAppUrl}galeria/${imagen}`, { responseType: 'blob' });
    }

}