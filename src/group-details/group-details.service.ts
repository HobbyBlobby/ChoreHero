import { Injectable } from '@angular/core';
import { WebService } from '../app/web.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupMember, InvitationResponse } from '../app/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GroupDetailsService extends WebService {
  private membersURL = this.baseURL + 'groupMembers.php';
  private createInvitationURL = this.baseURL + 'createInvitation.php';
    
  constructor(http: HttpClient, snackBar: MatSnackBar){
    super(http, snackBar);
   }

  getGroupMembers(groupId: string): Observable<GroupMember[]> {
    return this.fetch_data<GroupMember[]>(this.membersURL, {groupId: groupId});
   }

   createInvitation(group_id: string, accout_name: string = ''): Observable<InvitationResponse> {
      return this.fetch_data<InvitationResponse>(this.createInvitationURL, {group_id: group_id, account_name: accout_name});
   }
}
