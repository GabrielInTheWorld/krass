import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRightSiteComponent } from './ngx-right-site.component';

describe('NgxRightSiteComponent', () => {
  let component: NgxRightSiteComponent;
  let fixture: ComponentFixture<NgxRightSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxRightSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRightSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
