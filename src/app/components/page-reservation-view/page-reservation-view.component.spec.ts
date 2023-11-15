import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReservationViewComponent } from './page-reservation-view.component';

describe('PageReservationViewComponent', () => {
  let component: PageReservationViewComponent;
  let fixture: ComponentFixture<PageReservationViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageReservationViewComponent]
    });
    fixture = TestBed.createComponent(PageReservationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
