import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const LoadingScreen: FC = () => {
  const [ mounted, setMounted] = useState<boolean>(false)

  useEffect(()=> setMounted(true), [])

  if(!mounted) return null;

  return (
    <LoadingStyle>
      <Image src="/images/loading.svg" alt="Chargement en cours..." width={50} height={50} priority />
    </LoadingStyle>
  )
}

const rotation = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const LoadingStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    animation: ${rotation} 1.5s linear infinite;

  }

`

export default LoadingScreen