import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTripRequestComponent } from './manage-trip-request.component';

describe('ManageTripRequestComponent', () => {
  let component: ManageTripRequestComponent;
  let fixture: ComponentFixture<ManageTripRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTripRequestComponent]
    });
    fixture = TestBed.createComponent(ManageTripRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
