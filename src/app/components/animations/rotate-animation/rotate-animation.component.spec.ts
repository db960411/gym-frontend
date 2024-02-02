import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotateAnimationComponent } from './rotate-animation.component';

describe('RotateAnimationComponent', () => {
  let component: RotateAnimationComponent;
  let fixture: ComponentFixture<RotateAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotateAnimationComponent]
    });
    fixture = TestBed.createComponent(RotateAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
