import { Rubik } from 'next/font/google';
import React, { FC } from 'react'
import styled from 'styled-components';

type PrenomsListeProps = {
  fullList: string[];
  listePrenomsEcrits: string[]
}

const rubik = Rubik({
  weight: '400',
  subsets: ['latin'],
})

const PrenomsListe: FC<PrenomsListeProps> = ({fullList, listePrenomsEcrits}) => {
  return (
    <SectionStyle>
    {
      fullList.map((prenom: string)=> (
        <div key={prenom} className={`${rubik.className} prenom`} style={listePrenomsEcrits.includes(prenom) ? {color: "green", fontWeight:"bold", transform: 'scale(1.25)'}: {color: "#f5f5f5"}}>
          {prenom.toUpperCase()}
        </div>
      ))
    }
    </SectionStyle>
  )
}

const SectionStyle = styled.section`
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 65px;
  justify-content: center;
  margin: 0 auto;
  padding-top: 100px;

  .prenom {
    font-size: 20px;
    letter-spacing:2px;
    transition: all 0.25s linear;
  }
`

export default PrenomsListe