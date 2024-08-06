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
  }

  deleteSkin(index: number): void {
    this.assets.removeAt(index);
  }

  async onFilesAdded(files: File[], index: number, fieldName: 'cssFile' | 'jsonMobileFile'): Promise<void> {
    if (files.length > 0) {
      const file = files[0];
      const fileContent = await this.readFileContent(file);
      
      if (fieldName === 'cssFile') {
        this.assets.at(index).get('fileName')?.setValue(file.name);
        this.assets.at(index).get('fileContent')?.setValue(fileContent);
      } else if (fieldName === 'jsonMobileFile') {
        this.assets.at(index).get('fileNameMobile')?.setValue(file.name);
        this.assets.at(index).get('fileContentMobile')?.setValue(fileContent);
      }
    }
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
}
