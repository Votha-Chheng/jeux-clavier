import { PositionPiece } from '@/types/positionPiece'
import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Bravo from '../shared-UI/Bravo';
import NextButton from '../shared-UI/NextButton';

interface PiecesZoneProps {
  setPiecesZonePosition: Dispatch<SetStateAction<PositionPiece>>;
  end: boolean;
  nextLevel: boolean;
  goToNextLevel: Function;
}

const PiecesZone: FC<PiecesZoneProps> = ({ setPiecesZonePosition, end, nextLevel, goToNextLevel }) => {

  const pieceZoneRef = useRef<HTMLDivElement>(null)

  useEffect(()=> {
    if(pieceZoneRef.current){
      setPiecesZonePosition({
        topPosition: pieceZoneRef.current.offsetTop,
        leftPosition: pieceZoneRef.current.offsetLeft
      })
    }
    
  }, [])

  return (
    <PiecesZoneStyle ref={pieceZoneRef}>
      {end ? <Bravo marginTop='0'/> : null}
      {nextLevel ? <NextButton goToNextLevel={goToNextLevel} /> : null}
    </PiecesZoneStyle>
  )
}
const PiecesZoneStyle = styled.section`
  width: 950px;
  height: 265px;
  background-color: grey;
`
export default PiecesZone