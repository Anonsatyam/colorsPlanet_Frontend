import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { SharedService } from '../shared-services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-color-palette',
  templateUrl: './add-color-palette.component.html',
  styleUrls: ['./add-color-palette.component.css'],
})
export class AddColorPaletteComponent {
  colorGroupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: SharedService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.colorGroupForm = this.formBuilder.group({
      colorGroups: this.formBuilder.array([]),
    });

    for (let i = 0; i < 4; i++) {
      this.addColorGroup();
    }
  }

  ngOnInit() {
    console.log(this.colorGroupForm);
  }

  get colorGroups() {
    return this.colorGroupForm.get('colorGroups') as FormArray;
  }

  getColorGroupNameControl(index: number): FormControl {
    return this.colorGroups.at(index).get('name') as FormControl;
  }

  getColorGroupCodeControl(index: number): FormControl {
    return this.colorGroups.at(index).get('code') as FormControl;
  }

  addColorGroup() {
    const colorGroup = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
    });
    this.colorGroups.push(colorGroup);
  }

  addNewColorGroup() {
    const newColorGroup = this.colorGroupForm.value.colorGroups;

    this.service.addColorPalette(newColorGroup).subscribe(
      (response) => {
        console.log('New Color Group added:', response);
        this.snackBar.open('Data added successfully', 'Close', {
          duration: 3000,
        });
        this.colorGroupForm.reset();
        this.router.navigateByUrl('/')
      },
      (error) => {
        console.error('Error adding Color Group:', error);
      }
    );
  }
}
