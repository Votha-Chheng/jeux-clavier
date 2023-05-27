import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'

interface MaskProps {
  imgSize: Dimensions;
  top: number;
  left: number;
  setNumberOfMasks: Dispatch<SetStateAction<number>>;
  success: boolean;
  colorMask: string;
}

const Mask: FC<MaskProps> = ({ imgSize, top, left, setNumberOfMasks, success, colorMask }) => {
  const [display, setDisplay] = useState<boolean>(true)

  const handleMouseEnter = ()=> {
    setDisplay(false)
    setNumberOfMasks(prev => prev - 1)
  }

  useEffect(()=> {
    if(success){
      setTimeout(()=> {
        setDisplay(true)
      }, 3000)
    }
  }, [success])

  return (
    <MaskStyle 
      style={{width:`${imgSize.width}px`, height: `${imgSize.height}px`, top:`${top}px`, left:`${left}px`, backgroundColor: `${display ? colorMask : "transparent"}`}}
      onMouseEnter={()=> display ? handleMouseEnter() : null}
    />
  )
}

const MaskStyle = styled.div`
  position:absolute;
  z-index: 2;
  opacity:0.97;
  transition: background-color 0.1s linear;
`

export default Mask