// color-data.interface.ts

export interface ColorGroup {
    name: string;
    code: string;
  }
  
  export interface ColorData {
    colorGroups: ColorGroup[][];
  }
  