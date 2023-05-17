export interface SvgData {
  index: number;
  path: string; 
  viewBox: string;
  positionOnFrame : {
    x: number,
    y: number
  },
  translateImage?: {
    translateX: number;
    translateY: number;
  }
}