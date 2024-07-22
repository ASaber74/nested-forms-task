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
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BasicFormComponent),
      multi: true,
    },
  ],
})
export class BasicFormComponent implements OnInit {
  basicAuthentication!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.basicAuthentication = this.fb.group({
      blockAfterFailedAttempts: [3, Validators.required],
      passwordMinLength: [8, Validators.required],
      passwordMaxLength: [20, Validators.required],
      passwordExpiresAfter: [90, Validators.required],
      shouldContainDigits: [true],
      shouldContainCharacters: [true],
      characterType: [{ value: '', disabled: true }],
      shouldContainSpecialCharacters: [false],
      preventWhiteSpace: [true],
      preventKeyboardSequence: [true],
      preventLoginID: [true],
      preventUserName: [true],
      preventEmail: [true],
      validateSequence: [true],
      validateRepeatedCharacter: [true],
      acceptRepeatingPasswordAfter: [5, Validators.required],
      preventSequenceWithLengthOf: [3],
      preventRepeatedSequenceWithLengthOf: [3, Validators.required],
    });

    const parentForm = this.controlContainer.control as FormGroup;

    const authSettings = parentForm.get(
      'authSettings'
    ) as FormGroup;
    authSettings.addControl('basicAuthentication', this.basicAuthentication);

    this.basicAuthentication.get('shouldContainCharacters')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.basicAuthentication.get('characterType')?.enable();
      } else {
        this.basicAuthentication.get('characterType')?.disable();
      }
    });
  }
}
