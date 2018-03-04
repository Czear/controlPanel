import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class WidgetDataService {
    addWidgetMode = false;
  /*data = [
      {title: 'Legitimation', text: 'Stamp my ID card', date: new Date(2018, 3, 31)},
      {title: 'Shopping list', text: 'Rice, Cooking Oil, Chicken Breast, Salt, Cola', date: new Date(2018, 2, 28)},
      {title: 'Pc components list', text: 'RAM, GPU, CPU, Power supply, Cooler, SSD, HDD'},
      {title: 'Money Plan', text: 'Remember to save 300', date: new Date(2018, 3, 20)}
  ];*/
    data = [
        {title: 'Edit button', content: 'Make edit button working'},
        {title: 'HTTP req', content: 'Start to use HTTP request'},
        {title: 'Priority', content: 'Invent some priority system'},
        {title: 'Auth', content: 'Start to use authentication system'},
        {title: 'New Widgets', content: 'Implement new widgets'},
        {title: 'Layout', content: 'Think about modern layout'},
        {title: 'Test Date Widget', content: 'Test Date Content', date: new Date(1997, 7, 6)}
    ];
    dateValidator = new RegExp('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)' +
        '(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|' +
        '[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])' +
        '|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$');
    addMode = new Subject();
    dataChanges = new Subject();

    addWidget(newObject) {
        this.data.push(newObject);
        this.dataChanges.next(this.data.slice());
    }

    removeWidget(index) {
        this.data.splice(index, 1);
        this.dataChanges.next(this.data.slice());
    }

    editWidget(index, newObject) {
        this.data[index] = newObject;
        this.dataChanges.next(this.data.slice());
    }
    toggleAddMode() {
        this.addWidgetMode = !this.addWidgetMode;
        this.addMode.next(this.addWidgetMode);
    }
    stringToDate(dateString) {
        if (dateString) {
            let separator;
            const SEPARATORS = ['.', '/', '-'];
            for (const ARRAYITEMSEPARATOR of SEPARATORS) {
                if (dateString.includes(ARRAYITEMSEPARATOR)) {
                    separator = ARRAYITEMSEPARATOR;
                }
            }
            const DATEVARIABLES = dateString.split(separator);
            return new Date(DATEVARIABLES[2], DATEVARIABLES[1] - 1, DATEVARIABLES[0]);
        }
        return '';
    }
    dataNoteConversionToObject(title, content, date) {
        const objToPush = {
            title: title,
            content: content,
            date: this.stringToDate(date)
        };
        if (!date) {
            delete objToPush['date'];
        }
        return objToPush;
    }
}
