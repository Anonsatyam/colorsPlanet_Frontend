import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';
import { SharedService } from '../shared-services/shared.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ transform: 'rotate(0deg)', opacity: 0 }),
        animate(
          '250ms ease-out',
          style({ transform: 'rotate(360deg)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'rotate(360deg)', opacity: 1 }),
        animate(
          '250ms ease-in',
          style({ transform: 'rotate(0deg)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent {
  isScreenLarge: boolean = false;
  menuStatus: boolean = true;
  @Output() sidenavEvent = new EventEmitter<boolean>();

  constructor(private router: Router, private sharedService: SharedService) {
    this.sharedService.getScreenSize().subscribe((data) => {
      this.isScreenLarge = data;
      console.log(this.isScreenLarge);
      
    });
  }

  ngOnInit(): void {}

  sidenavToggle() {
    if (this.isScreenLarge) {
      this.menuStatus = !this.menuStatus;
      this.sidenavEvent.emit(this.menuStatus);
    }
  }
}
