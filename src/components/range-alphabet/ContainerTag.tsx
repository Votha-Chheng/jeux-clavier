import { PositionPiece } from '@/types/positionPiece';
import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components';
import { useMouseMove } from '../../../hooks/useMouseMove';
import useWindowDimensions from '../../../hooks/useWindowDimension';
import { lato } from '@/fonts/lato';

interface ContainerTagProps {
  letter: string;
  isGrabbing: boolean;
  position: PositionPiece;
  setLetterHovered: Dispatch<SetStateAction<string>>;
  lettersLeft: string[];
}

const ContainerTag: FC<ContainerTagProps> = ({letter, isGrabbing, position, setLetterHovered, lettersLeft}) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const [marked, setMarked] = useState<boolean>(false)

  const { widthDimension } = useWindowDimensions()
  const { x, y } = useMouseMove()

  //Ecart entre le côté gauche de l'écran et le bord du container du jeu
  const MARGIN_LEFT = (widthDimension-950)/2

  const isHovering = (position: PositionPiece, widthDiv: number, heightDiv: number, distanceWithin: number): void => {
    if(
      (x < (position.leftPosition + widthDiv + MARGIN_LEFT) + distanceWithin) && (x > (position.leftPosition + widthDiv + MARGIN_LEFT) - distanceWithin)
      &&
      (y < (position.topPosition + heightDiv) + distanceWithin) && (y > (position.topPosition + heightDiv) - distanceWithin)  
    ){
      if(isGrabbing){
        setHovered(true) 
      } 
    } else {
      setHovered(false)  
    }
  }

  useEffect(() => {
    isHovering(position, 35, 42.5, 35)
  
  }, [x, y])

  useEffect(() => {
    if(hovered){
      setLetterHovered(letter)
    } else {
      setLetterHovered("")
    }
  
  }, [hovered])

  useEffect(()=> {
    if(!lettersLeft.includes(letter)){
      setMarked(false)
    } else {
      setMarked(true)
    }
  }, [lettersLeft])
  

  return (
    <ContainerTagStyle style={{top: `${position.topPosition}px`, left:`${position.leftPosition}px`, transform:`scale(${hovered ?"1.05":"1"})`, border: `${!marked ? "4px solid green" :" 4px solid black"}`}}>
      {
        marked 
        ? <div className='masque' style={{backgroundColor: `${hovered ?"grey" : "white"}`}}/>
        : <div className={lato.className + ' letter'}>{letter.toUpperCase()}</div>
      }
    </ContainerTagStyle>
  )
}

const ContainerTagStyle = styled.div`
  width: 70px;
  height: 85px;
  background-color: white;
  border-radius: 7.5px;
  transition: transform 0.1s linear, background-color 0.05s linear;
  position: absolute;
  transform-origin: center;

  .masque{
    width: 100%;
    height:100%;
    transition: background-color 0.05s linear;
  }
  .letter{
    width: 100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 45px;
    font-weight: bold;
    color: green;
  }
`

export default ContainerTag