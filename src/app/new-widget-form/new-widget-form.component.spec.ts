import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWidgetFormComponent } from './new-widget-form.component';

describe('NewWidgetFormComponent', () => {
  let component: NewWidgetFormComponent;
  let fixture: ComponentFixture<NewWidgetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWidgetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWidgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
