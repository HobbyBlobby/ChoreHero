import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list'
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, HttpClientModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-test';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor() {}

  toggleMenu(): void {
    console.log("clicked");
    this.sidenav.toggle();
  }

}
