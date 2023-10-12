import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit {
  info: any = [];
  res: any;

  constructor( private router: Router, private http: BackendserviceService, private route: ActivatedRoute, private _CargaScripts:CargarScriptsService){
    _CargaScripts.Carga(["scroll"]);
  }

  ngOnInit(): void {
    window.scrollTo(0,0); 
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if(id !== null){
          this.getInformation(parseInt(id));
        }
      }) 
  }

  getInformation(id:number){
    window.scrollTo(0,0); 
    this.http.getRecipeInformation(id).subscribe({
      next: (data) => {
        this.info = data;
        console.log(this.info);
        
      }
    })
  }


  NewUsuario(){
    this.router.navigateByUrl('/user');
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  principal(){
    this.router.navigateByUrl('/principal');
  }
  
  explorar(){
    this.router.navigateByUrl('/explorar');
  }

}
