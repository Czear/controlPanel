import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Widget } from '../widget';


@Injectable()
export class WidgetDataService {
    constructor(private httpClient: HttpClient) {}
    data;
    isMobile;
    addWidgetMode = false;
    dateValidator = new RegExp('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)' +
        '(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|' +
        '[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])' +
        '|(?:1[0-2]))\\4(?:(?:1[0-9]|[2-9]\\d)?\\d{2})$');
    addMode = new Subject();
    dataChanged = new Subject();
    resolutionChanged = new Subject();
    addWidget(newWidget: Widget) {
        this.pushObjToDataArray(newWidget);
        this.putData().subscribe();
    }

    removeWidget(index) {
        this.removeDataCorrection(index);
        this.data.splice(index, 1);
        this.putData().subscribe();
    }

    editWidget(index, newWidget: Widget) {
        this.data[index] = newWidget;
        this.putData().subscribe();
    }
    toggleAddMode() {
        this.addWidgetMode = !this.addWidgetMode;
        this.addMode.next(this.addWidgetMode);
    }
    putData(dataRefreshIsNeeded = true) {
        this.dataChanged.next(this.data);
        this.data[0].refreshIsNeeded = dataRefreshIsNeeded;
        return this.httpClient.put('https://controllpanel-5c8a6.firebaseio.com/data.json', this.data);
    }
    getData() {
       return this.httpClient.get('https://controllpanel-5c8a6.firebaseio.com/data.json');
    }
    // Resolution
    checkIfMobile() {
        this.isMobile = window.innerWidth < 600;
        this.resolutionChanged.next(this.isMobile);
    }
    // Data operation functions
    getAvailableID() {
        let odd = -1;
        let even = -2;
        if (this.data) {
            this.data.forEach((item) => {
                if (item.id % 2) {
                    odd = item.id;
                } else {
                    even = item.id;
                }})}
                    if (even > odd) {
                        return (odd + 2);
                    } else {
                        return(even + 2);
                    }
    }
    dateConverter(dateString) {
        if (dateString) {
            let separator;
            const SEPARATORS = ['.', '/', '-'];
            for (const ARRAYITEMSEPARATOR of SEPARATORS) {
                if (dateString.includes(ARRAYITEMSEPARATOR)) {
                    separator = ARRAYITEMSEPARATOR;
                }
            }
            const DATEVARIABLES = dateString.split(separator);
            return DATEVARIABLES[0] + '.' + DATEVARIABLES[1] + '.' + DATEVARIABLES[2];
        }
        return '';
    }
    pushObjToDataArray(objToPush) {
        if (this.data) {
            this.data.push(objToPush);
        } else {
            this.data = [objToPush];
        }
    }
    removeDataCorrection(removedIndex) {
        const REMOVED_INDEX_ITEM_ID = this.data[removedIndex].id;
        this.data.forEach((item) => {
           if (this.checkIfNumIsGraterAndItsParity(item.id, REMOVED_INDEX_ITEM_ID)) {
                item.id -= 2;
           }
        });
    }
    checkIfNumIsGraterAndItsParity (firstNum: number, secondNum: number) {
            return firstNum > secondNum && !! + (firstNum % 2) === !! + (secondNum % 2);
    }
}
