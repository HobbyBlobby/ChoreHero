import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list'
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    MatToolbarModule, 
    HttpClientModule, 
    MatIconModule, 
    MatButtonModule, 
    MatSidenavModule, 
    MatListModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-test';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
) {}

  toggleMenu(): void {
    this.sidenav.toggle();
  }

  submitLogout() {
    const account = localStorage.getItem("account");
    localStorage.clear();
    this.snackBar.open('Auf wiedersehen ' + account + "!", undefined, {duration: 3000});
    this.sidenav.close();
    this.router.navigate([''], {relativeTo: this.activatedRoute});
  }

}
