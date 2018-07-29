import {Component, HostListener, Input} from '@angular/core';
import {WidgetDataService} from '../services/widget-data.service';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css'],
})
export class DropZoneComponent {
  constructor(private widgetServiceData: WidgetDataService) { }
  @Input() dropzoneID;
  isDraggedOver = false;
  bgColor;
  @HostListener('drop', ['$event'])
      onDrop(event) {
          event.preventDefault();
          // Setting variables
          this.isDraggedOver = false;
          let indexOfNote = 0;
          let newWidgetID = this.dropzoneID + 2;
          const DROPPED_WIDGET_ID = parseInt(event.dataTransfer.getData('number'), 10);
              if (DROPPED_WIDGET_ID !== this.dropzoneID ) {
                  // Loop of reordering
               this.widgetServiceData.data.forEach((item, index) => {
                    if (item.id === DROPPED_WIDGET_ID) {
                        indexOfNote = index;
                    }
                        if (this.widgetServiceData.checkIfNumIsGraterAndItsParity(item.id, this.dropzoneID)) {
                            item.id += 2;
                        }
                            if (this.widgetServiceData.checkIfNumIsGraterAndItsParity(item.id, DROPPED_WIDGET_ID)) {
                               item.id -= 2;
                            }
                    });
               if (newWidgetID > DROPPED_WIDGET_ID && this.numbersParity(DROPPED_WIDGET_ID, this.dropzoneID)) {
                   // Special case, 2 widgets get swapped but none of others does
                   newWidgetID -= 2;
               }
               // Pushing the new data
                 this.widgetServiceData.data[indexOfNote].id = newWidgetID;
                  this.sortWidgets();
                   this.widgetServiceData.dataChanged.next(this.widgetServiceData.data);
                     this.widgetServiceData.putData().subscribe();
              }
      }
      
  onDragOver(event) {
    event.preventDefault();
  }

  onDragEnter(event){
    this.isDraggedOver = true;
    this.bgColor = this.widgetServiceData.dropzoneColor;
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

  sortWidgets() {
      this.widgetServiceData.data.sort(function (a, b) {
          if (a.id < b.id) {
              return -1;
          }
          if (a.id > b.id) {
              return 1;
          }
      });
  }
}
