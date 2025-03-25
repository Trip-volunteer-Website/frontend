import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManegpostComponent } from './manegpost.component';

describe('ManegpostComponent', () => {
  let component: ManegpostComponent;
  let fixture: ComponentFixture<ManegpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManegpostComponent]
    });
    fixture = TestBed.createComponent(ManegpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
