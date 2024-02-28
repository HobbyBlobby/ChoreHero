import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  private createAccountURL = 'http://localhost:8080/api/createAccount.php'

  constructor(private http: HttpClient) { }

  createAccount(account: string, passphrase: string): Observable<string> {
    let hash = this.createHash(account, passphrase);
    let params = new HttpParams();
    params.append("account", account);
    params.append("hash", hash);
    let url = this.createAccountURL + "?account=" + account + "&hash=" + hash;
    return this.http.get<string>(url);
  }

  createHash(account: string, passphrase: string) : string {
    return SHA256(account + ":" + passphrase).toString();
  }
}
