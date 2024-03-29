import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumemakerComponent } from './resumemaker.component';

describe('ResumemakerComponent', () => {
  let component: ResumemakerComponent;
  let fixture: ComponentFixture<ResumemakerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumemakerComponent]
    });
    fixture = TestBed.createComponent(ResumemakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
