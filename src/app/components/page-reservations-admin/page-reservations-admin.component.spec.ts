import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReservationsAdminComponent } from './page-reservations-admin.component';

describe('PageReservationsAdminComponent', () => {
  let component: PageReservationsAdminComponent;
  let fixture: ComponentFixture<PageReservationsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageReservationsAdminComponent]
    });
    fixture = TestBed.createComponent(PageReservationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
