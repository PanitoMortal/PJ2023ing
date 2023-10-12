import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  
  constructor(public dialogRef: MatDialogRef<DialogComponent>, private router: Router, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: { parametro: string }) {}

  login(){
    
    this.route.paramMap.subscribe(params => {
 
      this.router.navigate(['/menu', this.data.parametro]);
      
    });
  }
}
