import {Directive, HostBinding, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appNotAllowedCursor]'
})
export class NotAllowedCursorDirective implements OnChanges {
  @Input() isValid: boolean;
    @HostBinding('style.cursor') cursorValue: string;
    @HostBinding('disabled') isDisable = true;
      ngOnChanges() {
        if (this.isValid) {
            this.cursorValue = 'pointer';
            this.isDisable = false;
        } else {
            this.cursorValue = 'not-allowed';
            this.isDisable = true;
        }
      }
}
