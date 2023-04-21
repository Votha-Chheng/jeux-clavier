import { RootState } from '@/store/store';
import { Roboto } from 'next/font/google';
import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

type PrenomInputProps = {
  success: boolean|undefined;
  lettersTapped: string[];
  wordSuccess: boolean;
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const PrenomInput: FC<PrenomInputProps> = ({success, lettersTapped, wordSuccess}) => {
  const { options  } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { uppercase } = options
  return (
    <InputDiv className={`${wordSuccess && "word-success"}`} style={wordSuccess || (success === true) ? {outline:"5px solid green"} : success === false ? {outline:"5px solid red"} : {}}>
    {
      lettersTapped.length>0 && lettersTapped.map((letter: string, index: number)=> (
        <span 
          className={`${roboto.className} letter` } 
          style={ {color:`${(wordSuccess || (success === true) && (index === lettersTapped.length-1)) ? "green": (success === false) && (index === lettersTapped.length-1) ? "red" : "black" }` }} 
          key={index}
        >
          {uppercase ? letter.toUpperCase(): letter}
        </span>
      ))
    }
    </InputDiv>
  )
}

const blinkAnimation = keyframes`
  0% { outline: 5px solid #21b52d };
  10% { outline: none };
  20% { outline: 5px solid #21b52d };
  30% { outline: none };
  40% { outline: 5px solid #21b52d };
  50% { outline: none };
  60% { outline: 5px solid #21b52d };
  70% { outline: none };
  80% { outline: 5px solid #21b52d };
  90% { outline: none };
  100% { outline: 5px solid #21b52d };
`

const InputDiv = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: flex-end;
  justify-content: center;
  width: 99%;
  background-color: white;
  height:90px;
  padding-bottom: 10px;

  &.word-success {
    animation: ${blinkAnimation} 2s linear;

  }

  .letter {
    font-size: 50px;
    font-weight: bold;
    letter-spacing:10px;
  }
  
`

export default PrenomInput