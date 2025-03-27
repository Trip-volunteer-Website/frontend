import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGalleryComponent } from './manage-gallery.component';

describe('ManageGalleryComponent', () => {
  let component: ManageGalleryComponent;
  let fixture: ComponentFixture<ManageGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageGalleryComponent]
    });
    fixture = TestBed.createComponent(ManageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
