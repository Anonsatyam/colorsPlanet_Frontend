export interface BrandColor {
  name: string;
  colors: string[]; // Array of color codes
}

export interface BrandColorPalette {
  _id: string;
  brandColors: BrandColor[]; // Array of BrandColor
  __v: number;
}
