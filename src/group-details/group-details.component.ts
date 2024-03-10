import { Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { GroupDetailsService } from './group-details.service';
import { GroupsService } from '../groups/groups.service';
import { GroupMember, Invitation } from '../app/interfaces';
import { ActivatedRoute } from '@angular/router';
import { DialogGroupInviteComponent } from './dialog-group-invite/dialog-group-invite.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export class GroupDetailsComponent {
  groupMembers: GroupMember[] = [];
  groupInvitations: Invitation[] = [];
  groupId = -1;
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private snackBar: MatSnackBar,
    private groupDetailService: GroupDetailsService,
    private groupsService: GroupsService,
    private inviteDialog: MatDialog
  ) {
    this.groupId = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.groupDetailService.getGroupMembers(this.groupId).subscribe({
      next: members => this.groupMembers = members,
      error: err => console.warn(err)
    });
    this.groupsService.getAllInvitations(this.groupId).subscribe({
      next: invitations => this.groupInvitations = invitations,
      error: err => this.groupsService.handleServerError(err)
    });
  }

  openInviteDialog() {
    const dialogRef = this.inviteDialog.open(DialogGroupInviteComponent, {data: this.groupMembers});
    dialogRef.afterClosed().subscribe(result => {
      this.createInvitation(this.groupId, result.account_name);
    });
  }
  createInvitation(groupId: number, account_name: string) {
    this.groupDetailService.createInvitation(groupId, account_name).subscribe({
      next: result => {
        console.log(result);
        this.snackBar.open(
          'Invitation with code ' + result.data.invitation_code + ' sent', 
          undefined, {duration: 3000, panelClass: ['snack_bar']});
      },
      error: err => {
        if(err.error.status == 'err_exists') {
          this.snackBar.open(
            'Invitation already exists for this account', 
            undefined, {duration: 3000, panelClass: ['snack_bar']});
          } else {
          this.groupDetailService.handleServerError(err); 
        }
      }
    });
  }
}
