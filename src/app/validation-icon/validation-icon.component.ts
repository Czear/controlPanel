import {Component, Input, DoCheck} from '@angular/core';
import {FormControl} from '@angular/forms';



@Component({
  selector: 'app-validation-icon',
  templateUrl: './validation-icon.component.html',
  styleUrls: ['./validation-icon.component.css']
})
export class ValidationIconComponent implements DoCheck {
  @Input() inputFormControl: FormControl;
  isVisible = false;
  classesToAttach: string;
  constructor() { }
    ngDoCheck() {
        if (this.inputFormControl.valid) {
            this.classesToAttach = 'fa fa-check-circle text-success';
        } else {
            this.classesToAttach = 'fa fa-times-circle text-danger';
        }
        if (!this.isVisible) {this.isVisible = ( this.inputFormControl.touched || this.inputFormControl.dirty); }
  }
}
