import React, { CSSProperties, FC } from 'react'
import BackToMenu from './BackToMenu'
import Restart from './Restart';
import styled from 'styled-components';

type IconsFooterProps = {
  end?: boolean;
  reset: Function;
  marginTop?: string;
  width?:string;
  style?: CSSProperties
}

const IconsFooter: FC<IconsFooterProps> = ({reset, marginTop="75px", width, style}) => {
  return (
    <IconsContainer className='back-to-menu' style={{marginTop, width}} >
      <BackToMenu/>
      <Restart reset={reset} style={style ?? {}}/>
    </IconsContainer>
  )
}

const IconsContainer = styled.div`
  display:flex;
  justify-content: space-between;
  
`
export default IconsFooter