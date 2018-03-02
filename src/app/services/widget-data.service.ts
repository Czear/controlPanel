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
        {title: 'WidgetForm', text: 'Finish widget form'},
        {title: 'Edit button', text: 'Make edit button working'},
        {title: 'HTTP req', text: 'Start to use HTTP request'},
        {title: 'Priority', text: 'Invent some priority system'},
        {title: 'Auth', text: 'Start to use authentication system'},
        {title: 'New Widgets', text: 'Implement new widgets'},
        {title: 'Layout', text: 'Think about modern layout'}
    ];
    addMode = new Subject();
    dataChanges = new Subject();

    addWidget(newObject) {
        console.log(newObject);
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
}
