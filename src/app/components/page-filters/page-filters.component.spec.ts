import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFiltersComponent } from './page-filters.component';

describe('PageFiltersComponent', () => {
  let component: PageFiltersComponent;
  let fixture: ComponentFixture<PageFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFiltersComponent]
    });
    fixture = TestBed.createComponent(PageFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
