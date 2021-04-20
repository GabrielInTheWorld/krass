import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPaintingUtensilsWrapperComponent } from './ngx-painting-utensils-wrapper.component';

describe('NgxPaintingUtensilsWrapperComponent', () => {
  let component: NgxPaintingUtensilsWrapperComponent;
  let fixture: ComponentFixture<NgxPaintingUtensilsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPaintingUtensilsWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPaintingUtensilsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
