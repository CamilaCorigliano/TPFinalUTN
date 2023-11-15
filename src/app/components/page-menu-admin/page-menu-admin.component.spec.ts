import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMenuAdminComponent } from './page-menu-admin.component';

describe('PageMenuAdminComponent', () => {
  let component: PageMenuAdminComponent;
  let fixture: ComponentFixture<PageMenuAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageMenuAdminComponent]
    });
    fixture = TestBed.createComponent(PageMenuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
