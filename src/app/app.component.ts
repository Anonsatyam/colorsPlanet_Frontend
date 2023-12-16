import { Component, Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';
import { SharedService } from "../app/shared-services/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'color';

  receivedEvent: boolean = true;
  isScreenSizeLarge: boolean = true;

  constructor(private service: SharedService){}


  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    this.isScreenSizeLarge = screenWidth >= 768;
    this.service.sendScreenSize(this.isScreenSizeLarge);
  }

  receivedSidenavEvent(event: boolean) {
    this.receivedEvent = event;
  }
}
