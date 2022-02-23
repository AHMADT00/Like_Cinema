import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InTheaterComponent } from './in-theater.component';

describe('InTheaterComponent', () => {
  let component: InTheaterComponent;
  let fixture: ComponentFixture<InTheaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InTheaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InTheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
