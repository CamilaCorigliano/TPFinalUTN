import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAddComponent } from './table-add.component';

describe('CategoryAddComponent', () => {
  let component: TableAddComponent;
  let fixture: ComponentFixture<TableAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAddComponent]
    });
    fixture = TestBed.createComponent(TableAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
