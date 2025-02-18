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
  TopnavForm: FormGroup;
  searchResults: any[] = [];
  data: any;
  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.TopnavForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
    });

    this.sharedService.userLoginStatus.subscribe((data) => {
      this.data = data;
    });
  }

  onSearch(event: any) {
    this.sharedService.setData(this.TopnavForm.value.username);
  }

  clearSearch() {
    this.sharedService.setData(''); // Set the value of the FormControl to empty
  }
}
