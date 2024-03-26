import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { Hero, HeroClass } from '../hero';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';
import { HeroSkill, Skill } from '../challenge';
import { ChallengeService } from '../../challenge/challenge.service';
import skillData from '../../app/data/skills.json';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    FlexLayoutModule
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

  loadData() {
    this.heroService.getHeros(this.group_id).subscribe({
      next: heros => {
        this.hero = heros.find(hero => hero.hero_id === this.hero_id);
        this.heroClass = this.heroClases.find(heroclass => heroclass.class_id == this.hero?.class_id)
        console.log(this.hero, this.heroClass)},
      error: err => this.heroService.handleServerError(err)
    });
    
    this.challengeService.getHeroSkills([this.hero_id.toString()], this.group_id).subscribe({
      next: skills => this.heroSkills = skills,
      error: err => this.challengeService.handleServerError(err)
    });
  }
}
