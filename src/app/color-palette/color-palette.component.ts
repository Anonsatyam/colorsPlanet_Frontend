import { Component, OnInit } from '@angular/core';
import { ColorPaletteService } from './color-palette.service';
import { ColorGroup } from './color-data.interface';
import { ClipboardService } from 'ngx-clipboard';
import { SharedService } from '../shared-services/shared.service';
import { Subscription, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import ObjectId from 'bson-objectid';
import { from, Observable, of } from 'rxjs';
import {
  map,
  mergeMap,
  toArray,
  takeUntil,
  catchError,
  finalize,
} from 'rxjs/operators';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css'],
})
export class ColorPaletteComponent implements OnInit {
  private subscription: Subscription;
  private readonly destroy$ = new Subject();

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
  pageSize = 0;
  hideLoadButton: boolean = false;
  hideLoadMoreButton: boolean = false;

  constructor(
    private service: ColorPaletteService,
    private clipboardService: ClipboardService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) {
    this.subscription = this.sharedService.dataFromSearch$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.dataFromSearch = data;
          if (this.dataFromSearch.trim() === '') {
            this.searchResults = [];
          } else {
            console.log(this.colors);

            this.searchResults = this.colors.filter(
              (colorGroup) =>
                colorGroup.name.toLowerCase() ===
                this.dataFromSearch.toLowerCase()
            );
          }
        },
        (error) => {
          this.snackBar.open(error.message, 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar'],
          });
        }
      );
  }

  ngOnInit() {
    this.fetchColorPalletes();
  }

  fetchColorPalletes() {
    this.pageSize = 48; // Initial page size
    this.loadingData = true;
    this.service
      .getData()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.snackBar.open(error.message, 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar'],
          });
          this.hideLoadMoreButton = true;
          return of(null);
        }),
        finalize(() => {
          this.loadingData = false;
        })
      )
      .subscribe(
        (data) => {
          if (data) {
            this.colorData = data[0]?.colorGroups;
            this.loadColorData();
          }
        },
        (error) => {
          this.hideLoadMoreButton = true;
        }
      );
  }

  chunkedData(colorData: ColorGroup[]) {
    const chunk = [];
    for (let index = 0; index < colorData.length; index += 4) {
      chunk.push(colorData.slice(index, index + 4));
    }
    console.log(chunk);
    return chunk;
  }

  getFormattedColors(colorData: ColorGroup[]) {
    return this.chunkedData(colorData);
  }

  loadColorData() {
    const start = this.colors.length;
    const end = start + this.pageSize;
    const remainingPalettes = this.colorData.length - this.colors.length;

    if (remainingPalettes > this.pageSize) {
      this.colors = [...this.colors, ...this.colorData.slice(start, end)];
    } else {
      this.colors = [...this.colors, ...this.colorData.slice(start)];
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
