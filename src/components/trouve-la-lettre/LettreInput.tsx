import { Roboto } from 'next/font/google';
import React, { FC } from 'react'
import styled from 'styled-components'

type LettreInputProps = {
  letterInput: string;
  success: boolean|undefined;
  typeLettres: "capitale"|"minuscule";
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const LettreInput: FC<LettreInputProps> = ({letterInput, success, typeLettres}) => {
  return (
    <InputStyle className={roboto.className} style={success == true ? {color: "green", outline: "5px solid green"}: success === false ? {color: "red", outline: "5px solid red"} : {color: "black", outline: "5px solid black"}}>
      {typeLettres === "capitale" ? letterInput.toUpperCase() : letterInput.toLocaleLowerCase()}
    </InputStyle>
  )
}

const InputStyle = styled.div`
  font-size: 150px;
  height: 180px;
  width: 250px;
  text-align: center;
  color: #313638;
  border-radius: 10px;
  margin: 10px auto 20px;
  outline:0;
  background-color: white;
  padding-bottom:20px;
      
`

export default LettreInput