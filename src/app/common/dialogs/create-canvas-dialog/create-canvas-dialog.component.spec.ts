import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateCanvasDialogComponent } from './create-canvas-dialog.component';

describe('CreateCanvasDialogComponent', () => {
  let component: CreateCanvasDialogComponent;
  let fixture: ComponentFixture<CreateCanvasDialogComponent>;

  beforeEach(waitForAsync(() => {
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
