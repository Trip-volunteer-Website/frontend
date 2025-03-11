import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsFormComponent } from './testimonials-form.component';

describe('TestimonialsFormComponent', () => {
  let component: TestimonialsFormComponent;
  let fixture: ComponentFixture<TestimonialsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialsFormComponent]
    });
    fixture = TestBed.createComponent(TestimonialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
