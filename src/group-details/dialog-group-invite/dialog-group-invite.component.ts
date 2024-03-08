import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { inviteData } from '../../app/interfaces';

@Component({
  selector: 'app-dialog-group-invite',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    FormsModule],
  templateUrl: './dialog-group-invite.component.html',
  styleUrl: './dialog-group-invite.component.scss'
})
export class DialogGroupInviteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogGroupInviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: inviteData) {}
}
