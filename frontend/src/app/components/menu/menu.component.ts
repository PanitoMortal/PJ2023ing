import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/recipe';
import { loginArr } from 'src/app/models/loginArr';
import { VerMenuService } from 'src/app/services/VerMenu.service';
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
  imagenRuta: any;
  avatar: string;
  listRecipes: Recipe[] = [];


  constructor( private router: Router, private backend: BackendserviceService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private _menuService: MenuService, private _errorService: ErrorService, private verMenuService: VerMenuService){}


  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const username = params.get('nameuser');
      this.usuario = username;
      console.log('Nombre de usuario:', username);
   
    });
    this.getMenu();
    this.getRecipes();

  }


  getMenu() {
    this._menuService.getMenu(this.usuario).subscribe(
      (data) => {
        this.avatar = data.userInfo.avatar;

        console.log(this.avatar);
        this.getImage();
      },
      (error) => {
        console.error('Error fetching recipe information:', error);
      }
    )
  }

  getRecipes() {
    this._menuService.getRecipes().subscribe(data => {
      this.listRecipes = data;

      console.log(this.listRecipes);
    })
  }

  SubirReceta(){
    this.mostrarRecetasPropias = !this.mostrarRecetasPropias;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  VerReceta(){
    this.router.navigate([`/verReceta/${this.usuario}`]);
  }

  getImage(){
    this.verMenuService.getImagen(this.avatar).subscribe(
      data => {
        // Convierte el Blob a una URL segura para mostrar la imagen
        this.imagenRuta = URL.createObjectURL(data);
      },
      error => {
        console.error(error);
      }
    );
  }
  

}
