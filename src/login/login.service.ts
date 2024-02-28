import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  submitLogin(account: string, passphrase: string) {
    console.log("Login with %s and %s", account, passphrase);
  }
}
