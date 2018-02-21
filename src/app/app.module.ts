import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SingUpFormComponent } from './sing-up-form/sing-up-form.component';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NotAllowedCursorDirective } from './directives/not-allowed-cursor.directive';
import { ValidationIconsDirective } from './directives/validation-icons.directive';


@NgModule({
  declarations: [
    AppComponent,
    SingUpFormComponent,
    SingInFormComponent,
    NotAllowedCursorDirective,
    ValidationIconsDirective
  ],
  imports: [
    BrowserModule,
      ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
