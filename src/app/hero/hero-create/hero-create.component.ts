import { Component, inject } from '@angular/core';
import {CarouselModule, CarouselPageEvent } from 'primeng/carousel';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AvatarModule } from 'primeng/avatar';

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
  heroClasses = [{
    class_name: "Fortuneteller",
    img: "/assets/heros/fortuneteller_upperbody.png",
    img_head: "/assets/heros/fortuneteller_head.png"
  },{
    class_name: "IT-Pro",
    img: "/assets/heros/itpro_upperbody.png",
    img_head: "/assets/heros/itpro_head.png"
  },{
    class_name: "Gunner",
    img: "/assets/heros/gunner_upperbody.png" ,
    img_head: "/assets/heros/gunner_upperbody.png"
  }];

  heroFrom = new FormGroup({
    hero_name: new FormControl(''),
  })
  selectedClass = this.heroClasses[0];

  constructor(
    private msgService: MessageService,
    private router: Router) {
      this.group_id = this.route.snapshot.params['group_id'];
    }
  selectClass(page: CarouselPageEvent): void {
    console.log(page);
    if(page.page != undefined) {
      this.selectedClass = this.heroClasses[page.page];
      this.msgService.add({
        severity: "success",
        detail: 'You chose ' + this.selectedClass.class_name,
        summary: "Selected"
      });
    }
    // this.router.navigate(["/groupDetails", this.group_id]);
  }
}
