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
  selector: 'app-ldap-form',
  templateUrl: './ldap-form.component.html',
  styleUrls: ['./ldap-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LdapFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LdapFormComponent),
      multi: true,
    },
  ],
})
export class LdapFormComponent implements OnInit {
  ldapAuthentication!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.ldapAuthentication = this.fb.group({
      enableLdap: [false],
      host: [{ value: '', disabled: true }, Validators.required],
      port: [{ value: '', disabled: true }, Validators.required],
      base: [{ value: '', disabled: true }, Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      password: [{ value: '', disabled: true }, Validators.required],
    });

    const parentForm = this.controlContainer.control as FormGroup;

    const authSettings = parentForm.get('authSettings') as FormGroup;
    authSettings.addControl('ldapAuthentication', this.ldapAuthentication);

    this.ldapAuthentication
      .get('enableLdap')
      ?.valueChanges.subscribe((value) => {
        if (value === true) {
          this.ldapAuthentication.get('host')?.enable();
          this.ldapAuthentication.get('port')?.enable();
          this.ldapAuthentication.get('base')?.enable();
          this.ldapAuthentication.get('username')?.enable();
          this.ldapAuthentication.get('password')?.enable();
        } else {
          this.ldapAuthentication.get('host')?.disable();
          this.ldapAuthentication.get('port')?.disable();
          this.ldapAuthentication.get('base')?.disable();
          this.ldapAuthentication.get('username')?.disable();
          this.ldapAuthentication.get('password')?.disable();
        }
      });
  }
}
