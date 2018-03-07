import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class WidgetDataService {
    constructor(private httpClient: HttpClient) {}
    addWidgetMode = false;
    data;
    dateValidator = new RegExp('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)' +
        '(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|' +
        '[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])' +
        '|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$');
    addMode = new Subject();
    dataChanges = new Subject();

    addWidget(newObject) {
        this.pushObjToDataArray(newObject);
        this.dataChanges.next(this.data.slice());
        this.putData().subscribe();
    }

    removeWidget(index) {
        this.data.splice(index, 1);
        this.dataChanges.next(this.data.slice());
        this.putData().subscribe();
    }

    editWidget(index, newObject) {
        this.data[index] = newObject;
        this.dataChanges.next(this.data.slice());
        this.putData().subscribe();
    }
    toggleAddMode() {
        this.addWidgetMode = !this.addWidgetMode;
        this.addMode.next(this.addWidgetMode);
    }
    putData() {
        return this.httpClient.put('https://controllpanel-5c8a6.firebaseio.com/data.json', this.data);
    }
    getData() {
       return this.httpClient.get('https://controllpanel-5c8a6.firebaseio.com/data.json');
    }
    // Useful Functions
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
    dataNoteConversionToObject(title, content, date) {
        const objToPush = {
            title: title,
            content: content,
            date: this.dateConverter(date)
        };
        if (!date) {
            delete objToPush['date'];
        }
        return objToPush;
    }
    pushObjToDataArray(objToPush) {
        if (this.data) {
            this.data.push(objToPush);
            } else {
            this.data = [objToPush];
        }
}
}
