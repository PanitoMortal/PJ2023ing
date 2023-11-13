import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comicArr } from 'src/app/models/comicArr';
import { login } from 'src/app/models/login';
import { loginArr } from 'src/app/models/loginArr';


const domain = "http://localhost:8888" 
const httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
const headers =  {headers: new HttpHeaders().set('Content-Type', 'text/html').set('Accept', 'text/html')};

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
  constructor(private http: HttpClient) { }

  login(user:string, password:string){
    return this.http.post<login>(domain + "/login/" + user +"/"+ password ,httpOptions);
  }

  getRandom(url: string){
    return this.http.get(url);
  }

  getSearch(query: string){
    return this.http.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=70a97873cc6e4b75a56be10cd2d56e5f&number=10&query="+query)
  }

  searchByIngredient(query: string){
    return this.http.get("https://api.spoonacular.com/recipes/findByIngredients?apiKey=70a97873cc6e4b75a56be10cd2d56e5f&ingredients="+query+"&number=10")
  }

  getRecipeInformation(id: number){
    return this.http.get("https://api.spoonacular.com/recipes/"+id+"/information?apiKey=70a97873cc6e4b75a56be10cd2d56e5f&includeNutrition=false")
  }

  getIngredientsById(id: number){
    return this.http.get("https://api.spoonacular.com/recipes/"+id+"/ingredientWidget.json?apiKey=70a97873cc6e4b75a56be10cd2d56e5f");
  }

  InsertRecipe(imagen: File, tipo: string) {
    const formData = new FormData();
    formData.append('image', imagen);
    formData.append('tipo', tipo);
    
    return this.http.post<login>(domain + "/new_recipe/" + "multimedia", formData);
  }

  getAvatarImage(username: string): Observable<any> {
    const url = `${domain}/user/${username}`;
    return this.http.get(url);
  }


  InsertUser(avatar: File, name: string, pass: string, date: string, gender: string, user: string): Observable<any> {
    const formData = new FormData();
    formData.append('uploadimg', avatar);
    formData.append('name', name);
    formData.append('pass', pass);
    formData.append('date', date);
    formData.append('gender', gender);
    formData.append('user', user);
  
    const headers = new HttpHeaders();
    headers.set('enctype', 'multipart/form-data');
  
    return this.http.post<login>(domain + "/new_user", formData, { headers });
  }

  


  
  getContenido(user: string){
    return this.http.get<loginArr>(domain + "/user/" + user, httpOptions);
  }

  //Funcionnes que no son utilizadas
  InsertarComic(name:string, year:number, sip:string, edit:string){
    return this.http.post<comicArr>(domain + "/new_comic/" + name + "/" + year + "/" + sip + "/" + edit, httpOptions);
  }

  EliminarComic(id: number){
    return this.http.delete<comicArr>(domain + '/comic/' + id, httpOptions);
  }

  ModifyComic(id:number, name:string, year:number, sip: string, edit: string){
    return this.http.put<comicArr>(domain + '/comic/' + id + "/" + name + "/" + year + "/" + sip + "/" + edit, httpOptions);
  } 

}

