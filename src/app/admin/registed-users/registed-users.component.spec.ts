import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistedUsersComponent } from './registed-users.component';

describe('RegistedUsersComponent', () => {
  let component: RegistedUsersComponent;
  let fixture: ComponentFixture<RegistedUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistedUsersComponent]
    });
    fixture = TestBed.createComponent(RegistedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
