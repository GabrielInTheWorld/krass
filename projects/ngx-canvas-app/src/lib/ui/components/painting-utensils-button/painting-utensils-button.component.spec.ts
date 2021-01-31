import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingUtensilsButtonComponent } from './painting-utensils-button.component';

describe('PaintingUtensilsButtonComponent', () => {
  let component: PaintingUtensilsButtonComponent;
  let fixture: ComponentFixture<PaintingUtensilsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingUtensilsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingUtensilsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
