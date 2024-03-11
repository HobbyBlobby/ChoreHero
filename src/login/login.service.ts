import { Injectable } from '@angular/core';
import { CreateAccountService } from '../create-account/create-account.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, LogoutResponse } from '../app/interfaces';
import { WebService } from '../app/web.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends WebService {
  private loginURL = this.baseURL + '/login.php';
  private logoutURL = this.baseURL + '/logout.php';
  constructor(private accountService: CreateAccountService, 
    http: HttpClient,
    snackBar: MatSnackBar,
    router: Router) { 
      super(http, snackBar, router);
    }

  submitLogin(account: string, passphrase: string): Observable<LoginResponse> {
    let hash = this.accountService.createHash(account, passphrase);
    return this.fetch_data<LoginResponse>(
      this.loginURL, {"account": account, "hash": hash}, true);
  }

  submitLogout(): Observable<LogoutResponse> {
    return this.fetch_data<LogoutResponse>(this.logoutURL);
  }
}
