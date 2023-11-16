import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReservationsUserComponent } from './page-reservations-user.component';

describe('PageReservationsUserComponent', () => {
  let component: PageReservationsUserComponent;
  let fixture: ComponentFixture<PageReservationsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageReservationsUserComponent]
    });
    fixture = TestBed.createComponent(PageReservationsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
