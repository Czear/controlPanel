import {Component, HostListener, OnInit} from '@angular/core';
import {WidgetDataService } from './services/widget-data.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [WidgetDataService]
})
export class AppComponent implements OnInit {
    isMobile;
    widgetData;
    addWidgetMode;
    firstColumnWidgets = [];
    secondColumnWidgets = [];
    constructor(private widgetServiceData: WidgetDataService) {}
    @HostListener('window:resize', ['$event'])
        onResize() {
            this.widgetServiceData.checkIfMobile();
        }
    ngOnInit() {
        setInterval(() => {
            this.widgetServiceData.getData()
                .subscribe(
                    (result: Array<any>) => {
                        if (result[0].refreshIsNeeded || !this.widgetData) {
                            this.widgetServiceData.data = result;
                            this.widgetData = result;
                            if (this.widgetData) this.buildWidgets();
                            this.widgetServiceData.putData(false).subscribe();
                        }
                    });
        }, 500);
            this.widgetServiceData.dataChanged
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
            this.widgetServiceData.resolutionChanged
                .subscribe((isMobile) => {
                   this.isMobile = isMobile;
                });
        this.widgetServiceData.checkIfMobile();
           }
    buildWidgets() {
                this.firstColumnWidgets = [];
                this.secondColumnWidgets = [];
                this.widgetData.forEach((item, index) => {
                    item.index = index;
                    if (item.id % 2) {
                        this.secondColumnWidgets.push(item);
                    } else {
                        this.firstColumnWidgets.push(item);
                    }
                });
    }
    toggleNewWidgetForm() {
        this.widgetServiceData.toggleAddMode();
    }
    logData() {
        console.log(this.widgetServiceData.data);
    }
}
