import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']

})
export class PrincipalComponent {
  Object: any = [];
  search: any = [];
  info: any = [];
  query: string = "";
  showComponent = true;
  id: number = 0;
  recipe: string = '';


  constructor(private router: Router, private _CargaScripts:CargarScriptsService, private http: BackendserviceService, private route: ActivatedRoute){
    _CargaScripts.Carga(["randomRecipe"]);
  }




    ngOnInit() {
    this.http.getRandom('https://api.spoonacular.com/recipes/random?apiKey=70a97873cc6e4b75a56be10cd2d56e5f&number=10').subscribe({
      next: (data) => {
        this.Object = data;
        console.log(this.Object.recipes);
      }
    });
  }  


  getInformation(id:number){
    this.http.getRecipeInformation(id).subscribe({
      next: (data) => {
        this.info.push(data);
        //console.log(this.info);
      }
    })
  }

  searchQuery(q: string){
    //console.log(this.query);
    this.showComponent = false;
    this.http.getSearch(this.query).subscribe({
      next: (data) => {
        this.search = data;
        //console.log(this.search.results);
        for(let item of this.search.results){
          this.getInformation(item.id);
        }
      }
    });
  }



  goToRecipe(id: number){
    this.id=id;
    this.route.paramMap.subscribe(params => {
      this.router.navigate(['/recipe', this.id]);
    });
  }

  NewUsuario(){
    this.router.navigateByUrl('/user');
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  explorar(){
    this.router.navigateByUrl('/explorar');
  }

  AcercaDe(){
    this.router.navigateByUrl('/acerca_de');
  }
}
