import { Component, OnInit } from '@angular/core';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';
import { ErrorcontraComponent } from '../errorcontra/errorcontra.component';
import { MatDialog } from '@angular/material/dialog';
import { MensajeinsertComponent } from '../mensajeinsert/mensajeinsert.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  name: string ="";
  password: string = "";
  date: string = "";
  gender: string = "";
  username: string = "";
  loading: boolean = false;
  avatarBase64: string | null = null;
  
  avatar: File | null = null; // Para almacenar la imagen seleccionada
  imageUrl: string | ArrayBuffer | null = null; // Para mostrar la imagen

  constructor(private backend: BackendserviceService, public dialog: MatDialog, private router: Router, private toastr: ToastrService, private _userService: UserService, private _errorService: ErrorService){}

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    // Obtén la imagen seleccionada
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.avatar = selectedFile;

      // Lee la imagen y muestra la vista previa
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.avatarBase64 = reader.result as string;
      };
    }
  }

  addUser() {
    if(this.username == '' || this.password == '' || this.date =='' || this.gender == '' || this.name == '' ) {
      this.toastr.error('All fields are required');
      return;
    }
    if(this.password.length <= 6) {
      this.toastr.error('The password must be greater than or equal to 6 characters');
      return;
    }

    //creacion del objeto
    const user: User = {
      avatar: this.avatarBase64,
      name: this.name,
      password: this.password,
      gender: this.gender,
      date: this.date,
      username: this.username
    }


    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`The user ${this.username} was registered successfully`, 'Username Registered');
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    })
  }


  Volver(){
    this.router.navigateByUrl('/login');
  }


}
