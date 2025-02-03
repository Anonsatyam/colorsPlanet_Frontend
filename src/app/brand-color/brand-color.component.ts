import { Component, OnInit } from '@angular/core';
import { BrandColorService } from './brand-color.service';
import { BrandColorPalette } from './brand-color';
import { SharedService } from '../shared-services/shared.service';
import { Subscription, Subject, of } from 'rxjs';
import { takeUntil, catchError, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-brand-color',
  templateUrl: './brand-color.component.html',
  styleUrls: ['./brand-color.component.css'],
})
export class BrandColorComponent implements OnInit {
  private subscription: Subscription;
  private readonly destroy$ = new Subject();

  colors: any[] = [];
  colorData: any[] = [];
  searchResults: any[] = [];
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
  loadingData: boolean;
  brandColors: BrandColorPalette[] = [];
  constructor(
    private brandService: BrandColorService,
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
            this.searchResults = this.colors.filter(
              (color) =>
                color.name.toLowerCase() === this.dataFromSearch.toLowerCase()
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

  ngOnInit(): void {
    this.getBrandColors();
  }

  getBrandColors() {
    this.loadingData = true;
    this.brandService.getbrandColorData().subscribe((data) => {
      this.brandColors = data;
      console.log(this.brandColors);
    });
    this.loadingData = false
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
