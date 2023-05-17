import { PositionPiece } from "@/types/positionPiece";

//Centre la dernière ligne de lettres
const findPositionOfLettersLine = (widthDimension: number, length: number, divWidth: number): number=> {
  return (widthDimension/2)-(length*divWidth)/2
}

export const positionTags = (heightDimension: number, widthDimension:number, ratioHeight: number = 1.5, heightGap: number= 90, tableauLettres: any[], divWidth: number):PositionPiece[] => {
  let positionArray: PositionPiece[] = []

  if(tableauLettres.length<10){
    for(let i=0; i<tableauLettres.length; i++){
      const position: PositionPiece = { topPosition: heightDimension/ratioHeight, leftPosition:(i*divWidth) + findPositionOfLettersLine(widthDimension, tableauLettres.length, divWidth)}
      positionArray.push(position)
    }
  } else if(tableauLettres.length>=10 && tableauLettres.length<20) {
    for(let i=0; i<10; i++){
      const position: PositionPiece = { topPosition: heightDimension/ratioHeight, leftPosition:(i*divWidth) + ((widthDimension/2)-440)  }
      positionArray.push(position)
    }
    for(let i=10; i<tableauLettres.length; i++){
      const position: PositionPiece = { topPosition: ((heightDimension/ratioHeight) + heightGap), leftPosition: ((i-10)*divWidth) + findPositionOfLettersLine(widthDimension, tableauLettres.length-10, divWidth)}
      positionArray.push(position)
    }
  } else {
    for(let i=0; i<10; i++){
      const position: PositionPiece = { topPosition: heightDimension/ratioHeight, leftPosition:(i*divWidth) + ((widthDimension/2)-440)  }
      positionArray.push(position)
    }
    for(let i=10; i<20; i++){
      const position: PositionPiece = { topPosition: ((heightDimension/ratioHeight) + heightGap), leftPosition: ((i-10)*divWidth) + ((widthDimension/2)-440) }
      positionArray.push(position)
    }
    for(let i=20; i<tableauLettres.length; i++){
      const position: PositionPiece = { topPosition: ((heightDimension/ratioHeight) + heightGap*2), leftPosition: ((i-20)*divWidth) + findPositionOfLettersLine(widthDimension, tableauLettres.length-20, divWidth)}
      positionArray.push(position)
    }
  }
  return positionArray
}
  