import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LanguageFormComponent } from './settings-form/language-form/language-form.component';
import { BasicFormComponent } from './settings-form/authentication-tab/basic-form/basic-form.component';
import { LdapFormComponent } from './settings-form/authentication-tab/ldap-form/ldap-form.component';
import { AuthNavComponent } from './main-nav/auth-nav/auth-nav.component';
import { AuthenticationTabComponent } from './settings-form/authentication-tab/authentication-tab.component';
import { CommuincationNavComponent } from './main-nav/commuincation-nav/commuincation-nav.component';
import { CommunicationTabComponent } from './settings-form/communication-tab/communication-tab.component';
import { MailFormComponent } from './settings-form/communication-tab/mail-form/mail-form.component';
import { SmsFormComponent } from './settings-form/communication-tab/sms-form/sms-form.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    SettingsFormComponent,
    MainNavComponent,
    LanguageFormComponent,
    AuthenticationTabComponent,
    BasicFormComponent,
    LdapFormComponent,
    AuthNavComponent,
    CommuincationNavComponent,
    CommunicationTabComponent,
    MailFormComponent,
    SmsFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
