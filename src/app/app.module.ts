import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SingUpFormComponent } from './sing-up-form/sing-up-form.component';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NotAllowedCursorDirective } from './directives/not-allowed-cursor.directive';
import { ValidationIconComponent } from './validation-icon/validation-icon.component';


@NgModule({
  declarations: [
    AppComponent,
    SingUpFormComponent,
    SingInFormComponent,
    NotAllowedCursorDirective,
    ValidationIconComponent
  ],
  imports: [
    BrowserModule,
      ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
