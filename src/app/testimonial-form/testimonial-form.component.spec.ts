import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialFormComponent } from './testimonial-form.component';

describe('TestimonialFormComponent', () => {
  let component: TestimonialFormComponent;
  let fixture: ComponentFixture<TestimonialFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialFormComponent]
    });
    fixture = TestBed.createComponent(TestimonialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
