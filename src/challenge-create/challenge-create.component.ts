import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { bottomAction } from '../app/interfaces';
import { AppService } from '../app.service';
import { MatIconModule } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-challenge-create',
  standalone: true,
  imports: [
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule],
  templateUrl: './challenge-create.component.html',
  styleUrl: './challenge-create.component.scss'
})
export class ChallengeCreateComponent {
  createForm = new FormGroup({
    challenge_name: new FormControl(''),
    description: new FormControl('')
  })
  public menuEntries : bottomAction[] = [{
    text: 'from Template',
    icon: 'content_copy',
    action: this.loadTemplate
  }];

  constructor(
    private appService: AppService
  ) {
    this.appService.emitChangeActions(this.menuEntries);
  }

  submitCreate() {
    console.log("Create Challenge", this.createForm.value);
  }

  loadTemplate() {
    console.log('Open Dialog to select template');
  }

}
