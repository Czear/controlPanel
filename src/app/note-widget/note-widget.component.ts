import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-note-widget',
  templateUrl: './note-widget.component.html',
  styleUrls: ['./note-widget.component.css']
})
export class NoteWidgetComponent implements OnInit {
  @Input() noteData;
  title;
  text;
  date;
  constructor() { }

  ngOnInit() {
    this.title = this.noteData.title;
    this.text = this.noteData.text;
    this.date = this.noteData.date;
  }

}
