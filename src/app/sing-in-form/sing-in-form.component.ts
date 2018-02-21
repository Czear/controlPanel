import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sing-in-form',
  templateUrl: './sing-in-form.component.html',
  styleUrls: ['./sing-in-form.component.css']
})
export class SingInFormComponent implements OnInit {
    singInForm: FormGroup;
  constructor() { }

  ngOnInit() {
      this.singInForm = new FormGroup({
          'singInNickname': new FormControl(null, Validators.required),
          'singInPass': new FormControl(null, Validators.required),
      });
  }
    checkIfTouched(input: FormControl) {
        return ( input.touched || input.dirty);
    }
    onSubmit(f: FormControl) {
      console.log('success');
  }
}
