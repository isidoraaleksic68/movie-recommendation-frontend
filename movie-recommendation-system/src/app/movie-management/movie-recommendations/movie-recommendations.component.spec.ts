import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRecommendationsComponent } from './movie-recommendations.component';

describe('MovieRecommendationsComponent', () => {
  let component: MovieRecommendationsComponent;
  let fixture: ComponentFixture<MovieRecommendationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieRecommendationsComponent]
    });
    fixture = TestBed.createComponent(MovieRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
