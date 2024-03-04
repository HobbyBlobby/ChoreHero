import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [
    MatTabsModule,
    MatListModule,
    MatIconModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export class GroupDetailsComponent {
  groupMembers = [{
    HeroName: 'Romy',
    Role: 'Founder'
  }, {
    HeroName: 'Felix',
    Role: 'Leader'
  }, {
    HeroName: 'Louis',
    Role: 'Member'
  }, {
    HeroName: 'Leopold',
    Role: 'Member'
  }, {
    HeroName: 'Greta',
    Role: 'Member'
  }]

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
