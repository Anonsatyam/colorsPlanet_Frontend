import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidColorComponent } from './solid-color.component';

describe('SolidColorComponent', () => {
  let component: SolidColorComponent;
  let fixture: ComponentFixture<SolidColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolidColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolidColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
