import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../shared-services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  SignupForm: FormGroup;
  searchResults: any[] = [];
  data: any;
  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.SignupForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
    });

    this.sharedService.userLoginStatus.subscribe((data) => {
      this.data = data;
    });
  }

  onSearch(event: any) {
    this.sharedService.setData(this.SignupForm.value.username);
  }
}
