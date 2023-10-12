import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';
import { MensajemodComponent } from '../mensajemod/mensajemod.component';
import { ViewportScrollPosition } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-mod-comic',
  templateUrl: './mod-comic.component.html',
  styleUrls: ['./mod-comic.component.scss']
})
export class ModComicComponent implements OnInit {
  id: number = 0;
  name: string="";
  year: number = 0;
  sip: string ="";
  edit: string ="MARVEL";

  states: string[] = ['MARVEL', 'DC', 'IMAGE'];

  constructor(private backend: BackendserviceService, private route:ActivatedRoute, private ruta:Router, public dialog: MatDialog){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.name = params['nombre'];
      this.year = params['year'];
      this.sip = params['sip'];
      this.edit = params['edit'];

      console.log(this.id, this.name, this.year, this.sip, this.edit);
    });
  }

  ModComic(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.backend.ModifyComic(this.id, this.name, this.year, this.sip, this.edit).subscribe(res => {
      this.dialog.open(MensajemodComponent, {
        width: '450px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
  
    });
  }

}
