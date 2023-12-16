import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientColorComponent } from './gradient-color.component';

describe('GradientColorComponent', () => {
  let component: GradientColorComponent;
  let fixture: ComponentFixture<GradientColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradientColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
