import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManegaboutComponent } from './manegabout.component';

describe('ManegaboutComponent', () => {
  let component: ManegaboutComponent;
  let fixture: ComponentFixture<ManegaboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManegaboutComponent]
    });
    fixture = TestBed.createComponent(ManegaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
