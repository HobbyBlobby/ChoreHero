import { Injectable } from '@angular/core';
import { Group } from '../app/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebService } from '../app/web.service';

@Injectable({
  providedIn: 'root'
})

export class GroupsService extends WebService {
  groupList: Group[] = []
  private groupURL = 'http://localhost:8080/api/getGroups.php'
  
  constructor(http: HttpClient){
    super(http);
   }

  getAllGroups(): Observable<Group[]> {
    return this.fetch_data<Group>(this.groupURL);
  }
}
