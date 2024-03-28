import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { bottomAction } from '../app/interfaces';
import { AppService } from '../app.service';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from './challenge.service';
import SkillData from '../app/data/skills.json';
import { Skill, SkillAssignment } from '../app/challenge';
import { SliderModule } from 'primeng/slider';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-challenge-create',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    StepperModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    InputTextareaModule,
    SliderModule],
  templateUrl: './challenge-create.component.html',
  styleUrl: './challenge-create.component.scss'
})
export class ChallengeCreateComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  createForm = new FormGroup({
    challenge_name: new FormControl('', Validators.required),
    description: new FormControl('')
  })
  scheduleForm = new FormGroup({
    schedule_mode: new FormControl('OneTime'),
    schedule_date: new FormControl(Date()),
    schedule_period: new FormControl(1),
    schedule_selection: new FormControl([''])
  })
  skillForm = new FormGroup({});
  public menuEntries : bottomAction[] = [{
    text: 'from Template',
    icon: 'content_copy',
    action: this.loadTemplate
  }];
  groupId = -1;
  challenge_id : number = -1;
  skills: Skill[] = [];

  constructor(
    private appService: AppService,
    private router: Router,
    private challengeService: ChallengeService
  ) {
    this.appService.emitChangeActions(this.menuEntries);
    this.groupId = this.route.snapshot.params['group_id'];
    this.challenge_id = this.route.snapshot.params['challenge_id'] || -1;
  }

  ngOnInit(): void {
    if(this.challenge_id >= 0) {
      this.challengeService.getChallenge(this.groupId, this.challenge_id).subscribe({
        next: data => {
          this.createForm.setValue({
            challenge_name: data[0].challenge_name,
            description: data[0].challenge_description
          });
          this.scheduleForm.setValue({
            schedule_mode: data[0].schedule_mode,
            schedule_date: data[0].schedule_date,
            schedule_period: data[0].schedule_period,
            schedule_selection: data[0].schedule_selection.split(",")
          });
        },
        error: err => this.challengeService.handleServerError(err)
      });
      this.challengeService.getSkills([this.challenge_id.toString()], this.groupId).subscribe({
        next: skills => {
          skills.forEach(skill => { 
            let skillFromData = SkillData.skills.find(dataSkill => dataSkill.skill_id == skill.skill_id);
            if(skillFromData) this.skills.push(skillFromData);
            this.skillForm.addControl(skill.skill_id.toString(), new FormControl(parseInt(skill.skill_value.toString())))
          });
        },
        error: err => this.challengeService.handleServerError(err)
      });
    } else { // pre-populate skills from skill data
      this.skills = SkillData.skills;
      this.skills.forEach(skill => {
        this.skillForm.addControl(skill.skill_id.toString(), new FormControl(30));
      });    
  }
  }

  _getSkillValue(skill_id: number) : number {
    return this.skillForm.get(skill_id.toString())?.value || 0;
  }

  _getTotalSkill(): number {
    let sum = 0;
    this.skills.forEach(skill => sum += this._getSkillValue(skill.skill_id));
    return sum;
  }

  submitCreate() {
    let data = Object.assign(this.createForm.value, this.scheduleForm.value);
    data = Object.assign(data, {group_id: this.groupId})
    this.challengeService.createChallenge(data).subscribe({
      next: value => {
        this.challengeService.updateSkills(this._prepareSkillAssignments(this.skills, value.data.newID)).subscribe({
          next: () => this.router.navigate(['groupDetails', this.groupId]),
          error: err => this.challengeService.handleServerError(err)
        });
      },
      error: err => {console.log(err);}
  });
  }
  submitUpdate() {
    let data = Object.assign(this.createForm.value, this.scheduleForm.value);
    data = Object.assign(data, {group_id: this.groupId, challenge_id: this.challenge_id})
    this.challengeService.updateChallenge(data).subscribe({
      next: value => {
        this.challengeService.updateSkills(this._prepareSkillAssignments(this.skills, this.challenge_id)).subscribe({
          next: () => this.router.navigate(['groupDetails', this.groupId]),
          error: err => this.challengeService.handleServerError(err)
        });
      },
      error: err => {console.log(err);}
  });
  }

  _prepareSkillAssignments(skills: Skill[], challenge_id: number) : SkillAssignment[] {
    return skills.map<SkillAssignment>(skill => { return {
      skill_id: skill.skill_id,
      challenge_id: challenge_id,
      skill_value: this._getSkillValue(skill.skill_id),
      group_id: this.groupId
    }});
  }

  loadTemplate() {
    console.log('Open Dialog to select template');
  }

}
