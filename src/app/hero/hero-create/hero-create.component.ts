import { Component } from '@angular/core';
import {CarouselModule } from 'primeng/carousel';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CarouselModule,
    MatButtonModule
  ],
  templateUrl: './hero-create.component.html',
  styleUrl: './hero-create.component.scss'
})
export class HeroCreateComponent {
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

  constructor(private snackBar: MatSnackBar) {}
  selectClass(class_name: string): void {
    this.snackBar.open('Du hast dich für ' + class_name + ' entschieden.', undefined,
    { duration: 3000, panelClass: ['snack_bar'] });
  }
}
