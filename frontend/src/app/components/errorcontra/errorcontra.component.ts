import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-errorcontra',
  templateUrl: './errorcontra.component.html',
  styleUrls: ['./errorcontra.component.scss']
})
export class ErrorcontraComponent {
  constructor(public dialogRef: MatDialogRef<ErrorcontraComponent>) {}
}
