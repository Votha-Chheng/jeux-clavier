import { roboto } from '@/fonts/roboto'
import React, { FC } from 'react'
import styled from 'styled-components';

interface NextButtonProps {
  goToNextLevel: Function;
  message?: string;
}

const NextButton: FC<NextButtonProps> = ({ goToNextLevel, message = "Puzzle suivant" }) => {
  return (
    <NextButtonStyle className={roboto.className} onClick={()=> goToNextLevel()}>
      {message} &rsaquo;&rsaquo;
    </NextButtonStyle>
  )
}

const NextButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  font-size: 50px;
  color: green;
  margin-top: 20px;
  font-weight: bold;
  border: 3px solid green;
  width: 400px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  margin: 0 auto;
  
`

export default NextButton