import { Injectable } from '@angular/core';
import { WebService } from '../app/web.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupMember } from '../app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupDetailsService extends WebService {
  private membersURL = this.baseURL + 'groupMembers.php';
    
  constructor(http: HttpClient){
    super(http);
   }

  getGroupMembers(groupId: string): Observable<GroupMember[]> {
    return this.fetch_data<GroupMember>(this.membersURL, {groupId: groupId});
   }
}
