import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {WidgetDataService} from '../services/widget-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit, OnDestroy {
    @Input() widgetData;
    isMobile;
    resolutionSubscription;
    isMouseOverText = false;
    holdingMode = false;
    editMode = false;
    colorsClasses = ['primary', 'success', 'warning', 'danger', 'secondary', 'dark'];
    editForm: FormGroup;
    constructor(private widgetServiceData: WidgetDataService) {}
    ngOnInit() {
        this.resolutionSubscription = this.widgetServiceData.resolutionChanged
            .subscribe((isMobile) => {
                this.isMobile = isMobile;
        });
        this.widgetServiceData.checkIfMobile();
    }
    ngOnDestroy() {
        this.resolutionSubscription.unsubscribe();
    }
    @HostListener('dragstart', ['$event'])
    onDrag(event) {
        this.holdingMode = true;
        this.widgetServiceData.dropzoneColor = this.widgetData.headerBgColor;
        event.dataTransfer.setData('number', this.widgetData.id);
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
                this.widgetData.index, {
                    title: this.editForm.get('editTitle').value,
                    content: this.editForm.get('editContent').value,
                    date: this.editForm.get('editDate').value,
                    fav: this.editForm.get('fav').value,
                    id: this.widgetData.id,
                    headerBgColor: this.editForm.get('headerBgColor').value});
        }
        buildEditForm() {
            this.editForm = new FormGroup({
                'editTitle': new FormControl(this.widgetData.title, [Validators.required, Validators.maxLength(100)]),
                'editContent': new FormControl(this.widgetData.content, Validators.required),
                'editDate': new FormControl(
                    this.widgetServiceData.dateConverter(this.widgetData.date),
                    Validators.pattern(this.widgetServiceData.dateValidator)),
                'fav': new FormControl(this.widgetData.fav),
                'headerBgColor': new FormControl(this.widgetData.headerBgColor)
            });
        }
}
