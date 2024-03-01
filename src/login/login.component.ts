import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { MatSidenavModule } from '@angular/material/sidenav'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from '../app/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    account: new FormControl(''),
    passphrase: new FormControl('')
  })

  constructor(
    private loginService: LoginService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private snackBar: MatSnackBar) {}

  submitLogin() {
    this.loginService.submitLogin(
      this.loginForm.value.account ?? '',
      this.loginForm.value.passphrase ?? ''
    ).subscribe({
        next: value => this.handleLoginResponse(value, this.loginForm.value.account ?? ''),      
        error: err =>  this.handleServerError(err)
    });
  }

  submitLogout() {
    const account = localStorage.getItem("account");
    localStorage.clear();
    this.snackBar.open('Auf wiedersehen ' + account + "!", undefined, {duration: 3000});
    this.router.navigate([''], {relativeTo: this.activatedRoute});
}

  handleLoginResponse(response: LoginResponse, account: string): void {
    if(response.status == "success") {
      localStorage.setItem("loginToken", response.data.token);
      localStorage.setItem("account", account);
      this.snackBar.open('Willkommen ' + account + "!", undefined, {duration: 3000});
      this.router.navigate(['groupList'], {relativeTo: this.activatedRoute});
      return;
    }
    if(response.status == "err_failed") {
      this.snackBar.open('Nutzer/Passwort falsch ', undefined,
      { duration: 3000,
        panelClass: ['snack_bar']
      });
      return;
    }
  }

  handleServerError(error: HttpErrorResponse): void {
    console.warn(error.statusText)
    this.snackBar.open(
      'Internen Fehler, bitte später erneut probieren.\n(Fehler ' + error.status + ": " + error.statusText + ')', 
      undefined, 
      {duration: 3000,
       panelClass: ['snack_bar']} // this class allows to use \n for line breaks in snack bar messages
    );
  }

  clickCreateAccount() {
    this.router.navigate(['createAccount'], {relativeTo: this.activatedRoute});
  }
}
