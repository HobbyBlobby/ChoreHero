import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Observable, noop } from 'rxjs';
import { Account } from '../app/interfaces';
import { WebService } from '../app/web.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService extends WebService {
  private createAccountURL = this.baseURL + 'createAccount.php';
  private getAccountsURL = this.baseURL + 'getExistingAccounts.php';

  constructor(http: HttpClient) { super(http); }

  createAccount(account: string, passphrase: string): Observable<string[]> {
    let hash = this.createHash(account, passphrase);
    return this.fetch_data<string>(this.createAccountURL, {account: account, hash: hash}, true);
  }

  getExistingAccounts(): Observable<Account[]> {
    return this.fetch_data<Account>(this.getAccountsURL);
  }

  createHash(account: string, passphrase: string) : string {
    return SHA256(account + ":" + passphrase).toString();
  }
}
