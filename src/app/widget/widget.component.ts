import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {WidgetDataService} from '../services/widget-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit, OnDestroy{
    isMobile;
    mobileSubscription;
    isMouseOverText = false;
    holdingMode = false;
    editMode = false;
    editForm: FormGroup;
    @Input() widgetData;
    constructor(private widgetServiceData: WidgetDataService) {}
    ngOnInit() {
        this.mobileSubscription = this.widgetServiceData.resolutionChanged
            .subscribe((isMobile) => {
                this.isMobile = isMobile;
        });
        this.widgetServiceData.checkIfMobile();
    }
    ngOnDestroy() {
        this.mobileSubscription.unsubscribe();
    }
    @HostListener('dragstart', ['$event'])
    onDrag(event) {
        this.holdingMode = true;
        event.dataTransfer.setData('text', event.target.id);
    }
    @HostListener('dragend', ['$event'])
    onDragEnd() {
        this.holdingMode = false;
    }
        destroyWidget(index) {
            this.widgetServiceData.removeWidget(index);
        }
        toggleEditMode() {
            this.editMode = !this.editMode;
            if (this.editMode) {
                this.buildEditForm();
            }
        }
        onMouseOver(event) {
            if (event.target) {
                this.isMouseOverText =  event.target.nodeName === 'SPAN';
            }}
        saveEditedWidgetChanges() {
            this.toggleEditMode();
            this.widgetServiceData.editWidget(
                this.widgetData.index,
                this.widgetServiceData.dataNoteConversionToObject(
                    this.editForm.get('editTitle').value,
                    this.editForm.get('editContent').value,
                    this.editForm.get('editDate').value,
                    this.widgetData.id));
        }
        buildEditForm() {
            this.editForm = new FormGroup({
                'editTitle': new FormControl(this.widgetData.title, [Validators.required, Validators.maxLength(100)]),
                'editContent': new FormControl(this.widgetData.content, Validators.required),
                'editDate': new FormControl(
                    this.widgetServiceData.dateConverter(this.widgetData.date),
                    Validators.pattern(this.widgetServiceData.dateValidator))
            });
        }
}
