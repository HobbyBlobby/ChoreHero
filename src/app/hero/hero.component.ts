import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'

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

}
