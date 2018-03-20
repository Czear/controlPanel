import {Component, HostListener, Input} from '@angular/core';
import {WidgetDataService} from '../services/widget-data.service';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent {
  constructor(private widgetServiceData: WidgetDataService) { }
  @Input() ID;
  isDraggedOver;
  @HostListener('drop', ['$event'])
  onDrop(event) {
      event.preventDefault();
      let searchedIndex = 0;
      this.isDraggedOver = false;
      let identyficator = this.ID + 2;
      const TAKEN_WIDGET_ID = parseInt(event.dataTransfer.getData('text').split('_')[1], 10);
          if (TAKEN_WIDGET_ID !== this.ID) { // Check if the user tries to place widget to the same spot
           this.widgetServiceData.data.forEach((item, index) => {
                if (item.id === TAKEN_WIDGET_ID) { // Look for moved widget index in data
                    searchedIndex = index;
                }
                    if (item.id > this.ID && this.numbersParity(item.id, this.ID)) {
                        this.widgetServiceData.data[index].id += 2; // If widget is above drop zone, move it up
                    }
                        if (item.id > TAKEN_WIDGET_ID && this.numbersParity(item.id, TAKEN_WIDGET_ID)) {
                           this.widgetServiceData.data[index].id -= 2; // If widget is above take zone, move it down
                        }
                });
           if (identyficator > TAKEN_WIDGET_ID && this.numbersParity(TAKEN_WIDGET_ID, this.ID)) {
               identyficator -= 2;
           }
              this.widgetServiceData.data[searchedIndex].id = identyficator;
              this.widgetServiceData.data.sort(function (a, b) {
                          if (a.id < b.id) {
                              return -1;
                          }
                          if (a.id > b.id) {
                              return 1;
                          }
                        });
                          this.widgetServiceData.dataChanges.next(this.widgetServiceData.data);
                          this.widgetServiceData.putData().subscribe();
          }
  }
    @HostListener('dragenter', ['$event'])
    onDragEnter() {
        this.isDraggedOver = true;
    }
    onDragLeave(event) {
        if (event.fromElement) {
            if (event.fromElement.nodeName !== 'I' && event.target.nodeName !== 'I') {
                this.isDraggedOver = false;
            }
        }
    }
    numbersParity(firstNum, secondNum) {
      return (!! + (firstNum % 2) === !! + (secondNum % 2));
    }
}
