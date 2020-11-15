import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneWrapperComponent } from './plane-wrapper.component';

describe('PlaneWrapperComponent', () => {
  let component: PlaneWrapperComponent;
  let fixture: ComponentFixture<PlaneWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
