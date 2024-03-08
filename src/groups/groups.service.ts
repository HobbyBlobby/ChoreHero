import { Injectable } from '@angular/core';
import { Group } from '../app/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebService } from '../app/web.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class GroupsService extends WebService {
  groupList: Group[] = []
  private groupURL = this.baseURL + 'getGroups.php';
  
  constructor(http: HttpClient, snackBar: MatSnackBar){
    super(http, snackBar);
   }

  getAllGroups(): Observable<Group[]> {
    return this.fetch_data<Group[]>(this.groupURL);
  }
}
