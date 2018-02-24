import {Component, OnInit} from '@angular/core';
import {WidgetDataService } from './services/widget-data.service';

import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers: [WidgetDataService]
})
export class AppComponent implements OnInit {
    widgetData;
    private subscription: Subscription;
    firstColumnWidgets = [];
    secondColumnWidgets = [];

    constructor(private widgetServiceData: WidgetDataService) {
    }
    ngOnInit() {
        this.widgetData = this.widgetServiceData.data;
        this.buildWidgets();
        this.subscription = this.widgetServiceData.dataChanges
            .subscribe(
                (data) => {
                    this.widgetData = data;
                    this.buildWidgets();
                });
    }
    buildWidgets() {
        this.firstColumnWidgets = [];
        this.secondColumnWidgets = [];
        this.widgetData.forEach((item, index) => {
            item.index = index;
            if (index % 2) {
                this.secondColumnWidgets.push(item);
            } else {
                this.firstColumnWidgets.push(item);
            }
        });
    }

}
