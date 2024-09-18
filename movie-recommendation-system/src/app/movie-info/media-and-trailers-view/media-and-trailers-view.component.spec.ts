import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAndTrailersViewComponent } from './media-and-trailers-view.component';

describe('MediaAndTrailersViewComponent', () => {
  let component: MediaAndTrailersViewComponent;
  let fixture: ComponentFixture<MediaAndTrailersViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaAndTrailersViewComponent]
    });
    fixture = TestBed.createComponent(MediaAndTrailersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
