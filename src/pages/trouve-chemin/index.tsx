import React, { FC, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { displayTrueBoolean } from '@/utils/displaySuccess';
import Bravo from '@/components/shared-UI/Bravo';
import LevelLayout from '@/components/trouve-chemin/LevelLayout';
import IconsFooter from '@/components/shared-UI/IconsFooter';
import Head from 'next/head';

const TrouveChemin: FC = () => {

  const [level, setLevel] = useState<number>(1)
  const [grabbed, setGrabbed] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [touched, setTouched] = useState<boolean>(false)
  const [end, setEnd] = useState<boolean>(false)

  useEffect(()=> {
    setEnd(false)
    setLevel(1)
  }, [])

  useEffect(()=> {
    setTouched(false)
  }, [level])

  useEffect(()=> {
    if(touched){
      displayTrueBoolean(setSuccess, true, 3000)
      setTimeout(()=> {
        setLevel(prev=> prev+1)
      }, 3000)
    }
  }, [touched])



  return (
    <ContainerStyle>
      <Head>
        <title>Trouve ton chemin avec la souris</title>
      </Head>
      {
        end 
        ?
        <div className="success">
          <Bravo message='Fin' />
          <IconsFooter reset={()=> null} />
        </div>
        :
        <div>
          <LevelLayout 
            grabbed={grabbed} 
            setGrabbed={setGrabbed} 
            title={ level > 6 ? "Apporte le muffin au Petit Chaperon Rouge" :"Apporte les ballons au bonhomme"} 
            success={success} 
            setSuccess={setSuccess} 
            setTouched={setTouched} 
            level={level} 
            setEnd={setEnd}
          />  
          {
            success &&
            <div className={`${success ? "success" : "no-success"}`}>
              <Bravo />
            </div>
          }
        </div>
      }
      
    </ContainerStyle>
  )
}

const blinkAnimation = keyframes`
  0% { opacity: 1 };
  20% { opacity: 1 };
  25% { opacity: 0 };
  30% { opacity: 1 };
  50% { opacity: 1 };
  55% { opacity: 0 };
  60% { opacity: 1 };
  80% { opacity: 1 };
  85% { opacity: 0 };
  90% { opacity: 1 };
`

const ContainerStyle = styled.main`
  width: 99vw;
  height: 100vh;
  position: relative;

  img, svg{
    position: absolute;
  }
  .no-success {
    display: none;
  }
  .success {
    padding-top: 10%;
    left: 50%;
    transform: translateX(-50%);
    animation: ${blinkAnimation} 3s ease-in;
    position: absolute;
  }
`

export default TrouveChemin