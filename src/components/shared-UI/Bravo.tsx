import React, { FC } from 'react'
import styled from 'styled-components'

interface BravoProps{
  marginTop?: string;
  fontSize?: string
}

const Bravo: FC<BravoProps> = ({marginTop = "75px", fontSize =" 250px"}) => {
  return (
    <H1 style={{marginTop}}>
      Bravo
    </H1>
  )
}

const H1 = styled.h1`
  font-size: 150px;
  text-align: center;
  margin-top: 75px;
  color: green;
    
`

export default Bravo