import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTVComponent } from './category-tv.component';

describe('CategoryTVComponent', () => {
  let component: CategoryTVComponent;
  let fixture: ComponentFixture<CategoryTVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryTVComponent]
    });
    fixture = TestBed.createComponent(CategoryTVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
