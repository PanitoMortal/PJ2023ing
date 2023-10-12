import { Component } from '@angular/core';
import { ErrorcontraComponent } from '../errorcontra/errorcontra.component';
import { MensajeinsertComponent } from '../mensajeinsert/mensajeinsert.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';
import { CONTEXT_MENU } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-recetas-propias',
  templateUrl: './recetas-propias.component.html',
  styleUrls: ['./recetas-propias.component.scss']
})
export class RecetasPropiasComponent {

  ingredientes = "";
  cont = 0;
  name: string ="";
  descripcion: string = "";
  elementosTabla: any[] = [];
  
  imgEat: File | null = null; // Para almacenar la imagen seleccionada
  imageUrl: string | ArrayBuffer | null = null; // Para mostrar la imagen

  constructor(private backend: BackendserviceService, public dialog: MatDialog, private router: Router){}

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
      };
    }
  }


  NewUsuario(enterAnimationDuration: string, exitAnimationDuration: string): void{
    //name -> tipo
    if (this.imgEat) { // Verifica si this.imgEat no es null
      this.backend.InsertRecipe(this.imgEat, this.name).subscribe(
        (res: any) => {
      
          this.dialog.open(MensajeinsertComponent, {
            width: '450px',
            enterAnimationDuration,
            exitAnimationDuration,
          });
          this.name = '';
          this.imgEat = null;
          this.imageUrl = null;
         
        },
        (error) => {
          console.error('Error al enviar la imagen:', error);
        }
      );
    }else {
      console.error('No se ha seleccionado una imagen.');
    }
  
  }


  displayedColumns: string[] = ['Ingredientes', 'Eliminar', 'Editar'];
  dataSource = this.elementosTabla;

  agregarElemento() {
    if (this.ingredientes) {
      this.elementosTabla.push(this.ingredientes);
      this.dataSource = this.elementosTabla.slice();  // Actualizar dataSource
      console.log(this.dataSource);
      this.ingredientes = ''; 
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
