import Image from 'next/image'
import React, { CSSProperties, FC } from 'react'
import styled from 'styled-components'

type RestartProps = {
  reset: Function;
  style: CSSProperties;
}

const Restart: FC<RestartProps> = ({reset, style}) => {
  return (
    <RestartButton style={style} onClick={()=> reset()}>
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