import { Injectable } from '@angular/core';
import { Group } from '../app/interfaces';
import { HttpClient } from '@angular/common/http';

// import * as JSONgroups from './data/groups.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GroupsService {
  groupList: Group[] = []
  private groupURL = 'http://localhost:8080/api/getGroups.php'
  
  constructor( 
    private http: HttpClient){ }

  getAllGroups(): Observable<Group[]> {
    const account = localStorage.getItem("account") ?? '';
    const loginToken = localStorage.getItem("loginToken") ?? '';
    if(!loginToken) {
      // TODO: implement the case, that no token is available
    }
    return this.http.get<Group[]>(this.groupURL, {
      headers: {'login-token': loginToken},
      params:  {'account': account}
    });
  }
}
