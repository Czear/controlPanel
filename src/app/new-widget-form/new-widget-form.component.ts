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

  constructor(private widgetServiceData: WidgetDataService) {}

  ngOnInit() {
      this.WidgetForm = new FormGroup({
          'WidgetFormTitle': new FormControl(null, Validators.required),
          'WidgetFormContent': new FormControl(null, Validators.required),
          'WidgetFormDate': new FormControl(null, Validators.pattern(this.widgetServiceData.dateValidator))
      });
  }
    addNewWidget(form) {
      this.widgetServiceData.toggleAddMode();
      this.widgetServiceData.addWidget(
          this.widgetServiceData.dataNoteConversionToObject(
              form.WidgetFormTitle.value,
              form.WidgetFormContent.value,
              form.WidgetFormDate.value));
    }
    closeWidgetForm() {
        this.widgetServiceData.toggleAddMode();
    }
}
