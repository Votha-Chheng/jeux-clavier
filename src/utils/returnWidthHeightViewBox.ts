export const returnWidthHeightViewBox = (viewBox: string): Dimensions=> {
  const array = viewBox.split(" ")

  return { width : +array[2], height: +array[3]}
}