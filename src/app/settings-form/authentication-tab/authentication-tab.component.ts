import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-authentication-tab',
  templateUrl: './authentication-tab.component.html',
  styleUrls: ['./authentication-tab.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthenticationTabComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthenticationTabComponent),
      multi: true,
    },
  ],
})
export class AuthenticationTabComponent implements OnInit {
  authenticationSettings!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.authenticationSettings = this.fb.group({});

    const parentForm = this.controlContainer.control as FormGroup;
    parentForm.addControl(
      'authenticationSettings',
      this.authenticationSettings
    );
  }
}
