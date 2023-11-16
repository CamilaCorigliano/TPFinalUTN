import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConfirmReservationComponent } from './page-confirm-reservation.component';

describe('PageConfirmReservationComponent', () => {
  let component: PageConfirmReservationComponent;
  let fixture: ComponentFixture<PageConfirmReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageConfirmReservationComponent]
    });
    fixture = TestBed.createComponent(PageConfirmReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
