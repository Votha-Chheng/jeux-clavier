import { Roboto } from 'next/font/google'
import React, { FC } from 'react'
import styled from 'styled-components'

type RadioInputProps = {
  checkingFunction: boolean;
  handleClick: Function;
  id: string;
  value: string|number;
  disabled ? : boolean;
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

const RadioInput: FC<RadioInputProps> = ({checkingFunction, handleClick, id, value, disabled=false}) => {

  return (
    <RadioStyle className={roboto.className}>
      <input readOnly type="radio" id={id} onClick={()=> handleClick()} value={value} checked={checkingFunction} disabled={disabled}/>
      <label htmlFor={id} style={{color: `${disabled ? "#f5f5f5":"black"}`}}>{value}</label>
    </RadioStyle>
  )
}

const RadioStyle = styled.div`
  margin: 10px;

  label {
    margin-left: 10px;
  }
    
`

export default RadioInput