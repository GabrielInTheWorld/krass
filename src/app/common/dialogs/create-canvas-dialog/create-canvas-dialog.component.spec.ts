import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCanvasDialogComponent } from './create-canvas-dialog.component';

describe('CreateCanvasDialogComponent', () => {
  let component: CreateCanvasDialogComponent;
  let fixture: ComponentFixture<CreateCanvasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCanvasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCanvasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
