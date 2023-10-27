import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAddComponent } from './register-add.component';

describe('RegisterAddComponent', () => {
  let component: RegisterAddComponent;
  let fixture: ComponentFixture<RegisterAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAddComponent]
    });
    fixture = TestBed.createComponent(RegisterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
