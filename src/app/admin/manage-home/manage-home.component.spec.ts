import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeComponent } from './manage-home.component';

describe('ManageHomeComponent', () => {
  let component: ManageHomeComponent;
  let fixture: ComponentFixture<ManageHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageHomeComponent]
    });
    fixture = TestBed.createComponent(ManageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
