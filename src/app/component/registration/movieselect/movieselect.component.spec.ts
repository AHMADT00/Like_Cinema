import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieselectComponent } from './movieselect.component';

describe('MovieselectComponent', () => {
  let component: MovieselectComponent;
  let fixture: ComponentFixture<MovieselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
