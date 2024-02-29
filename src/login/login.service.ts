import { Injectable } from '@angular/core';
import { CreateAccountService } from '../create-account/create-account.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginURL = 'http://localhost:8080/api/login.php'
  constructor(private accountService: CreateAccountService, private http: HttpClient) { }

  submitLogin(account: string, passphrase: string): Observable<LoginResponse> {
    let hash = this.accountService.createHash(account, passphrase);
    return this.http.get<LoginResponse>(
      this.loginURL, 
      {params: {"account": account, "hash": hash}});
  }

}
