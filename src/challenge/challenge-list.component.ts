import { Component } from '@angular/core';
import { Challenge } from '../app/challenge';
import { ChallengeService } from './challenge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './challenge-list.component.html',
  styleUrl: './challenge-list.component.scss'
})
export class ChallengeListComponent {
  public challenges: Challenge[] = [];
  private group_id: number = -1;
  public deleteDialogVisible : boolean = false;
  public challengeToDelete: Challenge | undefined;
  constructor(
    private msgService: MessageService,
    private challengeService: ChallengeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.group_id = this.route.snapshot.params['group_id'];
  }

  ngOnInit(): void {
    this.loadData();    
  }

  loadData(): void {
    this.challengeService.getChallenges(this.group_id).subscribe({
      next: challenges => this.challenges = challenges,
      error: err => this.challengeService.handleServerError(err)
    });
  }

  editChallenge(id: number) {
    this.router.navigate(['challengeEdit', this.group_id, id]);
  }

  deleteChallenge(id: number) {
    this.challengeToDelete = this.challenges.find(challenge => challenge.challenge_id == id);
    this.deleteDialogVisible = true;
  }

  _deleteChallengeSingle(id: number | undefined) {
    if(!id) return;
    this.challengeService.deleteChallenge(this.group_id, id, false).subscribe({
      next: () => {
        this.msgService.add({
          severity: "success",
          detail: 'Challenge ' + this.challengeToDelete?.challenge_name + " deleted.",
          summary: "Selected"
        });}, 
      error: err => this.challengeService.handleServerError(err)
    });
    this.deleteDialogVisible = false;
    this.loadData();
  }
  _deleteChallengeWTasks(id: number | undefined) {
    if(!id) return;
    this.challengeService.deleteChallenge(this.group_id, id, true).subscribe({
      next: () => {
        this.msgService.add({
          severity: "success",
          detail: 'Challenge ' + this.challengeToDelete?.challenge_name + " and all open tasks deleted.",
          summary: "Selected"
        });}, 
      error: err => this.challengeService.handleServerError(err)
    });
    this.deleteDialogVisible = false;
    this.loadData();
  }

}
