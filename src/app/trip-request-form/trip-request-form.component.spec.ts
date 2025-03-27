import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRequestFormComponent } from './trip-request-form.component';

describe('TripRequestFormComponent', () => {
  let component: TripRequestFormComponent;
  let fixture: ComponentFixture<TripRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripRequestFormComponent]
    });
    fixture = TestBed.createComponent(TripRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
