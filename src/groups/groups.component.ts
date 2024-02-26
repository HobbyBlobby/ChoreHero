import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule} from '@angular/material/card';
import { Group } from '../app/interfaces';
import { GroupsService } from '../app/groups.service';
import { FlexLayoutModule } from '@angular/flex-layout'

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [MatSlideToggleModule,MatCardModule, FlexLayoutModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  groupList: Group[] = [];
  // groupService: GroupsService = inject(GroupsService);
  constructor(private groupService: GroupsService) {
    // this.groupService.getAllGroups().then((groups: Group[]) => this.groupList = groups);
  }
  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe(groups => { console.log(groups); this.groupList = groups;} );
  }

}
