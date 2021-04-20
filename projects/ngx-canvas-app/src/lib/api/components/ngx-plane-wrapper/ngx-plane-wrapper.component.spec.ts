import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPlaneWrapperComponent } from './ngx-plane-wrapper.component';

describe('NgxPlaneWrapperComponent', () => {
  let component: NgxPlaneWrapperComponent;
  let fixture: ComponentFixture<NgxPlaneWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPlaneWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPlaneWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
