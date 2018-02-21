import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sing-up-form',
  templateUrl: './sing-up-form.component.html',
  styleUrls: ['./sing-up-form.component.css']
})
export class SingUpFormComponent implements OnInit {
  singUpForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.singUpForm = new FormGroup({
        'singUpNickname': new FormControl(null, Validators.required),
        'singUpEmail': new FormControl(null, [Validators.email, Validators.required]),
        'singUpPass': new FormControl(null, Validators.required),
        'singUpPassConfirm': new FormControl(null, Validators.required)
    });
  }
    checkIfTouched(input: FormControl) {
        return ( input.touched || input.dirty);
    }
}
