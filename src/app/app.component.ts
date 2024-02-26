import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import { Group } from './interfaces';
import { GroupsService } from './groups.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MatCardModule, MatGridListModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  groupList: Group[] = [];
  groupService: GroupsService = inject(GroupsService);

  title = 'angular-test';

  constructor() {
    this.groupList = this.groupService.getAllGroups();
  }

}
