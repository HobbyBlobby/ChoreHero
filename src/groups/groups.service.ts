import { Injectable } from '@angular/core';
import { Group, Invitation } from '../app/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebService } from '../app/web.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})

export class GroupsService extends WebService {
  groupList: Group[] = []
  private groupURL = this.baseURL + 'getGroups.php';
  private invitationURL = this.baseURL + 'getInvitations.php';
  private handleInvitationURL = this.baseURL + 'handleInvitation.php';
  
  constructor(http: HttpClient, snackBar: MatSnackBar){
    super(http, snackBar);
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
  invitationAccept(invitation_code: string): Observable<any> {
    return this.fetch_data<Invitation[]>(this.handleInvitationURL, {accept: true, invitation_code: invitation_code});
  }

  invitationReject(invitation_code: string): Observable<any> {
    return this.fetch_data<Invitation[]>(this.handleInvitationURL, {reject: true, invitation_code: invitation_code});
  }
}
