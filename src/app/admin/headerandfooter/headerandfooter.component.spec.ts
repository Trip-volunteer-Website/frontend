import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderandfooterComponent } from './headerandfooter.component';

describe('HeaderandfooterComponent', () => {
  let component: HeaderandfooterComponent;
  let fixture: ComponentFixture<HeaderandfooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderandfooterComponent]
    });
    fixture = TestBed.createComponent(HeaderandfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
