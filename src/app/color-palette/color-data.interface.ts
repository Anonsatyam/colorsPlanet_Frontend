// color-data.interface.ts

export interface ColorGroup {
    name: string;
    code: string;
    _id: string
  }
  
  export interface ColorData {
    colorGroups: ColorGroup[][];
  }
  