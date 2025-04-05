import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatickeyComponent } from './statickey.component';

describe('StatickeyComponent', () => {
  let component: StatickeyComponent;
  let fixture: ComponentFixture<StatickeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatickeyComponent]
    });
    fixture = TestBed.createComponent(StatickeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
