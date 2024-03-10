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
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Account, Invitation, GroupMember } from '../../app/interfaces';
import { CreateAccountService } from '../../create-account/create-account.service';
import { Observable, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatAutocompleteModule,
    FormsModule,
    AsyncPipe,
    ReactiveFormsModule],
  templateUrl: './dialog-group-invite.component.html',
  styleUrl: './dialog-group-invite.component.scss'
})
export class DialogGroupInviteComponent {
  accountForm = new FormControl('');
  data: Invitation = { account_name: '', group_id: 0, invitation_code: '' };
  accounts: Account[] = [];
  filteredAccounts: Observable<Account[]> = new Observable();

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogGroupInviteComponent>,
    private accountService: CreateAccountService,
    @Inject(MAT_DIALOG_DATA) public groupMembers: GroupMember[]
    ) {}

  ngOnInit(): void {
    this.accountService.getExistingAccounts().subscribe(res => this.accounts = res);
    this.filteredAccounts = this.accountForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  invite(): void {
    if(this.accounts.find(account => account.account_name == this.data.account_name)) {
      this.dialogRef.close(this.data);
      return;
    }
    this.snackBar.open(
      'Account ' + this.data.account_name + " does not exists.\nPlease search again.", 
      undefined, 
      {duration: 3000,
       panelClass: ['snack_bar']} // this class allows to use \n for line breaks in snack bar messages
    );
  }

  private _filter(value: string): Account[] {
    const filterValue = value.toLowerCase();
    return this.accounts.filter(account => 
      account.account_name.toLowerCase().includes(filterValue) && !this.groupMembers.find(member => member.account_name == account.account_name)
    );
  }
}
