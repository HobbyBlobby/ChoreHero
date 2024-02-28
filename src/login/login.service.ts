import { Injectable } from '@angular/core';
import { CreateAccountService } from '../create-account/create-account.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private accountService: CreateAccountService) { }

  submitLogin(account: string, passphrase: string) {
    let hash = this.accountService.createHash(account, passphrase);
    console.log("Login with %s and %s", account, hash);
  }
}
