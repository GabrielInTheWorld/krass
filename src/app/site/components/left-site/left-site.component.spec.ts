import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSiteComponent } from './left-site.component';

describe('LeftSiteComponent', () => {
  let component: LeftSiteComponent;
  let fixture: ComponentFixture<LeftSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
