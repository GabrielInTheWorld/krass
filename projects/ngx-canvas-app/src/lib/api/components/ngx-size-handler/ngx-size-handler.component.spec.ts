import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSizeHandlerComponent } from './ngx-size-handler.component';

describe('NgxSizeHandlerComponent', () => {
  let component: NgxSizeHandlerComponent;
  let fixture: ComponentFixture<NgxSizeHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSizeHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSizeHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
