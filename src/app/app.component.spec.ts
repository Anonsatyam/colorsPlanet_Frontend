import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedService } from './shared-services/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: SharedService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      declarations: [AppComponent, TopNavComponent],
      providers: [SharedService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should check screen size on window resize', () => {
    spyOn(service, 'sendScreenSize');

    window.innerWidth = 500;
    const event = new Event('resize');
    window.dispatchEvent(event);
    fixture.detectChanges();

    expect(service.sendScreenSize).toHaveBeenCalledWith(false);
  });

  it('should received side event', () => {
    const event = true;
    component.receivedSidenavEvent(event);
    expect(component.receivedSidenavEvent).toBeTruthy();
  });
});
