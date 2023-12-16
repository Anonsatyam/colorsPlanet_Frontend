import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddColorPaletteComponent } from './add-color-palette/add-color-palette.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SolidColorComponent } from './solid-color/solid-color.component';
import { GradientColorComponent } from './gradient-color/gradient-color.component';

const routes: Routes = [
  { path: '', component: ColorPaletteComponent },
  { path: 'api/colors', component: ColorPaletteComponent },
  { path: 'adminPanel', component: AdminPanelComponent },
  { path: 'add-color-palette', component: AddColorPaletteComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'solidColors', component: SolidColorComponent },
  { path: 'gradientColors', component: GradientColorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
