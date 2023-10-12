import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajemod',
  templateUrl: './mensajemod.component.html',
  styleUrls: ['./mensajemod.component.scss']
})
export class MensajemodComponent {
  constructor(public dialogRef: MatDialogRef<MensajemodComponent>, private router: Router) {}

  Irtabla(){
    this.router.navigateByUrl('/table');
  }
}
