import {Component, Input} from '@angular/core';
import {WidgetDataService} from '../services/widget-data.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  @Input() widgetData;
    constructor(private widgetServiceData: WidgetDataService) {}
    destroyWidget(index) {
        this.widgetServiceData.removeWidget(index);
    }
    editWidget(index) {
        console.log(index);
    }

}