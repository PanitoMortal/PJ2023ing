import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acerda-de',
  templateUrl: './acerda-de.component.html',
  styleUrls: ['./acerda-de.component.scss']
})
export class AcerdaDeComponent {

  constructor(private router: Router){}
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

  principal(){
    this.router.navigateByUrl('/principal');
  }
}
