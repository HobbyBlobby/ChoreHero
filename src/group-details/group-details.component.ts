import { Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { GroupDetailsService } from './group-details.service';
import { GroupsService } from '../groups/groups.service';
import { GroupMember, Invitation, bottomAction } from '../app/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogGroupInviteComponent } from './dialog-group-invite/dialog-group-invite.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { AppService } from '../app.service';
import { ChallengeService } from '../challenge/challenge.service';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export class GroupDetailsComponent {
  groupMembers: GroupMember[] = [];
  groupInvitations: Invitation[] = [];
  tasks: any = [];
  groupId = -1;
  route: ActivatedRoute = inject(ActivatedRoute);
  public menuEntries : bottomAction[] = [
    {text: 'Create Challenge', action: this.createGroupChallenge.bind(this), icon: 'add'}
  ];

  constructor(
    private snackBar: MatSnackBar,
    private groupDetailService: GroupDetailsService,
    private groupsService: GroupsService,
    private inviteDialog: MatDialog,
    private appService: AppService,
    private challengeService: ChallengeService,
    private router: Router
  ) {
    this.groupId = this.route.snapshot.params['id']
    this.appService.emitChangeActions(this.menuEntries);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.groupDetailService.getGroupMembers(this.groupId).subscribe({
      next: members => this.groupMembers = members,
      error: err => this.groupDetailService.handleServerError(err)
    });
    this.groupsService.getAllInvitations(this.groupId).subscribe({
      next: invitations => this.groupInvitations = invitations,
      error: err => this.groupsService.handleServerError(err)
    });
    this.challengeService.getTasks(this.groupId).subscribe({
      next: tasks => {this.tasks = tasks; console.log(tasks)},
      error: err => this.challengeService.handleServerError(err)
    })
  }

  createGroupChallenge() {
    this.router.navigate(['challengeCreate', this.groupId]);
  }

  removeMember(member: GroupMember): void {
    this.groupsService.removeMember(member).subscribe({
      next: res => this.loadData()
    });
  }

  openInviteDialog() {
    const dialogRef = this.inviteDialog.open(DialogGroupInviteComponent, {data: this.groupMembers});
    dialogRef.afterClosed().subscribe(result => {
      if(result.account_name) {
        this.createInvitation(this.groupId, result.account_name);
      }
    });
  }
  createInvitation(groupId: number, account_name: string) {
    this.groupDetailService.createInvitation(groupId, account_name).subscribe({
      next: result => {
        console.log(result);
        this.loadData();
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
