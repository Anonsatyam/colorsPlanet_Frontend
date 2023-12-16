import { Component, OnInit } from '@angular/core';
import { SolidColorService } from './solid-color.service';
import { SolidColorData, SolidColor } from './solid-color';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { SharedService } from '../shared-services/shared.service';
import { Subscription } from 'rxjs';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-solid-color',
  templateUrl: './solid-color.component.html',
  styleUrls: ['./solid-color.component.css'],
})
export class SolidColorComponent {
  colorsData: any[] = [];
  searchResults: KeyValue<string, any>[];
  colors: any[] = [];
  dataFromSearch: any = '';
  loadingData: boolean;
  private subscription: Subscription;
  pageSize = 16;
  objects: Array<any> = [];
  hideLoadButton: boolean = false;

  randomMessages = [
    'Hey Nice Choice',
    'Looks Amazing',
    'Fall In Love With This Color',
    'Pretty Good Choice',
  ];

  constructor(
    private service: SolidColorService,
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {
    this.subscription = this.sharedService.dataFromSearch$.subscribe((data) => {
      this.dataFromSearch = data;
      if (this.dataFromSearch.trim() === '') {
        this.searchResults = [];
      } else {
        this.searchResults = this.colorsData
          .filter((obj) =>
            obj.name.toLowerCase().includes(this.dataFromSearch.toLowerCase())
          )
          .map((color) => ({ key: color.name, value: color.code }));
      }
    });
  }

  ngOnInit(): void {
    this.fetchSolidColors()
  }

  fetchSolidColors() {
    this.loadingData = true;
    this.service.getSolidColorData().subscribe((data) => {
      this.colorsData = data[0].solidColors;
      this.loadColorData();
      this.loadingData = false;
    });
  }

  loadColorData() {
    const start = this.colors.length;
    const end = start + this.pageSize;
    this.colors = [...this.colors, ...this.colorsData.slice(start, end)];
    if (this.colors.length === this.colorsData.length) {
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
