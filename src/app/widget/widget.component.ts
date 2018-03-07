import {Component, Input} from '@angular/core';
import {WidgetDataService} from '../services/widget-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  @Input() widgetData;
    editMode = false;
    editForm: FormGroup;
    constructor(private widgetServiceData: WidgetDataService) {}
    destroyWidget(index) {
        this.widgetServiceData.removeWidget(index);
    }
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.buildEditForm();
      }
    }
    saveEditedWidgetChanges() {
        this.toggleEditMode();
        this.widgetServiceData.editWidget(
            this.widgetData.index,
            this.widgetServiceData.dataNoteConversionToObject(
                this.editForm.get('editTitle').value,
                this.editForm.get('editContent').value,
                this.editForm.get('editDate').value));
    }
    buildEditForm() {
        this.editForm = new FormGroup({
            'editTitle': new FormControl(this.widgetData.title, Validators.required),
            'editContent': new FormControl(this.widgetData.content, Validators.required),
            'editDate': new FormControl(
                this.widgetServiceData.dateConverter(this.widgetData.date),
                Validators.pattern(this.widgetServiceData.dateValidator))
        });
    }
}
