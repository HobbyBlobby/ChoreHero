import { Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { GroupDetailsService } from './group-details.service';
import { GroupsService } from '../groups/groups.service';
import { GroupMember, Invitation, bottomAction, Task, groupHero, taskSkill } from '../app/interfaces';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogGroupInviteComponent } from './dialog-group-invite/dialog-group-invite.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { AppService } from '../app.service';
import { ChallengeService } from '../challenge/challenge.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { Hero, HeroClass } from '../app/hero';
import { HeroService } from '../app/hero/hero.service';
import { AvatarModule } from 'primeng/avatar';
import HeroClassData from '../app/data/heroClasses.json';
import { Challenge, Skill, SkillAssignment } from '../app/challenge';
import SkillData from '../app/data/skills.json';
import RoleData from '../app/data/hero_roles.json'

import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    AvatarModule,
    MatExpansionModule,
    CardModule,
    ButtonModule,
    MultiSelectModule,
    TabViewModule,
    TableModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export class GroupDetailsComponent {
  groupMembers: GroupMember[] = [];
  groupInvitations: Invitation[] = [];
  heros: Hero[] = [];
  groupHeros: groupHero[] = [];
  groupHeroFilter: string[] = [];
  taskSkills: taskSkill[] = [];
  skills: Skill[] = SkillData.skills;
  heroClasses: HeroClass[] = HeroClassData.heroClasses;
  tasks: Task[] = [];
  challenges: Challenge[] = [];
  groupId = -1;
  account_name : string;
  account_role: {role_name: string, role_level: number} | undefined = undefined;
  today = '';
  route: ActivatedRoute = inject(ActivatedRoute);
  public menuEntries : bottomAction[] = [
    {text: 'Create Challenge', action: this.createGroupChallenge.bind(this), icon: 'pi-plus', requiredLevel: 10},
    {text: 'Manage Challenges', action: this.manageChallenges.bind(this), icon: 'pi-list', requiredLevel: 10}
  ];
  activeFilter = { "myTasks" : false }

  constructor(
    private snackBar: MatSnackBar,
    private groupDetailService: GroupDetailsService,
    private groupsService: GroupsService,
    private inviteDialog: MatDialog,
    private appService: AppService,
    private challengeService: ChallengeService,
    private heroService: HeroService,
    private router: Router
  ) {
    this.groupId = this.route.snapshot.params['id'];
    this.account_name = localStorage.getItem("account") || "";
    this.appService.emitChangeActions(this.menuEntries);
  }

  ngOnInit(): void {
    this.loadData();
  }

  _debugLog(data: any) : void {
    console.log(data);
  }

  requiredLevel(requiredLevel: number) : boolean {
    if(!this.account_role) return false;
    return this.account_role.role_level >= requiredLevel;
  }

  _setMyGroupRole() : void {
    let role_name = this.groupMembers.find(member => member.account_name === this.account_name)?.group_role || '';
    if(role_name) {
      this.account_role = {
        role_name: role_name,
        role_level: RoleData.roles.find(role => role.name === role_name)?.level || 0
      }
      this.appService.emitGroupLevelChanged(this.account_role?.role_level);
    }
  }

  loadData(): void {
    const today = new Date();
    this.today = today.getFullYear() + "-" + (today.getMonth()+1).toString().padStart(2, '0') + "-" + today.getDate().toString().padStart(2, '0');
    this.groupDetailService.getGroupMembers(this.groupId).subscribe({
      next: members => {this.groupMembers = members; this._setMyGroupRole(); this._loadAndMergeHeros()},
      error: err => this.groupDetailService.handleServerError(err)
    });
    this.groupsService.getAllInvitations(this.groupId).subscribe({
      next: invitations => this.groupInvitations = invitations,
      error: err => this.groupsService.handleServerError(err)
    });
    this.challengeService.getTasks(this.groupId).subscribe({
      next: tasks => {this.tasks = this._sortTasks(tasks); this._loadAndMergeSkills()},
      error: err => this.challengeService.handleServerError(err)
    });
    this.challengeService.getChallenges(this.groupId).subscribe({
      next: challenges => { this.challenges = challenges;},
      error: err => this.challengeService.handleServerError(err)
    });
  }

  changeRoleClicked(member: GroupMember) : void {
    console.log("Change Role popup for", member);
  }

  _loadAndMergeSkills() {
    let challenge_ids : string[] = [];
    this.tasks.forEach(task => {
      if(challenge_ids.find(id => task.challenge_id.toString() === id ) == undefined) {challenge_ids.push(task.challenge_id.toString())}
    });
    if(challenge_ids.length == 0) {return;}
    this.challengeService.getSkills(challenge_ids, this.groupId).subscribe({
      next: skills => {this._mergeSkills(skills)},
      error: err => this.challengeService.handleServerError(err)
    });
  }

  _mergeSkills(skills: SkillAssignment[]) {
    if(!skills) return;
    skills.forEach(skill => { skill.skill_name = this.skills.find(data => data.skill_id == skill.skill_id)?.skill_name;});
    this.tasks.forEach(task => this.taskSkills.push({
      task: task,
      skills: skills.filter(skill => skill.challenge_id === task.challenge_id)
    }));
    console.log(this.taskSkills);
  }

  _loadAndMergeHeros() {
    this.heroService.getHeros(this.groupId).subscribe({
      next: heros => {this.heros = heros, this._mergeHeros()},
      error: err => this.heroService.handleServerError(err)
    });
  }

  _mergeHeros() {
    this.groupHeros = [];
    this.groupMembers.forEach(member => {
      let groupHero: groupHero = {member: member};
      groupHero.hero = this.heros.find(hero => member.account_name === hero.account_name);
      groupHero.heroClass = this.heroClasses.find(heroClass => heroClass.class_id == groupHero.hero?.class_id);
      if(!groupHero.heroClass) {
        groupHero.heroClass = {
          class_id : -1,
          class_name : 'No hero created yet.',
          img : '/assets/heros/dummy_placeholder.png',
          img_full : '/assets/heros/dummy_placeholder.png',
          img_head : '/assets/heros/dummy_placeholder.png'
        }
      }
      this.groupHeros.push(groupHero);
      this.groupHeroFilter.push(member.account_name);
    });
  }

  _sortTasks(tasks: Task[]): Task[] {
    tasks.forEach(task => task.assigned_to = task.assigned_to || ''); // replace "null" with empty string for assigned_to
    return tasks.sort((task1, task2) => task1.due_date < task2.due_date ? -1 : 1);
  }

  assignTask(task_id: number, account_name: string): void {
    let task = this.tasks.find(task => task.task_id === task_id);
    if(task) {
      task.assigned_to = account_name;
      this.challengeService.updateTask(task).subscribe();
    }
  }
  clearTask(task_id: number): void {
    let task = this.tasks.find(task => task.task_id === task_id);
    if(task) {
      if(!task.assigned_to) {
        this.snackBar.open(
          'Assign task before clearing it.', 
          undefined, {duration: 3000, panelClass: ['snack_bar']});
        return;
      }
      task.status = "done";
      console.log(task);
      this.challengeService.clearTask(task).subscribe({
        next: () => {if(task) this.challengeService.updateTask(task).subscribe();},
        error: err => {this.challengeService.handleServerError(err); if(task) task.status = "open";}
      });
    }
  }

  getFilterFromHero(data: groupHero[]) : string[] {
    let filter : string[] = [];
    data.forEach(hero => filter.push(hero.member.account_name));
    return filter;
  }

  setAssignFilter(assigned_to: string) : void {
    let select = document.getElementById("assignSelect");
    console.log(select);
  }

  getHeroFromFilter(account_name: string = this.account_name) : groupHero | undefined {
    return this.groupHeros.find(hero => account_name === hero.member.account_name);
  }

  createGroupChallenge() {
    this.router.navigate(['challengeCreate', this.groupId]);
  }

  manageChallenges() {
    this.router.navigate(['challengeManage', this.groupId]);
  }

  removeMember(member: GroupMember): void {
    this.groupsService.removeMember(member).subscribe({
      next: res => this.loadData()
    });
  }

  openInviteDialog() {
    const dialogRef = this.inviteDialog.open(DialogGroupInviteComponent, {data: this.groupMembers});
    dialogRef.afterClosed().subscribe(result => {
      if(result.account_name) {
        this.createInvitation(this.groupId, result.account_name);
      }
    });
  }
  createInvitation(groupId: number, account_name: string) {
    this.groupDetailService.createInvitation(groupId, account_name).subscribe({
      next: result => {
        console.log(result);
        this.loadData();
        this.snackBar.open(
          'Invitation with code ' + result.data.invitation_code + ' sent', 
          undefined, {duration: 3000, panelClass: ['snack_bar']});
      },
      error: err => {
        if(err.error.status == 'err_exists') {
          this.snackBar.open(
            'Invitation already exists for this account', 
            undefined, {duration: 3000, panelClass: ['snack_bar']});
          } else {
          this.groupDetailService.handleServerError(err); 
        }
      }
    });
  }
}
