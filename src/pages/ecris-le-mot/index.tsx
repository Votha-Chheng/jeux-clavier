import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { prenoms } from '@/datas/ecris-le-mot/prenoms'
import { displaySuccess } from '@/utils/displaySuccess'
import { pickAListOfElements } from '@/utils/pickAListOfElements'
import { removeElementWritten } from '@/utils/removeElementWritten'
import PrenomsListe from '../../components/ecris-le-mot/PrenomsListe'
import { Lato } from 'next/font/google'
import PrenomInput from '@/components/ecris-le-mot/PrenomInput'
import Bravo from '@/components/shared-UI/Bravo'
import IconsFooter from '@/components/shared-UI/IconsFooter'
import OptionsPanel from '@/components/shared-UI/OptionsPanel'
import Options from '@/components/ecris-le-mot/Options'
import { useKeyUpForLettersOnly } from '../../../hooks/useKeyUpForLettersOnly'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setShowUp } from '@/store/slices/optionsPanelSlice'
import CreateListPanel from '@/components/ecris-le-mot/CreateListPanel'

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
})

const EcrisLeMot: FC = () => {
  const [listePrenoms, setListePrenoms] = useState<string[]>([])
  const [listePrenomsEcrits, setListePrenomsEcrits] = useState<string[]>([])
  const [listePrenomsRestants, setListePrenomsRestants] = useState<string[]>([])
  const [lettersTapped, setLettersTapped] = useState<string[]>([])
  const [lettersLeft, setLettersLeft] = useState<string[]>([])
  const [letterInput, setLetterInput] = useState<string>("")
  const [success, setSuccess] = useState<boolean|undefined>(undefined)
  const [wordSuccess, setWordSuccess] = useState<boolean>(false)
  const [end, setEnd] = useState<boolean>(false)
  const [createList, setCreateList] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)


  useEffect(() => { setMounted(true) }, []);  // avoid hydration issues - run on client

  const PRENOMS = prenoms

  const letterPressed =  useKeyUpForLettersOnly()
  const { lengthOptions } = useSelector((state: RootState)=> state.ecrisLeMot)

  const dispatch = useDispatch()

  useEffect(()=> {
    if(success !== undefined){
      null
    } else {
      setLetterInput(letterPressed)
    }
  }, [letterPressed])

  useEffect(()=> {
    const liste = pickAListOfElements(PRENOMS, lengthOptions)
    setListePrenoms(liste)
    setListePrenomsRestants(liste)
    
  }, [lengthOptions])

  useEffect(()=> {
    if(listePrenomsRestants.length>0){
      setLettersLeft(listePrenomsRestants[0].split(""))
    }

    if(listePrenomsRestants.length<1 && mounted){
      setEnd(true)
    }
    
  }, [listePrenomsRestants])

  useEffect(() => {
    success === undefined && addLetterOnPress(letterInput, lettersLeft)
  }, [letterInput])
    
  const newLettersTappedArray = (): string[]=> {
    const newArray = [...lettersTapped, lettersLeft[0]]
    return newArray
  }

  const newLettersLeftArray = (): string[]=> {
    const temp = [...lettersLeft]
    temp.shift()
    return temp
  }

  const handleWordSuccess = (listePrenomsEcrits: string[], listePrenomsRestants: string[]): void=> {
    const tempForListePrenomsEcrits = [...listePrenomsEcrits, listePrenomsRestants[0]]
    const tempForListePrenomsRestants = removeElementWritten(listePrenomsRestants, listePrenomsRestants[0])
    setTimeout(()=> {
      setWordSuccess(false)
      setListePrenomsEcrits(tempForListePrenomsEcrits)
      setListePrenomsRestants(tempForListePrenomsRestants)
      setLettersTapped([])
    }, 2000)
  }
  
  const addLetterOnPress = (letter:string, lettersLeft: string[]): void=> {
    if(success === undefined){
      if(lettersLeft.length>0 && letter === lettersLeft[0]){
        const temp = newLettersLeftArray()
        const newArray = newLettersTappedArray()
        setLettersTapped(newArray)
        setLettersLeft(temp)
        displaySuccess(setSuccess, true, 500)
  
        if(temp.length<1){
          setWordSuccess(true)
          handleWordSuccess(listePrenomsEcrits, listePrenomsRestants)
        }

      } else if(lettersLeft.length>0 && letterInput !== lettersLeft[0] && letterInput !== ""){
        const temp = [...lettersTapped, letter]
        setLettersTapped(temp)
        displaySuccess(setSuccess, false, 1000)
        setTimeout(()=> {
          temp.pop()
          setLettersTapped(temp)
        }, 1000)
      }
    }
  }

  const resetGame = (): void=> {
    setEnd(false)
    dispatch(setShowUp(false))
    const liste = pickAListOfElements(PRENOMS, 10)
    setListePrenomsEcrits([])
    setListePrenoms(liste)
    setListePrenomsRestants(liste)
    if(listePrenomsRestants.length>0){
      setLettersLeft(listePrenomsRestants[0].split(""))

    }
  }

  if (!mounted) return null

  return (
    <MainStyle>
      <CreateListPanel/>
      <OptionsPanel>
        <Options totaleListeMots={PRENOMS} />
      </OptionsPanel>
      <PrenomsListe fullList={listePrenoms} listePrenomsEcrits={listePrenomsEcrits}/>
      {
        end === true
        ?
        <Bravo/>
        :
        <>
          <div className='container-input'>
            <div className={`${lato.className} selected-prenom`}>
              {listePrenomsRestants.length>0 && listePrenomsRestants[0].toUpperCase()}
            </div>
          </div>
          <PrenomInput success={success} lettersTapped={lettersTapped} wordSuccess={wordSuccess} />
        </>
      }
      <IconsFooter end={end} reset={resetGame} />
    </MainStyle>
  )
}

export default EcrisLeMot

const MainStyle = styled.main`
  padding: 0;
  margin: 0 auto;
  width: 950px;
  min-height: 100vh;
  overflow: hidden;

  .container-input{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px auto 30px;

    .selected-prenom{
      font-size: 50px;
      font-weight: bold;
      letter-spacing:15px;
    }
  }

`