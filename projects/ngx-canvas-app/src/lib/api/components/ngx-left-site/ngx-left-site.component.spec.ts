import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLeftSiteComponent } from './ngx-left-site.component';

describe('NgxLeftSiteComponent', () => {
  let component: NgxLeftSiteComponent;
  let fixture: ComponentFixture<NgxLeftSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxLeftSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxLeftSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
