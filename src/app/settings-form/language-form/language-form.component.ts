import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { LANGUAGES } from 'src/languages';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LanguageFormComponent),
      multi: true,
    },
  ],
})
export class LanguageFormComponent implements OnInit {
  languageForm!: FormGroup;
  languages: string[] = LANGUAGES;
  selectedLanguages: string[] = ['English'];

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.languageForm = this.fb.group({
      availableLanguages: [this.selectedLanguages],
      primaryLanguage: 'English',
      secondaryLanguage: '',
    });
    const parentForm = this.controlContainer.control as FormGroup;
    parentForm.addControl('languageSettings', this.languageForm);
  }
  }
