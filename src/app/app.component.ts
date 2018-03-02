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
    firstColumnWidgets = [];
    secondColumnWidgets = [];
    addWidgetMode;
    constructor(private widgetServiceData: WidgetDataService) {
    }
    ngOnInit() {
        this.widgetData = this.widgetServiceData.data;
        this.buildWidgets();
        this.widgetServiceData.dataChanges
            .subscribe(
                (data) => {
                    this.widgetData = data;
                    this.buildWidgets();
                });
        this.widgetServiceData.addMode
            .subscribe(
                (data) => {
                    this.addWidgetMode = data;
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
    isMobile() {
         return window.innerWidth < 600;
    }
    toggleNewWidgetForm() {
        this.widgetServiceData.toggleAddMode();
    }
}
