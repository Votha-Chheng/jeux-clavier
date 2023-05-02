import Image from 'next/image';
import React, { FC } from 'react'
import styled from 'styled-components'

interface JigsawPuzzleFrameProps {
  nbPieces: number;
  image: string;
}

const JigsawPuzzleFrame: FC<JigsawPuzzleFrameProps> = ({ nbPieces, image }) => {
  return (
    <JigsawPuzzleFrameStyle style={nbPieces === 9 ? {width: "450px", height: "450px" }:{}}>
      <Image src={`/images/${image}`} width={nbPieces === 9 ? 450 : 0} alt={image} height={nbPieces === 9 ? 450 : 0} />
    </JigsawPuzzleFrameStyle>
  )
}

const JigsawPuzzleFrameStyle = styled.div`
  margin: 15px auto;
  outline: 2px solid black;

  img{
    opacity: 0.35;
    filter: grayscale(0.9);
  }
`

export default JigsawPuzzleFrame