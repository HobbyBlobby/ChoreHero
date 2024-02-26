import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GroupsComponent } from '../groups/groups.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GroupsComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-test';

  constructor() {
  }

}
