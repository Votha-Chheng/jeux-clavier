import CardMenuGame from '@/components/home/CardMenuGame'
import GameContainerLayout from '@/components/layouts/GameContainerLayout';
import { poppins } from '@/fonts/poppins';
import { rubik } from '@/fonts/rubik';
import Head from 'next/head'
import Link from 'next/link';
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
        <meta name="Jeux pour clavier et souris" content="Jeux pour clavier et souris" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameContainerLayout>
        <HomeScreenContainer>
          <h1 className={poppins.className}>Jeux pour clavier et souris</h1>
          <h1 className={`${rubik.className} subtitle`}>Bouger la souris</h1>
          <div className='card-container'>
            <CardMenuGame title='Nettoyer l&apos;image' link="nettoyage"/>
            <CardMenuGame title='Trouve le chemin' link="trouve-chemin"/>
          </div>
          <h1 className={`${rubik.className} subtitle`}>Cliquer avec la souris</h1>
          <div className='card-container'>
            <CardMenuGame title='Puzzle switch' link="puzzle-switch"/>
            <CardMenuGame title='Puzzle' link="classic-puzzle"/>
            {/* <CardMenuGame title='Jeu du taquin' link="taquin"/> */}
            <CardMenuGame title='Range l&apos;alphabet' link="range-alphabet"/>
            <CardMenuGame title='Memory' link="memory"/>
          </div>
          <h1 className={`${rubik.className} subtitle`}>Utiliser le clavier</h1>
          <div className='card-container'>
            <CardMenuGame title='Trouve la lettre' link="trouve-la-lettre"/>
            <CardMenuGame title='&Eacute;cris des mots' link="ecris-le-mot"/>
          </div>
          <div className='contact'>
            <Link href="/faire-un-don" className={rubik.className} >
              Faire un don & contact
            </Link>
          </div>
        </HomeScreenContainer>
      </GameContainerLayout>
    </>
  )
}

const HomeScreenContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 15px;

  h1 {
    text-align: center;
    margin : 10px auto 20px;
    font-weight: bold;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .subtitle {
    font-size: 25px;
    text-align: left;
    margin-top: 50px;
  }

  .contact{
    margin: 40px auto 0;
    padding: 7.5px;
    border: 2px solid #53599a;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    color: #53599a;
    font-weight: bold;
  }

`
