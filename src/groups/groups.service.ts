import { Injectable } from '@angular/core';
import { Group, GroupMember, Invitation } from '../app/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebService } from '../app/web.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { group } from '@angular/animations';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GroupsService extends WebService {
  groupList: Group[] = []
  private groupURL = this.baseURL + 'getGroups.php';
  private invitationURL = this.baseURL + 'getInvitations.php';
  private handleInvitationURL = this.baseURL + 'handleInvitation.php';
  private removeMemberURL = this.baseURL + 'removeMember.php';
  
  constructor(http: HttpClient, snackBar: MatSnackBar, router: Router){
    super(http, snackBar, router);
   }

  getAllGroups(): Observable<Group[]> {
    return this.fetch_data<Group[]>(this.groupURL);
  }

  getAllInvitations(groupId: number = -1): Observable<Invitation[]> {
    if(groupId > 0) {
      return this.fetch_data<Invitation[]>(this.invitationURL, {group_id: groupId});
    } else {
      return this.fetch_data<Invitation[]>(this.invitationURL);
    }
  }

  removeMember(member: GroupMember): Observable<any> {
    console.log("Remove", member);
    return this.fetch_data<any>(this.removeMemberURL, {group_id: member.group_id, account_name: member.account_name});
  }

  invitationAccept(invitation_code: string): Observable<any> {
    return this.fetch_data<Invitation[]>(this.handleInvitationURL, {accept: true, invitation_code: invitation_code});
  }

  invitationReject(invitation_code: string): Observable<any> {
    return this.fetch_data<Invitation[]>(this.handleInvitationURL, {reject: true, invitation_code: invitation_code});
  }
}
