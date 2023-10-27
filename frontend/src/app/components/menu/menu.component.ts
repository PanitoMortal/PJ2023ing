import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { loginArr } from 'src/app/models/loginArr';
import { ErrorService } from 'src/app/services/error.service';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  x: any;
  avatarUrl: string="";
  name: string = "";

  imageData: string="";
  nombre: string="";
  fecha: string="";
  genero: string="";
  usuario: string;
  mostrarRecetasPropias = false;

  constructor( private router: Router, private backend: BackendserviceService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private _menuService: MenuService, private _errorService: ErrorService){}


  ngOnInit(): void {
    this.getMenu();
    this.route.paramMap.subscribe(params => {
      const username = params.get('nameuser');
      this.usuario = username;
      console.log('Nombre de usuario:', username);
      
/*       if (username !== null) {
        this.backend.getAvatarImage(username).subscribe(
          response => {
            if (response.status === 1) {
              this.imageData = response.imagenBase64;
              this.nombre = response.nombre;
              this.fecha = response.fecha;
              this.genero = response.genero;
              this.usuario = response.usuario;
              console.log(response)
            } else {
              console.error('Error: ', response.mensaje);
            }
          },
          error => console.error('Error fetching image:', error)
        );
      } else {
        console.log('El parámetro "nameuser" es nulo.');
      } */
    });
  }


  getMenu() {
    this._menuService.getMenu().subscribe(data => {
      console.log(data);
      //this.imageData = data.avatar;
    })
  }


  SubirReceta(){
    this.mostrarRecetasPropias = !this.mostrarRecetasPropias;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  

}
