export interface JigsawPiece {
  position: number;
  path: string;
  viewBox: string;
  dimension: {
    width: string, 
    height: string
  };
  positionOnFrame: {
    x: number,
    y: number
  },
  translateImage?: {
    translateX: number|null;
    translateY: number|null;
  }
}