import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";

export abstract class WebService {
    protected baseURL = 'http://localhost:8080/api/';

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    }

    fetch_data<Type>(url: string, data: object = {}, noToken: boolean = false): Observable<Type> {
        const account = localStorage.getItem("account") ?? '';
        const loginToken = localStorage.getItem("loginToken") ?? '';
        if(!loginToken && !noToken) {
          return new Observable(observer => {observer.error('noToken'); return observer.unsubscribe()})
          // TODO: implement the case, that no token is available
        }

        let params = Object.assign(data);
        if(!noToken) {
          params = Object.assign(data, { account: account } )
        }

        return this.http.get<Type>(url, {
          headers: {'login-token': loginToken},
          params: params
        });
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
  
}