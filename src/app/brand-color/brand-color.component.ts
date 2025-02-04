import { Component, OnInit } from '@angular/core';
import { BrandColorService } from './brand-color.service';
import { BrandColorPalette, BrandColor } from './brand-color';
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
  brandColorPalettes: BrandColorPalette[] = [];
  brandColors: BrandColor[] = [];

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
  pageSize = 12;

  hideLoadButton: boolean = false;
  hideLoadMoreButton: boolean = false;
  loadingData: boolean;
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
          this.dataFromSearch = data.trim().toLowerCase();
          if (this.dataFromSearch === '') {
            this.searchResults = [];
          } else {
            this.searchResults = this.brandColors.filter((brand) =>
              brand.name.toLowerCase().includes(this.dataFromSearch)
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
    console.log(this.brandColorPalettes.length);
    
  }

  getBrandColors() {
    this.loadingData = true;
    this.brandService
      .getbrandColorData()
      .subscribe((data: BrandColorPalette[]) => {
        console.log('API Response:', data);

        if (data.length > 0) {
          this.brandColorPalettes = data;
          this.brandColors = data.flatMap((item) => item.brandColors);
        } else {
          this.brandColorPalettes = [];
          this.brandColors = [];
        }
        this.loadColorData();
        this.loadingData = false;
      });
  }

  loadColorData() {
    const start = this.colors.length;
    const end = start + this.pageSize;
    this.colors = [...this.colors, ...this.brandColors.slice(start, end)];
    if (this.colors.length === this.brandColors.length) {
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
