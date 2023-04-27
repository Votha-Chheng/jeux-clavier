import CardMenuGame from '@/components/home/CardMenuGame'
import GameContainerLayout from '@/components/layouts/GameContainerLayout';
import { poppins } from '@/fonts/poppins';
import Head from 'next/head'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true) }, []);  // avoid hydration issues - run on client
  if (!mounted) return null
  
  return (
    <>
      <Head>
        <title>Jeux pour clavier et souris</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameContainerLayout>
        <HomeScreenContainer>
          <h1 className={poppins.className}>Jeux d&apos;écriture</h1>
          <div className='card-container'>
            <CardMenuGame title='Jeu du taquin' link="taquin"/>
            <CardMenuGame title='Range l&apos;alphabet' link="range-alphabet"/>
            <CardMenuGame title='Trouve la lettre' link="trouve-la-lettre"/>
            <CardMenuGame title='	&Eacute;cris des mots' link="ecris-le-mot"/>
          </div>
        </HomeScreenContainer>
      </GameContainerLayout>
    </>
  )
}

const HomeScreenContainer = styled.main`
  width: 100%;
  height: 100vh;
  padding: 15px;

  h1 {
    text-align: center;
    margin : 20px auto;
    font-weight: bold;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

`
