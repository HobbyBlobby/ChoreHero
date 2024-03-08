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
import { Account, inviteData } from '../../app/interfaces';
import { CreateAccountService } from '../../create-account/create-account.service';
import { Observable, map, startWith } from 'rxjs';
import { GroupMember } from '../../app/interfaces';
import { group } from '@angular/animations';

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
  data: inviteData = { inviteAccount: '', inviteToken: ''};
  accounts: Account[] = [];
  filteredAccounts: Observable<Account[]> = new Observable();

  constructor(
    public dialogRef: MatDialogRef<DialogGroupInviteComponent>,
    private accountService: CreateAccountService,
    @Inject(MAT_DIALOG_DATA) public groupMembers: GroupMember[]
    ) {}

  ngOnInit(): void {
    console.log("already has", this.groupMembers);
    this.accountService.getExistingAccounts().subscribe(res => this.accounts = res);
    this.filteredAccounts = this.accountForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): Account[] {
    const filterValue = value.toLowerCase();
    return this.accounts.filter(account => 
      account.account_name.toLowerCase().includes(filterValue) && !this.groupMembers.find(member => member.account_name == account.account_name)
    );
  }
}
