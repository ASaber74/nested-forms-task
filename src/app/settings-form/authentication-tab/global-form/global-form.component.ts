import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-global-form',
  templateUrl: './global-form.component.html',
  styleUrls: ['./global-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlobalFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => GlobalFormComponent),
      multi: true,
    },
  ],
})
export class GlobalFormComponent implements OnInit {
  globalAuthentication!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}
  ngOnInit(): void {
    this.globalAuthentication = this.fb.group({
      UniqueIdAndEmail: [false],
    });

    const parentForm = this.controlContainer.control as FormGroup;

    const authSettings = parentForm.get('authSettings') as FormGroup;
    authSettings.addControl('globalAuthentication', this.globalAuthentication);
  }
}
