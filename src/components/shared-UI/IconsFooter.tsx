import React, { FC } from 'react'
import BackToMenu from './BackToMenu'
import Restart from './Restart';
import styled from 'styled-components';

type IconsFooterProps = {
  end?: boolean;
  reset: Function;
  marginTop?: string;
}

const IconsFooter: FC<IconsFooterProps> = ({end, reset, marginTop="75px"}) => {
  return (
    <IconsContainer className='back-to-menu' style={{marginTop}} >
      <BackToMenu/>
      <Restart reset={reset}/>
    </IconsContainer>
  )
}

const IconsContainer = styled.div`
  display:flex;
  justify-content: space-between;
  
`
export default IconsFooter