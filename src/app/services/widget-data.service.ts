import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class WidgetDataService {
  data = [
      {title: 'Legitimation', text: 'Stamp my ID card', date: new Date(2018, 3, 31)},
      {title: 'Shopping list', text: 'Rice, Cooking Oil, Chicken Breast, Salt, Cola', date: new Date(2018, 2, 28)},
      {title: 'Pc components list', text: 'RAM, GPU, CPU, Power supply, Cooler, SSD, HDD'},
      {title: 'Money Plan', text: 'Remember to save 300', date: new Date(2018, 3, 20)}
  ];
  dataChanges = new Subject();

    removeWidget(index) {
        this.data.splice(index, 1);
        this.dataChanges.next(this.data.slice());
    }
}
