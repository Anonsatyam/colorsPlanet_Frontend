import { Component, OnInit } from '@angular/core';
import { ColorPaletteService } from './color-palette.service';
import { ColorGroup } from './color-data.interface';
import { ClipboardService } from 'ngx-clipboard';
import { SharedService } from '../shared-services/shared.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  objects: Array<any> = [];
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
        this.searchResults = this.colors.filter((colorGroup) =>
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

	openSnackBar(message: string) {

    this.snackBar.open(message, "Ok", {
     duration: 30000,
     verticalPosition: 'top',
     horizontalPosition: 'center',
     panelClass: ['green-snackbar', 'login-snackbar'],
   });
}

  ngOnInit() {
    this.fetchColorPalletes();
  }

  fetchColorPalletes() {
    this.loadingData = true;
    this.service.getData().subscribe((data) => {
      this.colorData = data[0].colorGroups;
      this.loadColorData();
      this.loadingData = false;
    });
  }

  loadColorData() {
    const start = this.colors.length;
    const end = start + this.pageSize;
    this.colors = [...this.colors, ...this.colorData.slice(start, end)];
    if (this.colors.length === this.colorData.length) {
      this.hideLoadButton = true;
    }
    
  }

  deleteGroup(group: Array<{ _id: any }>) {
    // this.loadingData = true;

    // const idsToDelete = group.map((element) => element._id);

    // this.sharedService.deleteColorById(idsToDelete).subscribe(
    //   (data:any) => {
    //     this.loadingData = false;
    //     this.openSnackBar("Deleted SuccessFully",'Close','red-snackbar');
    //     const dataAfterDelete  = [...data.updatedData[0].colorGroups];
    //     this.colors = dataAfterDelete.slice(0, this.pageSize)
    //   },
    //   (error) => {
    //     this.openSnackBar(error.error.message,'Close','red-snackbar');
    //   }
    // );
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
