import { RootState } from '@/store/store';
import Image from 'next/image';
import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'


type OptionsPanelProps = {
  children: JSX.Element;
  onClickHandler: Function;
}

const OptionsPanel: FC<OptionsPanelProps> = ({children, onClickHandler}) => {
  const { showUp } = useSelector((state: RootState)=> state.optionsPanel)

  return (
    <OptionsSection className={`${showUp ? "down": "up"}`}>
      {children}
      <div onClick={()=>onClickHandler()} className='preferences' style={!showUp ? {transform: "translateY(75px)"}: {transform: "translateY(0)"}}>
        <Image src={`/images/${showUp ? "check" : "options"}.svg`} alt="Paramètre du jeu" width={50} height={50} />
      </div>
    </OptionsSection>
  )
}

const OptionsSection = styled.section`
  height: 100vh;
  margin: 0px auto;
  width: 950px;
  position: fixed;
  left: calc((100% - 950px)/2);
  z-index: 5;
  border: 5px solid black;
  background-color: #d6d6d6;
  transition: transform 0.75s ease-in;
  border-radius: 10px;

  &.up {
    transform: translateY(-100vh);
  }
  &.down {
    transform: translateY(0);
  }

  .preferences{
    position: absolute;
    bottom: 0px;
    left: calc(50% - 50px/2);
    z-index:6;
    transition: transform 0.25s linear;
    cursor: pointer;
  }
`

export default OptionsPanel;