import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountService } from './create-account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: 'create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  createForm = new FormGroup({
    account: new FormControl(''),
    passphrase: new FormControl(''),
    passphrase_confirm: new FormControl('')
  })

  constructor(
    private snackBar: MatSnackBar, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private createAccount: CreateAccountService) {}

  submitCreate() {
    if (this.createForm.value.passphrase != this.createForm.value.passphrase_confirm) {
      this.snackBar.open('Passwörter stimmen nicht überein.', undefined, {duration: 3000});
      return;
    }
    if (this.createForm.value.account?.trim() == "") {
      this.snackBar.open('Accountname darf nicht leer sein.', undefined, {duration: 3000});
      return;
    }
    this.createAccount.createAccount(
      this.createForm.value.account ?? '',
      this.createForm.value.passphrase ?? ''
    ).subscribe({
      next: value => {
        this.snackBar.open(
          'Account' + value.data.newAccount + 'successfully created.', 
          undefined, {duration: 3000, panelClass: ['snack_bar']});
        this.router.navigate([''], {relativeTo: this.activatedRoute}); // TODO: navigate to route with account name
      },
      error: err => console.error(err)
    });
  }
}
