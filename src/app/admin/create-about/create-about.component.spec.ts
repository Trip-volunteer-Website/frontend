import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAboutComponent } from './create-about.component';

describe('CreateAboutComponent', () => {
  let component: CreateAboutComponent;
  let fixture: ComponentFixture<CreateAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAboutComponent]
    });
    fixture = TestBed.createComponent(CreateAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
