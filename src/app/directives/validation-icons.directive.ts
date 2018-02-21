import {Directive, HostBinding, Input, OnChanges} from '@angular/core';


@Directive({
  selector: '[appValidationIcons]'
})
export class ValidationIconsDirective implements OnChanges {
    @Input() inputValid: boolean;
    @HostBinding('class') classesToAttach: string;
    @HostBinding('style.color') colorToAttach: string;
  constructor() { }
  ngOnChanges() {
      if (this.inputValid) {
        this.classesToAttach = 'fa fa-check-circle';
        this.colorToAttach = '#43a047';
      } else {
        this.classesToAttach = 'fa fa-times-circle';
        this.colorToAttach = '#c62828';
      }
    }
}
