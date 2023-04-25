import { Roboto } from 'next/font/google'
import React, { FC } from 'react'
import styled from 'styled-components'

type RadioInputProps = {
  isChecked: boolean;
  handleClick: Function;
  id: string;
  value: any;
  disabled ? : boolean;
  width?: string;
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

const RadioInput: FC<RadioInputProps> = ({isChecked, handleClick, id, value, disabled=false, width="100%"}) => {

  return (
    <RadioStyle className={roboto.className} style={{width}}>
      <input readOnly type="radio" id={id} onClick={()=> handleClick()} value={value} checked={isChecked} disabled={disabled}/>
      <label htmlFor={id} style={{color: `${disabled ? "#f5f5f5":"black"}`}}>{value}</label>
    </RadioStyle>
  )
}

const RadioStyle = styled.div`
  margin: 10px;
  display: flex;

  label {
    margin-left: 10px;
    align-self: center;
  }
    
`

export default RadioInput