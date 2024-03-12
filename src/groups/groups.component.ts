import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule} from '@angular/material/card';
import { Group, Invitation, bottomAction } from '../app/interfaces';
import { GroupsService } from './groups.service';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule } from  '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav'
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    RouterModule,
    MatSlideToggleModule,
    MatCardModule, 
    FlexLayoutModule, 
    MatSidenavModule, 
    MatIconModule, 
    MatButtonModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  groupList: Group[] = [];
  invitations: Invitation[] = [];
  public menuEntries : bottomAction[] = [
    {text: "New Group", action: this.newGroup.bind(this), icon: 'add'}
  ];

  constructor(
    private groupService: GroupsService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private appService: AppService
) {
  this.appService.emitChangeActions(this.menuEntries);
}

  ngOnInit(): void {
    this.loadData();
    }

  newGroup() {
    console.log("Create a new group!");
  }

  loadData(): void {
    this.groupService.getAllGroups().subscribe({
      next: groups => {this.groupList = groups},
      error: err => {console.log(err); this.router.navigate([''], {relativeTo: this.activatedRoute});}
    });
    this.groupService.getAllInvitations().subscribe({
      next: result => {this.invitations = result},
      error: err => {console.log(err); this.router.navigate([''], {relativeTo: this.activatedRoute});}
    });
  }

  getGroupFromId(groupId: number): Group {
    console.log(this.invitations);
    return this.groupList.find(group => group.group_id == groupId) || {group_name: 'Not found', group_id: 0};
  }

  onToGroupDetails(group_id: number): void {
    this.router.navigate(['groupDetails', group_id]);
  }

  onInviteAccept(invitation_code: string): void {
    this.groupService.invitationAccept(invitation_code).subscribe({
      error: err => this.groupService.handleServerError(err)
    });
    this.loadData();
  }
  onInviteReject(invitation_code: string): void {
    console.log("Reject", invitation_code);
    this.groupService.invitationReject(invitation_code).subscribe({
      error: err => this.groupService.handleServerError(err)
    });
    this.loadData();
  }


}
