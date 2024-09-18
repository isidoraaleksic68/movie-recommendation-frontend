import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLikeThisViewComponent } from './more-like-this-view.component';

describe('MoreLikeThisViewComponent', () => {
  let component: MoreLikeThisViewComponent;
  let fixture: ComponentFixture<MoreLikeThisViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreLikeThisViewComponent]
    });
    fixture = TestBed.createComponent(MoreLikeThisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
