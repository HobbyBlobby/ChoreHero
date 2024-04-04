import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule} from '@angular/material/card';
import { Group, Invitation, bottomAction } from '../app/interfaces';
import { GroupsService } from './groups.service';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule } from  '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav'
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';

import HeroClassData from '../app/data/heroClasses.json';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { HeroClass } from '../app/hero';
import { HeroService } from '../app/hero/hero.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSlideToggleModule,
    MatCardModule, 
    FlexLayoutModule, 
    MatSidenavModule, 
    MatIconModule, 
    MatButtonModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  groupList: Group[] = [];
  groupAvatars: {group: Group, classes: HeroClass[]}[] = [];
  invitations: Invitation[] = [];
  heroClasses: HeroClass[] = HeroClassData.heroClasses;
  public menuEntries : bottomAction[] = [
    {text: "New Group", action: this.newGroup.bind(this), icon: 'add'}
  ];

  constructor(
    private groupService: GroupsService,
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private appService: AppService
) {
  this.appService.emitChangeActions(this.menuEntries);
  this.appService.emitShowToolbar();
}

  ngOnInit(): void {
    this.loadData();
    }

  newGroup() {
    console.log("Create a new group!");
  }

  loadData(): void {
    this.groupService.getAllGroups().subscribe({
      next: groups => {
        this.groupList = groups;
        this._loadGroupMembers();
      },
      error: err => {console.log(err); this.router.navigate([''], {relativeTo: this.activatedRoute});}
    });
    this.groupService.getAllInvitations().subscribe({
      next: result => {this.invitations = result},
      error: err => {console.log(err); this.router.navigate([''], {relativeTo: this.activatedRoute});}
    });
  }

  _loadGroupMembers() {
    this.groupList.forEach(group => {
      this.heroService.getHeros(group.group_id).subscribe({
        next: heros => {
          let heroClasses : HeroClass[] = [];
          heros.forEach(hero => {
            let heroClass = this.heroClasses.find(heroClass => heroClass.class_id == hero.class_id);
            if(heroClass) {
              heroClasses.push(heroClass);
            }
          });
          this.groupAvatars.push({group: group, classes: heroClasses});
        },
        error: err => this.heroService.handleServerError(err)
      });
    });
  }
  _avatarsForGroup(group_id: number) {
    return this.groupAvatars.find(group => group_id === group_id)?.classes || [];
  }

  getGroupFromId(groupId: number): Group {
    console.log(this.invitations);
    return this.groupList.find(group => group.group_id == groupId) || {group_name: 'Not found', group_id: 0};
  }

  onToGroupDetails(group_id: number): void {
    this.router.navigate(['groupDetails', group_id]);
  }

  onInviteAccept(invitation_code: string): void {
    this.groupService.invitationAccept(invitation_code).subscribe({
      error: err => this.groupService.handleServerError(err)
    });
    this.loadData();
  }
  onInviteReject(invitation_code: string): void {
    console.log("Reject", invitation_code);
    this.groupService.invitationReject(invitation_code).subscribe({
      error: err => this.groupService.handleServerError(err)
    });
    this.loadData();
  }


}
