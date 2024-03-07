import { Component, Inject, Injectable } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface inviteData {
  inviteToken: string,
  inviteAccount: string
}

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-dialog-group-invite',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './dialog-group-invite.component.html',
  styleUrl: './dialog-group-invite.component.scss'
})
export class DialogGroupInviteComponent {
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: inviteData,
    public dialogRef: MatDialogRef<DialogGroupInviteComponent>
  ) {}

}
