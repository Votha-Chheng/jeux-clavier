import React, { FC } from 'react'
import styled from 'styled-components'

interface BravoProps{
  message?: string;
  marginTop?: string;
  fontSize?: string;
}

const Bravo: FC<BravoProps> = ({message="Bravo", marginTop = "75px", fontSize ="150px"}) => {
  return (
    <H1 style={{marginTop, fontSize}}>
      {message}
    </H1>
  )
}

const H1 = styled.h1`
  text-align: center;
  margin-top: 75px;
  color: green;
    
`

export default Bravo