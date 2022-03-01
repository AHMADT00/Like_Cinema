import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistartionComponent } from './edit-registartion.component';

describe('EditRegistartionComponent', () => {
  let component: EditRegistartionComponent;
  let fixture: ComponentFixture<EditRegistartionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRegistartionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistartionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
