import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListMapComponent } from './trip-list-map.component';

describe('TripListMapComponent', () => {
  let component: TripListMapComponent;
  let fixture: ComponentFixture<TripListMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripListMapComponent]
    });
    fixture = TestBed.createComponent(TripListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
