import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotsComponent } from './nots.component';

describe('NotsComponent', () => {
  let component: NotsComponent;
  let fixture: ComponentFixture<NotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
