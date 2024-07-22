import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LANGUAGES } from 'src/languages';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css'],
})
export class SettingsFormComponent {
  settingsForm: FormGroup;
  languages: string[] = LANGUAGES;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      authSettings: this.fb.group({}),
      communicationSettings: this.fb.group({}),
    });
  }

  onSave(settingsForm: FormGroup) {
    if (settingsForm.valid) {
      console.log(settingsForm.value);
    }
  }

  onCancel(){
    this.settingsForm.reset()
  } 
}
