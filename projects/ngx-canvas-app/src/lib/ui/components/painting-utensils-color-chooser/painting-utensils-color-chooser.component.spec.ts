import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingUtensilsColorChooserComponent } from './painting-utensils-color-chooser.component';

describe('PaintingUtensilsColorChooserComponent', () => {
  let component: PaintingUtensilsColorChooserComponent;
  let fixture: ComponentFixture<PaintingUtensilsColorChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingUtensilsColorChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingUtensilsColorChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
