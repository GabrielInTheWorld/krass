import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCanvasAppComponent } from './ngx-canvas-app.component';

describe('NgxCanvasAppComponent', () => {
  let component: NgxCanvasAppComponent;
  let fixture: ComponentFixture<NgxCanvasAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCanvasAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCanvasAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
