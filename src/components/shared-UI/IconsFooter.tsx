import React, { FC } from 'react'
import BackToMenu from './BackToMenu'
import Restart from './Restart';
import styled from 'styled-components';

type IconsFooterProps = {
  end: boolean;
  reset: Function;
}

const IconsFooter: FC<IconsFooterProps> = ({end, reset}) => {
  return (
    <IconsContainer className='back-to-menu'>
      <BackToMenu/>
      <Restart reset={reset}/>
    </IconsContainer>
  )
}

const IconsContainer = styled.div`
  margin : 75px 0 0;
  display:flex;
  justify-content: space-between;
  
`
export default IconsFooter