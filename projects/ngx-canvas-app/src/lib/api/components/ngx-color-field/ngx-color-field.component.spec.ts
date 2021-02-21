import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxColorFieldComponent } from './ngx-color-field.component';

describe('NgxColorFieldComponent', () => {
  let component: NgxColorFieldComponent;
  let fixture: ComponentFixture<NgxColorFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxColorFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxColorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
