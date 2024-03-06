import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class WebService {
    protected baseURL = 'http://localhost:8080/api/'
    
    constructor(private http: HttpClient) {}

    fetch_data<Type>(url: string, data: object = {}): Observable<Type[]> {
        const account = localStorage.getItem("account") ?? '';
        const loginToken = localStorage.getItem("loginToken") ?? '';
        if(!loginToken) {
          return new Observable(observer => {observer.error('noToken'); return observer.unsubscribe()})
          // TODO: implement the case, that no token is available
        }
        
        return this.http.get<Type[]>(url, {
          headers: {'login-token': loginToken},
          params: Object.assign(data, { account: account } )
        });
    }
}