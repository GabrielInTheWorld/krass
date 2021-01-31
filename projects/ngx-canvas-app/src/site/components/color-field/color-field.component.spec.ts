import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColorFieldComponent } from './color-field.component';

describe('ColorFieldComponent', () => {
  let component: ColorFieldComponent;
  let fixture: ComponentFixture<ColorFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
