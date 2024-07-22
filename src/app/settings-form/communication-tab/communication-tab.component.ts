import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-communication-tab',
  templateUrl: './communication-tab.component.html',
  styleUrls: ['./communication-tab.component.css'],
})
export class CommunicationTabComponent {
  comunicationSettings!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.comunicationSettings = this.fb.group({});
  }
}
