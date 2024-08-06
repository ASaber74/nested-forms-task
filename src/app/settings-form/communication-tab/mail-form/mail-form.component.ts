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
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MailFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MailFormComponent),
      multi: true,
    },
  ],
})
export class MailFormComponent implements OnInit {
  mailCommunication!: FormGroup;
  isPasswordEditing: boolean = false;
  originalPassword!: string;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.mailCommunication = this.fb.group({
      serverType: ['Standard', Validators.required],
      smtpServer: [
        { value: 'smtp.emailsrvr.com', disabled: true },
        Validators.required,
      ],
      outgoingPort: [
        { value: '587', disabled: true },
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      serverUsername: [
        { value: 'noreply@kn-it.com', disabled: true },
        Validators.required,
      ],
      serverPassword: [
        { value: 'P@ssw0rd', disabled: true },
        Validators.required,
      ],
    });
    const parentForm = this.controlContainer.control as FormGroup;
    const communicationSettings = parentForm.get(
      'communicationSettings'
    ) as FormGroup;
    communicationSettings.addControl(
      'mailCommunication',
      this.mailCommunication
    );

    this.mailCommunication
      .get('serverType')
      ?.valueChanges.subscribe((value) => {
        if (value === 'Custom') {
          this.mailCommunication.get('smtpServer')?.enable();
          this.mailCommunication.get('outgoingPort')?.enable();
          this.mailCommunication.get('serverUsername')?.enable();
          this.mailCommunication.get('serverPassword')?.enable();
        } else {
          this.mailCommunication.get('smtpServer')?.disable();
          this.mailCommunication.get('outgoingPort')?.disable();
          this.mailCommunication.get('serverUsername')?.disable();
          this.mailCommunication.get('serverPassword')?.disable();
        }
      });
      this.originalPassword = this.mailCommunication.get('password')?.value;

  }

  onEditPassword() {
    this.isPasswordEditing = true;
  }

  onSavePassword() {
    this.isPasswordEditing = false;
  }

  onCancelEdit() {
    this.mailCommunication.get('password')?.setValue(this.originalPassword);
    this.isPasswordEditing = false;
  }
}
