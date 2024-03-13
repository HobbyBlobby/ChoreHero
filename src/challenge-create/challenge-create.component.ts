import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { bottomAction } from '../app/interfaces';
import { AppService } from '../app.service';
import { MatIconModule } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-challenge-create',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule],
  templateUrl: './challenge-create.component.html',
  styleUrl: './challenge-create.component.scss'
})
export class ChallengeCreateComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  createForm = new FormGroup({
    challenge_name: new FormControl(''),
    description: new FormControl('')
  })
  scheduleForm = new FormGroup({
    schedule_mode: new FormControl('OneTime'),
    schedule_date: new FormControl(Date()),
    schedule_period: new FormControl(1),
    schedule_weekdays: new FormControl([])
  })
  public menuEntries : bottomAction[] = [{
    text: 'from Template',
    icon: 'content_copy',
    action: this.loadTemplate
  }];
  groupId = -1;

  constructor(
    private appService: AppService,
    private router: Router
  ) {
    this.appService.emitChangeActions(this.menuEntries);
    this.groupId = this.route.snapshot.params['group_id']
  }

  submitCreate() {
    console.log("Create Challenge", this.createForm.value, this.scheduleForm.value);
    this.router.navigate(['groupDetails', this.groupId]);
  }

  loadTemplate() {
    console.log('Open Dialog to select template');
  }

}
