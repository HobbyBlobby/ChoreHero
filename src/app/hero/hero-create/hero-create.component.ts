import { Component, inject } from '@angular/core';
import {CarouselModule, CarouselPageEvent } from 'primeng/carousel';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AvatarModule } from 'primeng/avatar';
import { Hero, HeroClass } from '../../hero';
import { HeroService } from '../hero.service';
import heroClassData from '../../data/heroClasses.json';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    StepperModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    AvatarModule
  ],
  providers: [MessageService],
  templateUrl: './hero-create.component.html',
  styleUrl: './hero-create.component.scss'
})
export class HeroCreateComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  group_id: number = -1;
  static heroClasses: HeroClass[] = heroClassData.heroClasses;

  heroFrom = new FormGroup({
    hero_name: new FormControl('', [Validators.required]),
  })
  selectedClass = HeroCreateComponent.heroClasses[0];

  constructor(
    private msgService: MessageService,
    private heroService: HeroService,
    private router: Router) {
      this.group_id = this.route.snapshot.params['group_id'];
    }

  confirmHero(): void {
    let newHero : Hero =  {
      account_name: localStorage.getItem("account") || '',
      group_id: this.group_id,
      class_id: this.selectedClass.class_id,
      hero_name: this.heroFrom.value.hero_name || '',
      hero_id: -1
    }
    this.heroService.createHero(newHero).subscribe({
      next: () => this.router.navigate(["/groupDetails", this.group_id]),
      error: err => this.heroService.handleServerError(err)
    });
  }

  getHeroClasses(): HeroClass[] {
    return HeroCreateComponent.heroClasses;
  }

  selectClass(page: CarouselPageEvent): void {
    console.log(page);
    if(page.page != undefined) {
      this.selectedClass = HeroCreateComponent.heroClasses[page.page];
      this.msgService.add({
        severity: "success",
        detail: 'You chose ' + this.selectedClass.class_name,
        summary: "Selected"
      });
    }
    // this.router.navigate(["/groupDetails", this.group_id]);
  }
}
