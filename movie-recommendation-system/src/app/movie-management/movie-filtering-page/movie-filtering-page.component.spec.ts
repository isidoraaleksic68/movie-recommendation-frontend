import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFilteringPageComponent } from './movie-filtering-page.component';

describe('MovieFilteringPageComponent', () => {
  let component: MovieFilteringPageComponent;
  let fixture: ComponentFixture<MovieFilteringPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieFilteringPageComponent]
    });
    fixture = TestBed.createComponent(MovieFilteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
