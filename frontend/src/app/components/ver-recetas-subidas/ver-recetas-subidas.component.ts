import { StickyDirection } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/recipe';
import { VerMenuService } from 'src/app/services/VerMenu.service';

@Component({
  selector: 'app-ver-recetas-subidas',
  templateUrl: './ver-recetas-subidas.component.html',
  styleUrls: ['./ver-recetas-subidas.component.scss']
})
export class VerRecetasSubidasComponent implements OnInit{
  nameRecipe: string = "";
  recipeInfo: any;
  imagenRuta: any;
  nombre_imagen: string="";
  nombre_comida: string="";
  user_name: string="";
  palabrasSeparadas: string[];
  lista: Recipe[] = [];
  constructor(private verMenuService: VerMenuService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user_name = params.get('nameuser');
      console.log('Nombre de usuario ver receta:', this.user_name);

    });
    this.getRecipeInfo();

  }

  getRecipeInfo(){
    
    this.verMenuService.getReceta(this.user_name).subscribe(
      (data) => {
        this.lista = data.RecipeInfo;
        console.log(this.lista);
        this.recipeInfo = data.RecipeInfo;
        this.nombre_comida = data.RecipeInfo.name
        this.nombre_imagen = data.RecipeInfo.img;
        console.log(this.recipeInfo.ingredients);
        this.palabrasSeparadas = this.recipeInfo.ingredients.split(',');
        console.log(this.palabrasSeparadas);
        

        this.getImage();
      },
      (error) => {
        console.error('Error fetching recipe information:', error);
      }
    );
  }

  getImage(){
    this.verMenuService.getImagen(this.nombre_imagen).subscribe(
      data => {
        // Convierte el Blob a una URL segura para mostrar la imagen
        this.imagenRuta = URL.createObjectURL(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  regresar() {
    this.router.navigateByUrl('/menu/'+this.user_name);
  }


}
