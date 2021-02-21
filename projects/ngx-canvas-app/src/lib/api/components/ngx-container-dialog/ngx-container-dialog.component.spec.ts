import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxContainerDialogComponent } from './ngx-container-dialog.component';

describe('NgxContainerDialogComponent', () => {
  let component: NgxContainerDialogComponent;
  let fixture: ComponentFixture<NgxContainerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxContainerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxContainerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
