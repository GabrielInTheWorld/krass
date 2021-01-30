import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RightSiteComponent } from './right-site.component';

describe('RightSiteComponent', () => {
  let component: RightSiteComponent;
  let fixture: ComponentFixture<RightSiteComponent>;

  beforeEach(waitForAsync(() => {
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
