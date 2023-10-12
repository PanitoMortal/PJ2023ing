import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';
import { MensajeinsertComponent } from '../mensajeinsert/mensajeinsert.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})
export class ComicComponent {
  name: string="";
  year: number = 0;
  sip: string ="";
  edit: string ="MARVEL";

  states: string[] = ['MARVEL', 'DC', 'IMAGE'];
  constructor(private backend: BackendserviceService, private dialog: MatDialog, private router: Router){}
  

  NewComic(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.backend.InsertarComic(this.name, this.year, this.sip, this.edit).subscribe(res =>{
      this.dialog.open(MensajeinsertComponent, {
        width: '450px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
      this.name = "";
      this.year = 0;
      this.sip = "";
      this.edit = "MARVEL";
    });
  }

  Volver(){
    this.router.navigateByUrl('/menu');
  }

}
