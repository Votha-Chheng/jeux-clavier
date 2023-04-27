import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components';
import { useMouseMove } from '../../../hooks/useMouseMove';
import useWindowDimensions from '../../../hooks/useWindowDimension';
import { PositionPiece } from '@/types/positionPiece';
import { lato } from '@/fonts/lato';

interface LetterTagProps{
  letter: string;
  position: PositionPiece;
  setIsGrabbing: Dispatch<SetStateAction<boolean>>;
  letterHovered: string;
  setLettersLeft: Dispatch<SetStateAction<string[]>>;
  lettersLeft: string[];
  nbLettresARanger: number;
  startAlphabet: string[]
}


const LetterTag: FC<LetterTagProps> = ({ letter, position, setIsGrabbing, letterHovered, setLettersLeft, lettersLeft, nbLettresARanger, startAlphabet }) => {
  const [grabbed, setGrabbed] = useState<boolean>(false)
  const [top, setTop] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)
  const [display, setDisplay] = useState<"flex"|"none">("flex")
  const { x, y } = useMouseMove()
  const { widthDimension } = useWindowDimensions()

  const compensateLeft = (x: number, widthDimension: number, divWidth: number=0): number => {
    const compensate = (widthDimension-950)/2
    return x-compensate-divWidth
  }

  const moveTag = ()=> {
    setTop(y-50)
    setLeft(compensateLeft(x, widthDimension, 35))
  }

  const onClickHandle = (letterGrabbed: string)=> {
    if(!grabbed){
      setGrabbed(true)
    } else {
      if(letterHovered === letterGrabbed){
        setDisplay("none")
        const temp = lettersLeft.filter((singleLetter: string)=> singleLetter !== letter)
        setLettersLeft(temp)
        
      } else {
        setTop(position.topPosition)
        setLeft(position.leftPosition)
      }
      setGrabbed(false)
    }
    setIsGrabbing(!grabbed)
    
  }

  useEffect(()=> {
    setDisplay("flex")
    setTop(position.topPosition)
    setLeft(position.leftPosition)

  }, [nbLettresARanger, startAlphabet])

  useEffect(() => {
    if(grabbed){
      moveTag()
    }

  }, [grabbed, y, x])
  

  return (
    <TagStyle 
      className={lato.className} 
      style={{
        transform: `${grabbed ?"scale(1.2)": "scale(1)"}`, 
        backgroundColor:`${grabbed ?"#e9ebec": "white"}`, 
        cursor: `${grabbed ? "grabbing":"grab"}`, 
        top: `${top}px`, left: `${left}px`,
        display
      }}
      onClick={()=> onClickHandle(letter)}
    >
      {letter.toUpperCase()}
    </TagStyle>
  )
}

const TagStyle = styled.div`
  border: 2.5px solid black;
  font-size: 45px;
  padding: 5px;
  width: 60px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  transition: transform 0.05s linear, background-color 0.05s linear;
  position: absolute;
  transform-origin: center;

  &:hover{
    cursor: grab;
  }
`
export default LetterTag