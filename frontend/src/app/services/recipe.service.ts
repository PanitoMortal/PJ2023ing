import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipe } from '../interfaces/recipe';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private myAppUrl: string;
  private myApiUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'recipe';
  }

  newRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, recipe);
  }


}
