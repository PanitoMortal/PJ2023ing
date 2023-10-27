import { Component, OnInit } from '@angular/core';
import { ErrorcontraComponent } from '../errorcontra/errorcontra.component';
import { MensajeinsertComponent } from '../mensajeinsert/mensajeinsert.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';
import { CONTEXT_MENU } from '@angular/cdk/keycodes';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-recetas-propias',
  templateUrl: './recetas-propias.component.html',
  styleUrls: ['./recetas-propias.component.scss']
})
export class RecetasPropiasComponent implements OnInit {
  show = true;
  username = "";
  ing = "";
  ingredients = "";
  cont = 0;
  name: string ="";
  description: string = "";
  elementosTabla: any[] = [];
  imgBase64: string | null = null;
  imgEat: File | null = null; // Para almacenar la imagen seleccionada
  imageUrl: string | ArrayBuffer | null = null; // Para mostrar la imagen

  constructor(private backend: BackendserviceService, public dialog: MatDialog, private router: Router, private toastr: ToastrService, private _recipeService: RecipeService, private _errorService: ErrorService, private route: ActivatedRoute ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('nameuser');
      this.username = username;
      console.log('Nombre de usuario:', username);

    });

  }
  onFileSelected(event: any) {
    // Obtén la imagen seleccionada
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.imgEat = selectedFile;

      // Lee la imagen y muestra la vista previa
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.imgBase64 = reader.result as string;
      };
    }
  }


  NewUsuario(): void{
    if(this.name == '' || this.description == '') {
      this.toastr.error('All fields are required');
      return;
    }
    const ing = this.elementosTabla.join(',');

 
    const recipe: Recipe = {
      img: this.imgBase64,
      name: this.name,
      description: this.description,
      ingredients: ing
    }
    this.show = false;
    this._recipeService.newRecipe(recipe).subscribe({
      next: (v) => {
        
        this.toastr.success(`Recipe registered successfully`, 'Recipe Registered');
        
      },
      error: (e) => {
        this._errorService.msjError(e);
      }
    })

  }


  displayedColumns: string[] = ['Ingredientes', 'Eliminar', 'Editar'];
  dataSource = this.elementosTabla;

  agregarElemento() {
    if (this.ingredients) {
      this.elementosTabla.push(this.ingredients);
      this.dataSource = this.elementosTabla.slice();  // Actualizar dataSource
      console.log(this.dataSource);
      this.ingredients = ''; 
      this.cont++;
      console.log("al inicio " + this.cont);
      
    }
  }

 
  Eliminar(nombre: string){

    const posicion = this.elementosTabla.indexOf(nombre);
    if (posicion !== -1) {
      this.elementosTabla.splice(posicion, 1);  
      this.dataSource = this.elementosTabla.slice();
    }
  }
  
  Editar(nombre: string){
    
  }

}
