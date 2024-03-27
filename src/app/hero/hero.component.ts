import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { Hero, HeroClass } from '../hero';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';
import { HeroSkill, Skill } from '../challenge';
import { ChallengeService } from '../../challenge/challenge.service';
import skillData from '../../app/data/skills.json';
import { MeterGroupModule } from 'primeng/metergroup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MeterGroupModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private heroClases: HeroClass[] = HeroCreateComponent.heroClasses;
  private group_id = -1;
  private hero_id = -1;
  public hero: Hero | undefined = undefined;
  public heroClass: HeroClass | undefined = undefined;
  public heroSkills: HeroSkill[] = [];
  public skills: Skill[] = skillData.skills;
  public levelValues: any = undefined;

  constructor(
    private heroService: HeroService,
    private challengeService: ChallengeService
  ) {
    this.group_id = this.route.snapshot.params['group_id'];
    this.hero_id = this.route.snapshot.params['hero_id'];
  }

  ngOnInit(): void {
    this.loadData();
  }

  skillName(skill_id: number) : string {
    return this.skills.find( skill => skill.skill_id == skill_id)?.skill_name || '';
  }
  skillColor(skill_id: number) : string {
    return this.skills.find( skill => skill.skill_id == skill_id)?.skill_color || 'var(--primary-color)';
  }

  percentToNextLevel(currLevel: number, skill_value: number) : number {
    let pointsForCurrLevel = this._pointsForLevel(currLevel);
    let pointsForNextLevel = this._pointsForLevel(currLevel+1);
    return Math.round((skill_value - pointsForCurrLevel) / (pointsForNextLevel - pointsForCurrLevel) * 100);
  }
  _pointsForLevel(level: number) : number {
    return Math.round(100 * Math.pow(level,1.2));
  }
  _calculateLevel(value: number) : number {
    let level = 0;
      while(this._pointsForLevel(level) <= value) {level++;}
    return level - 1;
  }

  loadData() {
    this.heroService.getHeros(this.group_id).subscribe({
      next: heros => {
        this.hero = heros.find(hero => hero.hero_id === this.hero_id);
        this.heroClass = this.heroClases.find(heroclass => heroclass.class_id == this.hero?.class_id)
        console.log(this.hero, this.heroClass)},
      error: err => this.heroService.handleServerError(err)
    });
    
    this.challengeService.getHeroSkills([this.hero_id.toString()], this.group_id).subscribe({
      next: skills => {this.heroSkills = skills; this._fillLevelValues()},
      error: err => this.challengeService.handleServerError(err)
    });
  }

  _fillLevelValues() {
    this.levelValues = {};
    this.heroSkills.forEach(skill => {
      skill.skill_level = skill.skill_level || this._calculateLevel(skill.skill_value);
      this.levelValues[skill.skill_id] = [{
        label: this.skillName(skill.skill_id),
        value: this.percentToNextLevel(skill.skill_level, skill.skill_value),
        color: this.skillColor(skill.skill_id),
        skill_value: skill.skill_value,
        valueForNextLevel: this._pointsForLevel(skill.skill_level + 1),
        currLevel: skill.skill_level + 1
      }];
    });
  }

}
