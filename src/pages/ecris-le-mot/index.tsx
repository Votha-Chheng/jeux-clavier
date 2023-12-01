import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { displaySuccess } from '@/utils/displaySuccess'
import { pickAListOfElements } from '@/utils/pickAListOfElements'
import { removeElementWritten } from '@/utils/removeElementWritten'
import PrenomsListe from '../../components/ecris-le-mot/PrenomsListe'
import PrenomInput from '@/components/ecris-le-mot/PrenomInput'
import Bravo from '@/components/shared-UI/Bravo'
import IconsFooter from '@/components/shared-UI/IconsFooter'
import OptionsPanel from '@/components/shared-UI/OptionsPanel'
import { useKeyUpForLettersOnly } from '../../../hooks/useKeyUpForLettersOnly'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setShowUp } from '@/store/slices/optionsPanelSlice'
import { ListeMotCustom, getSelectedList, resetOptions } from '@/store/slices/ecrisLeMotSlice'
import CreateListPanel from '@/components/ecris-le-mot/options/CreateListPanel'
import { lato } from '@/fonts/lato'
import OptionsEcrisMots from '@/components/ecris-le-mot/options/OptionsEcrisMots'
import { prenoms } from '@/datas/ecris-le-mot/prenoms'
import { arrayMots } from '@/datas/ecris-le-mot/mots'
import Head from 'next/head'

const EcrisLeMot: FC = () => {
  const [listeTotale, setListeTotale] = useState<string[]>([])
  const [listeMots, setListeMots] = useState<string[]>([])
  const [listeMotsEcrits, setListeMotsEcrits] = useState<string[]>([])
  const [listeMotsRestants, setListeMotsRestants] = useState<string[]>([])
  const [lettersTapped, setLettersTapped] = useState<string[]>([])
  const [lettersLeft, setLettersLeft] = useState<string[]>([])
  const [letterInput, setLetterInput] = useState<string>("")
  const [success, setSuccess] = useState<boolean|undefined>(undefined)
  const [wordSuccess, setWordSuccess] = useState<boolean>(false)
  const [end, setEnd] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, []);  // avoid hydration issues - run on client

  const letterPressed =  useKeyUpForLettersOnly()
  const { showUp } = useSelector((state: RootState)=> state.optionsPanel)
  const { customListArray} = useSelector((state: RootState)=> state.customListArray)
  const { options, selectedList, selectedCustomListName } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { lengthOptions, typeMot,  uppercase, customListTrue, niveauMots } = options

  const dispatch = useDispatch()

  useEffect(()=> {
    return ()=> {
      dispatch(resetOptions())
    }
  }, [dispatch])

  useEffect(()=> {
    typeMot === "prénom" ? setListeTotale(prenoms)  : setListeTotale(arrayMots[niveauMots-1])

    if(customListTrue) {
      const temp: ListeMotCustom[]|undefined = customListArray?.filter((listeMotCustom: ListeMotCustom)=> listeMotCustom.nom === selectedCustomListName)

      if(temp !== undefined && temp.length>0){
        setListeTotale([...temp[0].listeMot])
      } else {
        typeMot === "prénom" ? setListeTotale(prenoms)  : setListeTotale(arrayMots[niveauMots-1])
      }  
    }

    dispatch(getSelectedList(listeTotale))

  }, [typeMot, customListTrue, niveauMots, selectedCustomListName])

  useEffect(()=>{
    const liste = pickAListOfElements(listeTotale, lengthOptions)
    setListeMots(liste)
    setListeMotsRestants(liste)
    setLettersLeft([])

  }, [options, selectedList, showUp])

  useEffect(()=> {
    if(listeMotsRestants.length>0 && listeMotsRestants !== undefined){
      setLettersLeft(listeMotsRestants[0]?.split("") ?? [])
    }

    if(listeMotsRestants.length<1 && mounted){
      setEnd(true)
    }
    
  }, [listeMotsRestants])

  useEffect(()=> {
    if(success !== undefined){
      null
    } else {
      setLetterInput(letterPressed)
    }
  }, [letterPressed])


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
      setListeMotsEcrits(tempForListePrenomsEcrits)
      setListeMotsRestants(tempForListePrenomsRestants)
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
          handleWordSuccess(listeMotsEcrits, listeMotsRestants)
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
    const liste = pickAListOfElements(listeTotale, lengthOptions)
    setListeMotsEcrits([])
    setListeMots(liste)
    setListeMotsRestants(liste)
    setLettersTapped([])

    if(listeMotsRestants.length>0){
      setLettersLeft(listeMotsRestants[0].split(""))
    }
  }

  const removeOptionsPanel = ()=> {
    if((showUp && listeTotale.length<1) || (customListTrue && selectedCustomListName === "")){
      alert("Vous n'avez pas sélectionné de liste !")
      return
    } else {
      dispatch(setShowUp(!showUp))
    }
  }

  if (!mounted) return null

  return (
    <MainStyle>
      <Head>
        <title>Trouve ton chemin avec la souris</title>
      </Head>
      <CreateListPanel/>
      <OptionsPanel onClickHandler={removeOptionsPanel}>
        <OptionsEcrisMots listeTotale={listeTotale}/>
      </OptionsPanel>
      {
        listeMots !== undefined && <PrenomsListe fullList={listeMots} listePrenomsEcrits={listeMotsEcrits}/>
      }
      {
        listeMotsRestants.length<1
        ?
        <Bravo/>
        :
        <>
          <div className='container-input'>
            <div className={`${lato.className} selected-prenom`}>
              { listeMotsRestants === undefined ? null : uppercase ? listeMotsRestants[0] === undefined ? "" : listeMotsRestants[0].toUpperCase() : listeMotsRestants[0]  }
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
  position: relative;

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