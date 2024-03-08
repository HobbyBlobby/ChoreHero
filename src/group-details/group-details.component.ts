import { Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { GroupDetailsService } from './group-details.service';
import { GroupMember } from '../app/interfaces';
import { ActivatedRoute } from '@angular/router';
import { DialogGroupInviteComponent } from './dialog-group-invite/dialog-group-invite.component';
import { MatDialog } from '@angular/material/dialog';


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
  groupId = '';
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private groupDetailService: GroupDetailsService,
    private inviteDialog: MatDialog
  ) {
    this.groupId = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.groupDetailService.getGroupMembers(this.groupId).subscribe({
      next: members => this.groupMembers = members,
      error: err => console.warn(err)
    });
  }

  openInviteDialog() {
    this.inviteDialog.open(DialogGroupInviteComponent, {data: this.groupMembers});
  }
}
