import Bravo from '@/components/shared-UI/Bravo';
import IconsFooter from '@/components/shared-UI/IconsFooter';
import OptionsPanel from '@/components/shared-UI/OptionsPanel';
import CasseTete from '@/components/taquin/CasseTete';
import Options from '@/components/taquin/options/Options';
import { setShowUp } from '@/store/slices/optionsPanelSlice';
import { RootState } from '@/store/store';
import { dealSetterArray } from '@/utils/dealSetterArray';
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers';
import { shuffleArrayPiece } from '@/utils/shuffleArrayPiece';
import { returnNewOrder, shuffleTaquin } from '@/utils/shuffleTaquin';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

const Taquin: FC = () => {
  const [end, setEnd] = useState<boolean>(false)
  const [start, setStart] = useState<boolean>(false)
  const [image, setImage] = useState<string>("taquin-1.png")
  const [mounted, setMounted] = useState<boolean>(false)
  const [positionTemporaireElement0, setPositionTemporaireElement0] = useState<number>(0)
  const [positionTemporaireElement1, setPositionTemporaireElement1] = useState<number>(0)
  const [positionTemporaireElement2, setPositionTemporaireElement2] = useState<number>(0)
  const [positionTemporaireElement3, setPositionTemporaireElement3] = useState<number>(0)
  const [positionTemporaireElement4, setPositionTemporaireElement4] = useState<number>(0)
  const [positionTemporaireElement5, setPositionTemporaireElement5] = useState<number>(0)
  const [positionTemporaireElement6, setPositionTemporaireElement6] = useState<number>(0)
  const [positionTemporaireElement7, setPositionTemporaireElement7] = useState<number>(0)
  const [positionTemporaireElement8, setPositionTemporaireElement8] = useState<number>(0)
  const [dealAtStart, setDealAtStart] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8])

  const { showUp } = useSelector((state: RootState)=> state.optionsPanel)

  const ARRAY_SETTER = [
    setPositionTemporaireElement0,
    setPositionTemporaireElement1,
    setPositionTemporaireElement2, 
    setPositionTemporaireElement3,
    setPositionTemporaireElement4,
    setPositionTemporaireElement5,
    setPositionTemporaireElement6,
    setPositionTemporaireElement7,
    setPositionTemporaireElement8
  ]
  const ARRAY_STATES = [
    positionTemporaireElement0,
    positionTemporaireElement1,
    positionTemporaireElement2, 
    positionTemporaireElement3,
    positionTemporaireElement4,
    positionTemporaireElement5,
    positionTemporaireElement6,
    positionTemporaireElement7,
    positionTemporaireElement8
  ]

  const dispatch = useDispatch()

  useEffect(() => { setMounted(true) }, []);  // avoid hydration issues - run on client

  const resetTaquin = ()=> {
    setEnd(false)
    setStart(false)
    dealSetterArray(ARRAY_SETTER, getArrayOfNumbers(9))

    setTimeout(()=> {
      dealSetterArray(ARRAY_SETTER, dealAtStart)
    }, 2000)
  }

  useEffect(()=> {
    const newShuffle = returnNewOrder(dealAtStart, 6)
    setDealAtStart(newShuffle)
  }, [])

  console.log(dealAtStart)

  useEffect(() => {
    setEnd(false)
    setStart(false)
    dealSetterArray(ARRAY_SETTER, getArrayOfNumbers(9))
    
    //La position temporaitre de l'élément 6 indique la position de la case vide

    setTimeout(()=> {
  
      dealSetterArray(ARRAY_SETTER, dealAtStart)
  
      //setStart(true)
    }, 2000)

  }, [dealAtStart])

  
  if (!mounted) return null

  return (
    <TaquinMainStyle>
      <OptionsPanel onClickHandler={()=> dispatch(setShowUp(!showUp))}>
        <Options image={image} setImage={setImage} />
      </OptionsPanel>
      <div className='taquin-container'>
        {
          end
          ? 
          <Bravo/>
          :
          <section className='img-container'>
            <div className='cache'/>
            <div className='vertical one' />
            <div className='vertical two' />
            <div className='horizontal one' />
            <div className='horizontal two' />
            <Image src={`/images/puzzles/mini-${image}`} alt="Image sélectionnée" width={240} height={240} placeholder="blur" blurDataURL='/images/puzzles/taquin-1-mini.png' />
          </section>
        }
        
        <div className='casse-tete-container'>
          <CasseTete image={image} setEnd={setEnd} start={start} end={end} arrayOfSetter={ARRAY_SETTER} arrayOfStates={ARRAY_STATES} />
        </div>
      </div>
      <IconsFooter end={false} reset={()=>resetTaquin()} marginTop='30px' />
    </TaquinMainStyle>
  )
}

const TaquinMainStyle = styled.main`
  width: 950px;
  min-height: 100vh;
  margin: 0 auto;

  .taquin-container{
    padding-top: 75px;
  }

  .img-container{
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    
    img{
      border:1px solid black;
    }

    .cache{
      position: absolute;
      width: 80px;
      height: 80px;
      background-color: black;
      bottom:0;
      left:355px;
    }
    .vertical{
      height: 240px;
      width: 1.25px;
      background-color: black;
      position: absolute;
      top:0;

      &.one{
        left: calc(355px + 80px);
      }
      &.two{
        left: calc(355px + 160px);
      }
    }
    .horizontal{
      width: 240px;
      height: 1px;
      background-color: black;
      position: absolute;
      left: 355px;

      &.one{
        top: 80px;
      }
      &.two{
        top: 160px;
      }
    }
  }
  .casse-tete-container{
    width: 950px;
    min-height: 450px;
    display: flex;
    justify-content: center;
  }
`
export default Taquin