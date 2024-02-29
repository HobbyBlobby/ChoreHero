import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  private createAccountURL = 'http://localhost:8080/api/createAccount.php'

  constructor(private http: HttpClient) { }

  createAccount(account: string, passphrase: string): Observable<string> {
    let hash = this.createHash(account, passphrase);
    return this.http.get<string>(this.createAccountURL, {params: {"account": account, "hash": hash}});
  }

  createHash(account: string, passphrase: string) : string {
    return SHA256(account + ":" + passphrase).toString();
  }
}
