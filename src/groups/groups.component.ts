import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule} from '@angular/material/card';
import { Group } from '../app/interfaces';
import { GroupsService } from './groups.service';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatSidenavModule } from '@angular/material/sidenav'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [MatSlideToggleModule,MatCardModule, FlexLayoutModule, MatSidenavModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  groupList: Group[] = [];
  constructor(
    private groupService: GroupsService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
) {}
  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe({
      next: groups => {this.groupList = groups},
      error: err => {console.log(err); this.router.navigate([''], {relativeTo: this.activatedRoute});}
    });
  }

}
