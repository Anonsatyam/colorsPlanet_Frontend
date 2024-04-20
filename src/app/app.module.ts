import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AddColorPaletteComponent } from './add-color-palette/add-color-palette.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SolidColorComponent } from './solid-color/solid-color.component';
import { GradientColorComponent } from './gradient-color/gradient-color.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

@NgModule({
  declarations: [
    AppComponent,
    ColorPaletteComponent,
    TopNavComponent,
    SidenavComponent,
    AddColorPaletteComponent,
    AdminPanelComponent,
    RegistrationComponent,
    LoginComponent,
    SolidColorComponent,
    GradientColorComponent
  ],
  imports: [
    BrowserModule,
    ClipboardModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
