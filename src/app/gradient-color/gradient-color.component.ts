import { Component, OnInit } from '@angular/core';
import { GradientColorService } from './gradient-color.service';
import { ClipboardService } from 'ngx-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../shared-services/shared.service';
import { Subscription } from 'rxjs';
import { ColorGroup } from '../color-palette/color-data.interface';


@Component({
  selector: 'app-gradient-color',
  templateUrl: './gradient-color.component.html',
  styleUrls: ['./gradient-color.component.css'],
})
export class GradientColorComponent {
  gradientColorsData: any[] = [];
  loadingData: boolean;
  dataFromSearch: any = '';
  searchResults: any[] = [];
  colors: any[] = [];
  abc: any[] = [];
  colorData: any[] = [];
  pageSize = 12;
  objects: Array<any> = [];
  hideLoadButton: boolean = false;


  randomMessages = [
    'Hey Nice Choice',
    'Looks Amazing',
    'Fall In Love With This Color',
    'Pretty Good Choice',
  ];
  private subscription: Subscription;

  constructor(
    private service: GradientColorService,
    private snackBar: MatSnackBar,
    private clipboardService: ClipboardService,
    private sharedService: SharedService,
  ) {
    this.subscription = this.sharedService.dataFromSearch$.subscribe((data) => {
      this.dataFromSearch = data;
      if (this.dataFromSearch.trim() === '') {
        this.searchResults = [];
      } else {
        this.searchResults = this.colors.filter((colorGroup) =>
        //Later Change The ColorGroup Interface To Gradient Interface
          colorGroup.some((color: ColorGroup) => {
            return (
              color.name
                .toLowerCase()
                .includes(this.dataFromSearch.toLowerCase()) ||
              color.code
                .toLowerCase()
                .includes(this.dataFromSearch.toLowerCase())
            );
          })
        );
      }
    });
  }

  ngOnInit(): void {
    this.fetchGradientColors();
  }

  fetchGradientColors() {
    this.loadingData = true;
    this.service.getgradientColorData().subscribe((data) => {
      this.gradientColorsData = data[0].gradientColor;
      this.loadColorData();
      this.loadingData = false;
    });
  }

  loadColorData() {
    const start = this.colors.length;
    const end = start + this.pageSize;
    this.colors = [...this.colors, ...this.gradientColorsData.slice(start, end)];
    if (this.colors.length === this.colorData.length) {
      this.hideLoadButton = true;
    }
    
  }

  copyColorCode(colorCode: any): void {
    console.log(colorCode);
    
    this.clipboardService.copyFromContent(colorCode);

    const randomNumber = Math.floor(Math.random() * this.randomMessages.length);
    const randomMessage = this.randomMessages[randomNumber];

    this.snackBar.open(randomMessage, 'Ok', {
      duration: 1000,
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }
}
