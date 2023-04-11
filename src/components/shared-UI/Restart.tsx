import Image from 'next/image'
import React, { FC } from 'react'
import styled from 'styled-components'

type RestartProps = {
  reset: Function
}

const Restart: FC<RestartProps> = ({reset}) => {
  return (
    <RestartButton onClick={()=> reset()}>
      <Image src='/images/refresh.svg' alt='Recommencer' width={50} height={50}/>
    </RestartButton>
  )
}

const RestartButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`

export default Restart