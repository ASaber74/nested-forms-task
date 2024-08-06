import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-skin-form',
  templateUrl: './skin-form.component.html',
  styleUrls: ['./skin-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SkinFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SkinFormComponent),
      multi: true,
    },
  ],
})
export class SkinFormComponent implements OnInit {
  skinForm!: FormGroup;
  fileNames: { [index: number]: { cssFile?: string; jsonMobileFile?: string } } = {};

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.skinForm = this.fb.group({
      assets: this.fb.array([]),
    });

    this.addSkin();

    const parentForm = this.controlContainer.control as FormGroup;
    parentForm.addControl('skinSettings', this.skinForm);
  }

  get assets(): FormArray {
    return this.skinForm.get('assets') as FormArray;
  }

  addSkin(): void {
    const skinGroup = this.fb.group({
      id: [null],  
      replyCode: [200, Validators.required],
      replyMessage: ['message.success', Validators.required],
      payloadList: [null],
      payload: [''],
      resourceGroupName: [null],
      disabled: [false],
      disabledFrom: [null],
      disabledTo: [null],
      themeId: [null],
      names: ['Light Skin', Validators.required],
      fileContent: [null],
      fileName: ['Light-theme (1).css', Validators.required],
      fileNameMobile: [null],
      organizationId: [null],
      siteId: [null],
      extraInfo: ['light', Validators.required],
      siteDefault: [false],
      available: [false],
      fileContentMobile: [null],
      cssFile: [''],
      jsonMobileFile: [''],
      bodyMainClass: ['light', Validators.required],
    });

    this.assets.push(skinGroup);
    this.fileNames[this.assets.length - 1] = {}; // Initialize fileNames for the new skin
  }

  deleteSkin(index: number): void {
    this.assets.removeAt(index);
    delete this.fileNames[index]; // Remove fileNames for the deleted skin
  }

  onFileChange(event: Event, index: number, fieldName: 'cssFile' | 'jsonMobileFile'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileNames[index] = this.fileNames[index] || {};
      this.fileNames[index][fieldName] = file.name;
      this.assets.at(index).get(fieldName)?.setValue(file); // Store the file in the form control if needed
    }
  }
}
