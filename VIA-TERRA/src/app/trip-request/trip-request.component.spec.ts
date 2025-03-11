import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRequestComponent } from './trip-request.component';

describe('TripRequestComponent', () => {
  let component: TripRequestComponent;
  let fixture: ComponentFixture<TripRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripRequestComponent]
    });
    fixture = TestBed.createComponent(TripRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
