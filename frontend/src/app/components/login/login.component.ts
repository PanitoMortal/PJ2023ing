import { Dialog} from '@angular/cdk/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { ErrorcontraComponent } from '../errorcontra/errorcontra.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { userLogin } from 'src/app/interfaces/userLogin';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  
  constructor(private router: Router, private toastr: ToastrService, private _userService: UserService, private _errorService: ErrorService){}

  ngOnInit(): void {
  }

  login() {
    //Validamos que el usuario ingrese datos
    if(this.username == '' || this.password == '') {
      this.toastr.error('All fields are required', 'Error');
      return
    }
    //Creamos el body
    const user: userLogin = {
      username: this.username,
      password: this.password
    }

    this.loading = true;

    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate([`/menu/${this.username}`]);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false
      }
    })
  }

  principal(){
    this.router.navigateByUrl('/principal');
  }


  NewUsuario(){
    this.router.navigateByUrl('/user');
  }
}
