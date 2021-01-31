import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingUtensilsWrapperComponent } from './painting-utensils-wrapper.component';

describe('PaintingUtensilsWrapperComponent', () => {
  let component: PaintingUtensilsWrapperComponent;
  let fixture: ComponentFixture<PaintingUtensilsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingUtensilsWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingUtensilsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
