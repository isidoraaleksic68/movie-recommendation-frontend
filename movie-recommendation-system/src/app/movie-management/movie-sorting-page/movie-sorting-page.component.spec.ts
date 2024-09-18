import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSortingPageComponent } from './movie-sorting-page.component';

describe('MovieSortingPageComponent', () => {
  let component: MovieSortingPageComponent;
  let fixture: ComponentFixture<MovieSortingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieSortingPageComponent]
    });
    fixture = TestBed.createComponent(MovieSortingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
