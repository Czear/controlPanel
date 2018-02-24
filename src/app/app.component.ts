import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  left = {title: 'Lewa', text: 'Pierś z kurczaka, olej, ryż, cola, papier, przyprawy, czekolada', date: '24.02.2018'};
  right = {title: 'Prawa', text: 'Pierś z kurczaka, olej, ryż, cola, papier, przyprawy, czekolada', date: '24.02.2018'};
}
