import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { MatSidenavModule } from '@angular/material/sidenav'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    account: new FormControl(''),
    passphrase: new FormControl('')
  })

  constructor(private loginService: LoginService) {}

  submitLogin() {
    this.loginService.submitLogin(
      this.loginForm.value.account ?? '',
      this.loginForm.value.passphrase ?? ''
    );
  }
}
