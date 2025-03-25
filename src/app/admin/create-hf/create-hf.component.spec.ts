import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHFComponent } from './create-hf.component';

describe('CreateHFComponent', () => {
  let component: CreateHFComponent;
  let fixture: ComponentFixture<CreateHFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHFComponent]
    });
    fixture = TestBed.createComponent(CreateHFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
