import { PositionPiece } from '@/types/positionPiece';
import Image from 'next/image';
import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import styled from 'styled-components'

interface JigsawPuzzleFrameProps {
  nbPieces: number;
  image: string;
  setFramePosition: Dispatch<SetStateAction<PositionPiece>>;
}

const JigsawPuzzleFrame: FC<JigsawPuzzleFrameProps> = ({ nbPieces, image, setFramePosition }) => {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(()=> {
    if(frameRef.current){
      setFramePosition({topPosition: frameRef.current.offsetTop, leftPosition:  frameRef.current.offsetLeft})
    }
  }, [])

  return (
    <JigsawPuzzleFrameStyle ref={frameRef}>
      <Image src={`/images/jigsaw/${image}`} width={500} alt={image} height={500} priority />
    </JigsawPuzzleFrameStyle>
  )
}

const JigsawPuzzleFrameStyle = styled.div`
  margin: 15px auto;
  outline: 2px solid black;
  overflow: hidden;
  width: 500px;
  height:500px;

  img{
    opacity: 0.5;
    filter: grayscale(0.75) brightness(140%);
  }
`

export default JigsawPuzzleFrame