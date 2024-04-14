import { Component, OnInit } from '@angular/core';
import { ColorPaletteService } from './color-palette.service';
import { ColorGroup } from './color-data.interface';
import { ClipboardService } from 'ngx-clipboard';
import { SharedService } from '../shared-services/shared.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import ObjectId from 'bson-objectid';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css'],
})
export class ColorPaletteComponent implements OnInit {
  colors: any[] = [];
  colorData: any[] = [];
  searchResults: any[] = [];

  loadingData: boolean;
  dataFromSearch: any = '';
  randomMessages = [
    'Hey Nice Choice',
    'Looks Amazing',
    'Fall In Love With This Color',
    'Pretty Good Choice',
  ];
  private subscription: Subscription;
  pageSize = 12;
  hideLoadButton: boolean = false;

  constructor(
    private service: ColorPaletteService,
    private clipboardService: ClipboardService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) {
    this.subscription = this.sharedService.dataFromSearch$.subscribe((data) => {
      this.dataFromSearch = data;
      if (this.dataFromSearch.trim() === '') {
        this.searchResults = [];
      } else {
        const index = this.colors.findIndex((colorGroup) =>
          colorGroup.find((color: any) => color.name.toLowerCase() === this.dataFromSearch.toLowerCase())
        );

        this.searchResults = index !== -1 ? this.colors[index] : undefined;
      }
    });
  }

  ngOnInit() {
    this.fetchColorPalletes();
  }

  fetchColorPalletes() {
    this.loadingData = true;
    this.service.getData().subscribe((data) => {
      console.log(data);
      
      this.colorData = data[0].colorGroups;
      this.getFormattedColors(this.colorData);
      this.loadColorData();
      this.loadingData = false;
    });
  }

  getFormattedColors(colorData: ColorGroup[][]) {
    const currentDate = new Date();

    const formattedColors = colorData.map((colorGroupArray) => {
      return colorGroupArray.map((colorGroup) => {
        const formattedDate = this.getMonthsDifference(colorGroup._id,currentDate);
        return {
          name: colorGroup.name,
          code: colorGroup.code,
          formattedDate: formattedDate,
        };
      });
    });
    return formattedColors;
  }



  getMonthsDifference(objectId: string, currentDate: Date): string {
    const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;

    const inputDate = new Date(timestamp);

    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30.44;
    const monthsDifference = Math.floor(timeDifference / millisecondsInMonth);

    if (monthsDifference === 1) {
      return '1 month';
    } else {
      return `${monthsDifference} months`;
    }
  }

  loadColorData() {
    const start = this.colors.length;
    const end = start + this.pageSize;
    this.colors = [...this.colors, ...this.colorData.slice(start, end)];
    if (this.colors.length === this.colorData.length) {
      this.hideLoadButton = true;
    }
  }

  copyColorCode(colorCode: string): void {
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
