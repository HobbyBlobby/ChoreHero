import { Injectable } from '@angular/core';
import { Group } from './interfaces';
import { HttpClient } from '@angular/common/http';

// import * as JSONgroups from './data/groups.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GroupsService {
  groupList: Group[] = []
  private groupURL = 'http://localhost:8080/api/read.php'
  // private groupURL = './data/groups.json';
  
  constructor( 
    private http: HttpClient){
    // this.getAllGroups().then((groupList: Group[]) => this.groupList = groupList);
  }

  getAllGroups(): Observable<Group[]> {
    // return JSONgroups.groups;
    // console.warn("Call get");
    let loginToken = localStorage.getItem("loginToken") ?? '';
    if(!loginToken) {
      // TODO: implement the case, that no token is available
    }
    return this.http.get<Group[]>(this.groupURL, {
      headers: {'login-token': loginToken}});
    // const data = await fetch('./data/groups.json');
    // return await data.json() ?? [];
  }

  // getGroupById(search_id: number): Group | undefined {
    // return JSONgroups.groups.find(group => search_id == group.id);
  // }

}
