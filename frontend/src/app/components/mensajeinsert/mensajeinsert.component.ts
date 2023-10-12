import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajeinsert',
  templateUrl: './mensajeinsert.component.html',
  styleUrls: ['./mensajeinsert.component.scss']
})
export class MensajeinsertComponent {
  constructor(public dialogRef: MatDialogRef<MensajeinsertComponent>, private router: Router) {}
  aceptar(){
    this.router.navigateByUrl('/login');
  }

}
