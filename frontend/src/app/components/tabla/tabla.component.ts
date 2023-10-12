import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { comicArr } from 'src/app/models/comicArr';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  resultado = new comicArr(0, "",[]);
  constructor(private backend: BackendserviceService, private router:Router){}
  
  ngOnInit(): void {
    /*
      this.backend.getContenido().subscribe(res => {
        this.resultado = res;
      });*/
  }

  DeleteComic(id: number){
    /*
    this.backend.EliminarComic(id).subscribe(res =>{
      this.backend.getContenido().subscribe(res2 => {
        this.resultado = res2;
      });
    });*/
  }

  Modificar(id:number, nombre: string, year:number, sip:string, edit:string ){
    this.router.navigateByUrl(`/modify?id=${id}&nombre=${nombre}&year=${year}&sip=${sip}&edit=${edit}`);
  }

  Volver(){
    this.router.navigateByUrl('/menu')
  }
}
