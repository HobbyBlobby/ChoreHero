import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from  '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CommonModule, Location } from '@angular/common';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { bottomAction } from './interfaces';


import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DockModule } from 'primeng/dock';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    // MatToolbarModule, 
    HttpClientModule, 
    MatIconModule, 
    // MatButtonModule, 
    // MatSidenavModule, 
    MatListModule,
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    DockModule,
    MenuModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'angular-test';
  // @ViewChild(MatSidenav) sidenav!: MatSidenav;
  private hideToolbarEvent: Observable<boolean>;
  public menuEntries : Observable<bottomAction[]>;
  public bottomActions : bottomAction[];
  public sidebarVisible : boolean = false;
  mainMenu: MenuItem[] | undefined;
  public showToolbar: boolean = true;

  constructor(
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private loginService: LoginService,
    private location: Location,
    private appService: AppService
) {
  this.bottomActions = [];
  this.menuEntries = this.appService.changeOnActions$; //.subscribe(value => {this.menuEntries = value;});
  this.menuEntries.subscribe(actions => this.bottomActions = actions || []);
  this.hideToolbarEvent = this.appService.changeOnHideToolbar;
  this.hideToolbarEvent.subscribe(hide => this.showToolbar = !hide);

  window.onscroll = function() {
    console.log("Scroll");
    document.getElementsByClassName("top-toolbar").item(0)?.classList.toggle("top-toolbar-blur", document.documentElement.scrollTop > 50);
    // document.getElementsByClassName("top-toolbar").item(0)?.classList.add("myToolbar")
  };
}

  noOnInit(): void {
    this.mainMenu = [{
          label: 'Account',
          items: [
              {
                  label: 'Logout',
                  icon: 'pi pi-arrow-left',
                  command: () => {
                      this.submitLogout();
                  }
              }
          ]
      }];
    }

  toggleMenu(): void {
    // this.sidenav.toggle();
  }
  navBack(): void {
    this.location.back();
  }

  callFunction(functionName: Function | undefined) {
    if(functionName) {functionName();}
  }

  submitLogout() {
    this.loginService.submitLogout().subscribe({
      next: res => {
        localStorage.clear();
        this.snackBar.open('Auf wiedersehen ' + res.data.account_name + "!", undefined, {duration: 3000});
        this.sidebarVisible = false;
        this.router.navigate([''], {relativeTo: this.activatedRoute});
      },
      error: err => this.loginService.handleServerError(err)
    })
  }

}
