import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse, bottomAction } from '../app/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { AppService } from '../app.service';

import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    InputTextModule,
    ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    account: new FormControl(''),
    passphrase: new FormControl('')
  })
  returnTo : string = '';
  public menuEntries : bottomAction[] = [];

  constructor(
    private loginService: LoginService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
    private appService: AppService) {
      this.appService.emitChangeActions(this.menuEntries);
      this.appService.emitHideToolbar();
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(map => this.returnTo = map.get("returnTo") || '');
  }

  submitLogin() {
    this.loginService.submitLogin(
      this.loginForm.value.account ?? '',
      this.loginForm.value.passphrase ?? ''
    ).subscribe({
        next: value => this.handleLoginResponse(value, this.loginForm.value.account ?? ''),      
        error: err =>  this.handleServerError(err)
    });
  }

  handleLoginResponse(response: LoginResponse, account: string): void {
    if(response.status == "success") {
      console.log("Login successful", response);
      localStorage.setItem("loginToken", response.data.token);
      localStorage.setItem("account", account);
      this.snackBar.open('Willkommen ' + account + "!", undefined, {duration: 3000});
      if(this.returnTo) {
        this.location.back();
        return;
      }
      this.router.navigate(['groupList']);
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
    this.router.navigate(['createAccount']);
  }
}
