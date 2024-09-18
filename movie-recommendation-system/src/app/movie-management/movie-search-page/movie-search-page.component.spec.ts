import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchPageComponent } from './movie-search-page.component';

describe('MovieSearchPageComponent', () => {
  let component: MovieSearchPageComponent;
  let fixture: ComponentFixture<MovieSearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieSearchPageComponent]
    });
    fixture = TestBed.createComponent(MovieSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
