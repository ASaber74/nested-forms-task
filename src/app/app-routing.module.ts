import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsFormComponent } from './settings-form/settings-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
  {
    path: 'form',
    component: SettingsFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
