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
    FloatLabelModule
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
    img: "/assets/heros/fortuneteller_upperbody.png" 
  },{
    class_name: "IT-Pro",
    img: "/assets/heros/itpro_upperbody.png" 
  },{
    class_name: "Gunner",
    img: "/assets/heros/gunner_upperbody.png" 
  }];

  heroFrom = new FormGroup({
    hero_name: new FormControl('')
  })


  constructor(
    private msgService: MessageService,
    private router: Router) {
      this.group_id = this.route.snapshot.params['group_id'];
    }
  selectClass(page: CarouselPageEvent): void {
    console.log(page);
    if(page.page != undefined) {
      this.msgService.add({
        severity: "success",
        detail: 'You chose ' + this.heroClasses[page.page].class_name,
        summary: "Selected"
      });
    }
    // this.router.navigate(["/groupDetails", this.group_id]);
  }
}
