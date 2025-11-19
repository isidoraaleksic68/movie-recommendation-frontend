import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEvaluationPageComponent } from './movie-evaluation-page.component';

describe('MovieEvaluationPageComponent', () => {
  let component: MovieEvaluationPageComponent;
  let fixture: ComponentFixture<MovieEvaluationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieEvaluationPageComponent]
    });
    fixture = TestBed.createComponent(MovieEvaluationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
