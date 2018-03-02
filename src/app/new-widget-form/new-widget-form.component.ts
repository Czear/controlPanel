import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {WidgetDataService} from '../services/widget-data.service';

@Component({
  selector: 'app-new-widget-form',
  templateUrl: './new-widget-form.component.html',
  styleUrls: ['./new-widget-form.component.css']
})
export class NewWidgetFormComponent implements OnInit {
  WidgetForm: FormGroup;
  dateValidator = new RegExp('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)' +
      '(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|' +
      '[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])' +
      '|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$');
  constructor(private widgetServiceData: WidgetDataService) {}

  ngOnInit() {
      this.WidgetForm = new FormGroup({
          'WidgetFormTitle': new FormControl(null, Validators.required),
          'WidgetFormContent': new FormControl(null, Validators.required),
          'WidgetFormDate': new FormControl(null, Validators.pattern(this.dateValidator))
      });
  }
    addNewWidget(form) {
      this.widgetServiceData.toggleAddMode();
      this.widgetServiceData.addWidget({
          title: form.WidgetFormTitle.value,
          text: form.WidgetFormContent.value,
          date: this.stringToDate(form.WidgetFormDate.value)});
    }
    stringToDate(dateString) {
        let separator;
        const SEPARATORS = ['.', '/', '-'];
            for (const ARRAYITEMSEPARATOR of SEPARATORS) {
                if (dateString.includes(ARRAYITEMSEPARATOR)) {
                    separator = ARRAYITEMSEPARATOR;
                }
            }
        const DATEVARIABLES = dateString.split(separator);
            return new Date(DATEVARIABLES[2], DATEVARIABLES[1], DATEVARIABLES[0]);
    }
}

