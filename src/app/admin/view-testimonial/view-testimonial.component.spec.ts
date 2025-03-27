import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestimonialComponent } from './view-testimonial.component';

describe('ViewTestimonialComponent', () => {
  let component: ViewTestimonialComponent;
  let fixture: ComponentFixture<ViewTestimonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTestimonialComponent]
    });
    fixture = TestBed.createComponent(ViewTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
