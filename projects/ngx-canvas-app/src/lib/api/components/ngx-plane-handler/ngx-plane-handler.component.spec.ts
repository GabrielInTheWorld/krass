import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPlaneHandlerComponent } from './ngx-plane-handler.component';

describe('NgxPlaneHandlerComponent', () => {
  let component: NgxPlaneHandlerComponent;
  let fixture: ComponentFixture<NgxPlaneHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPlaneHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPlaneHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
