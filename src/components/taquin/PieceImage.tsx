import { ImagePiece } from '@/types/imagePiece';
import { indexToPosition } from '@/utils/indexToPosition';
import Image from 'next/image';
import React, { FC } from 'react'
import styled from 'styled-components';

interface PieceImageProps {
  positionTemporaire: number;
  isEmpty?: boolean;
  positionImage: ImagePiece;
  handleClick: Function;
  isClickable: boolean;
  image: string
}

const PieceImage: FC<PieceImageProps> = ({positionTemporaire, isEmpty=false, positionImage, handleClick, isClickable, image}) => {
  return (
    <PieceImageDivStyle 
      onClick={()=> isClickable ? handleClick() : ()=>console.log("non-clickable")} 
      className={`${isEmpty ? " empty" : ""} ${isClickable ? " clickable" : ""}`} 
      style={{
        cursor: `${isClickable ? "pointer":"default"}`, 
        top:`${indexToPosition(positionTemporaire).topPosition}px`, 
        left:`${indexToPosition(positionTemporaire).leftPosition}px`,
      }}
    >
      {
        isEmpty 
        ? null 
        :<Image src={`/images/puzzles/${image}`} alt= "image sélectionnnée" width={450} height={450} style={{transform: `translate(${-positionImage.left}px, ${-positionImage.top}px`, transition:"all 0.5s ease-out"}}
        />
      }
    </PieceImageDivStyle>
  )
}

const PieceImageDivStyle = styled.div`
  border:2px solid black;
  position: absolute;
  overflow: hidden;
  z-index:3;
  height: 150px;
  width: 150px;
  transition: top 0.25s linear, left 0.25s linear, border 0.1s linear;
  transform-origin: top left;
  
  &.empty{
    background-color: black;
    z-index:2;
  } 

  &.clickable{
    &:hover {
      border: 4px solid green;
      filter : brightness(1.1);
    }
  }

`

export default PieceImage