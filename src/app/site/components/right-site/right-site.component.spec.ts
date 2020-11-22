import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSiteComponent } from './right-site.component';

describe('RightSiteComponent', () => {
  let component: RightSiteComponent;
  let fixture: ComponentFixture<RightSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
