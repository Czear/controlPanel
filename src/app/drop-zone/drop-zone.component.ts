import {Component, HostListener, Input} from '@angular/core';
import {WidgetDataService} from '../services/widget-data.service';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css'],
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
              if (TAKEN_WIDGET_ID !== this.ID) {
               this.widgetServiceData.data.forEach((item, index) => {
                    if (item.id === TAKEN_WIDGET_ID) {
                        searchedIndex = index;
                    }
                        if (this.widgetServiceData.checkIfNumIsGraterAndItParity(item.id, this.ID)) {
                            item.id += 2;
                        }
                            if (this.widgetServiceData.checkIfNumIsGraterAndItParity(item.id, TAKEN_WIDGET_ID)) {
                               item.id -= 2;
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
          onDragOver (event) {
              event.preventDefault();
              this.isDraggedOver = true;
          }
            onDragLeave(event) {
                if (event.relatedTarget && event.target) { // To prevent errors
                    if (event.relatedTarget.classList[0] !== 'doNotLeave' && event.target.nodeName === 'DIV') {
                        this.isDraggedOver = false;
                    }
                }
            }
    numbersParity(firstNum, secondNum) {
      return (!! + (firstNum % 2) === !! + (secondNum % 2));
    }
}
