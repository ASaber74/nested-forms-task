import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sms-form',
  templateUrl: './sms-form.component.html',
  styleUrls: ['./sms-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmsFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SmsFormComponent),
      multi: true,
    },
  ],
})
export class SmsFormComponent implements OnInit {
  smsCommunication!: FormGroup;
  isPasswordEditing: boolean = false;
  originalPassword!: string;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.smsCommunication = this.fb.group({
      smsType: ['Standard', Validators.required],
      npi: [123, Validators.required],
      ton: ['SMSTON', Validators.required],
      sourceAddress: ['SourceAddress', Validators.required],
      hostIp: ['192.168.3.114', Validators.required],
      smsPort: ['900', Validators.required],
      smsUsername: ['Ahmed', Validators.required],
      smsPassword: ['P@ssw0rd', Validators.required],
    });

    const parentForm = this.controlContainer.control as FormGroup;

    const communicationSettings = parentForm.get(
      'communicationSettings'
    ) as FormGroup;
    communicationSettings.addControl('smsCommunication', this.smsCommunication);

    this.originalPassword = this.smsCommunication.get('password')?.value;
  }
  onEditPassword() {
    this.isPasswordEditing = true;
  }

  onSavePassword() {
    this.isPasswordEditing = false;
  }

  onCancelEdit() {
    this.smsCommunication.get('password')?.setValue(this.originalPassword);
    this.isPasswordEditing = false;
  }
}
