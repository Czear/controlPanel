import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { WidgetDataService } from '../services/widget-data.service';

@Component({
  selector: 'app-new-widget-form',
  templateUrl: './new-widget-form.component.html',
  styleUrls: ['./new-widget-form.component.css']
})
export class NewWidgetFormComponent implements OnInit {
  WidgetForm: FormGroup;

  constructor(private widgetData: WidgetDataService) {}

  ngOnInit() {
      this.WidgetForm = new FormGroup({
          'WidgetFormTitle': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
          'WidgetFormContent': new FormControl(null, Validators.required),
          'WidgetFormDate': new FormControl(null, Validators.pattern(this.widgetData.dateValidator))
      });
  }
    addNewWidget(form) {
      this.widgetData.toggleAddMode();
      this.widgetData.addWidget({
          title: form.WidgetFormTitle.value,
          content: form.WidgetFormContent.value,
          date: form.WidgetFormDate.value,
          fav: false,
          id: this.widgetData.getAvailableID(),
          headerBgColor: 'dark'
      });
    }
    closeWidgetForm() {
        this.widgetData.toggleAddMode();
    }
}
