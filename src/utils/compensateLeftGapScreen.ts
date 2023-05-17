export const compensateLeftGapScreen = (x: number, widthDimension: number, divWidth: number=0): number => {
  const compensate = (widthDimension-950)/2
  return x-compensate-divWidth
}