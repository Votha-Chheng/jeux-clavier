import React, { FC } from 'react'
import styled from 'styled-components'

interface GameContainerLayoutProps {
  children: JSX.Element;
  borderLeft?: string;
  borderRight?: string;
}

const GameContainerLayout: FC<GameContainerLayoutProps> = ({children, borderLeft, borderRight}) => {
  return (
    <GameContainerLayoutStyle style={{borderLeft, borderRight}}>
      {children}
    </GameContainerLayoutStyle>
  )
}

const GameContainerLayoutStyle = styled.main`
  width: 950px;
  min-height: 100vh;
  margin: 0 auto; 
  overflow: hidden;
`
export default GameContainerLayout