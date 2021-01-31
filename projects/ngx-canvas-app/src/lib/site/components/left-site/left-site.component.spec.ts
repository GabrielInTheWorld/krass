import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LeftSiteComponent } from './left-site.component';

describe('LeftSiteComponent', () => {
  let component: LeftSiteComponent;
  let fixture: ComponentFixture<LeftSiteComponent>;

  beforeEach(waitForAsync(() => {
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
