import { Component, OnInit } from '@angular/core';
import { GradientColorService } from './gradient-color.service';

@Component({
  selector: 'app-gradient-color',
  templateUrl: './gradient-color.component.html',
  styleUrls: ['./gradient-color.component.css'],
})
export class GradientColorComponent {
  gradientColorsData: any[] = [];
  loadingData: boolean;

  constructor(private service: GradientColorService) {}

  ngOnInit(): void {
    this.fetchGradientColors();
  }

  fetchGradientColors() {
    this.loadingData = true;
    this.service.getgradientColorData().subscribe((data) => {
      this.gradientColorsData = data[0].gradientColor;
      this.loadingData = false;
    });
  }
}
