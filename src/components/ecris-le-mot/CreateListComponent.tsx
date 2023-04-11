import { getCreateList } from '@/store/slices/ecrisLeMotSlice'
import listeMotsCustom, { ListeMotCustom, setMotsCustom, setPrenomsCustom } from '@/store/slices/listeMotsCustom'
import { RootState } from '@/store/store'
import { Rubik } from 'next/font/google'
import Image from 'next/image'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import WordListTags from './WordListTags'
import { useKeyUp } from '../../../hooks/useKeyUp'

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"]
})

const CreateListComponent: FC = () => {
  const [motInput, setMotInput] = useState<string>("")
  const [changeNomListe, setChangeNomListe] = useState<boolean>(false)
  const [customisedList, setCustomisedList] = useState<ListeMotCustom>({listeMot: [], niveau: 1, nom:""})

  const { typeMot } = useSelector((state: RootState)=> state.ecrisLeMot) 
  const { motsCustom, prenomsCustom } = useSelector((state: RootState)=> state.listeMotsCustom) 

  const dispatch = useDispatch()

  const keyUp = useKeyUp()

  useEffect(() => {
    console.log(keyUp)
    if(keyUp === "Enter" && motInput.length>0){
      handleWordValidation(motInput)
    }
  }, [keyUp])
  

  const handleChangeWordInput = (event: FormEvent<HTMLInputElement>)=> {
    const mot = event.currentTarget.value
    setMotInput(mot)
  }

  const handleWordValidation = (word: string)=> {
    const listArray = [...customisedList.listeMot, word]
    setCustomisedList({...customisedList, listeMot: listArray})   
    setMotInput("") 
  }

  const goBack = (): void => {
    let temp: ListeMotCustom[] = []

    if(customisedList.nom.length>0 && customisedList !== undefined){
      if(typeMot === "prénom"){
        if((prenomsCustom === undefined) || (prenomsCustom.length<1)){
          temp = [...temp, customisedList]
        } else {
          temp = [...prenomsCustom, customisedList]
        }
        dispatch(setPrenomsCustom(temp))
        
      } else if(typeMot === "mot") {
        if((motsCustom === undefined) || (motsCustom.length<1)){
          temp = [...temp, customisedList]
        } else {
          temp = [...motsCustom, customisedList]
        }
        dispatch(setMotsCustom(temp))

      }
    }
    setCustomisedList({listeMot: [], niveau: 1, nom:""})
    dispatch(getCreateList(false))
  }
  

  return (
    <CustomListStyle className={rubik.className}>
      <h2>Créer une liste de {typeMot}s personnalisée</h2>
      <h3>Nom de la liste :</h3> 
      
      <input value={customisedList.nom} onChange={(event: FormEvent<HTMLInputElement>)=> setCustomisedList({...customisedList, nom: event.currentTarget.value}) } placeholder='Entrez votre mot'/>
      {
        ((customisedList.nom.length>0)) &&
        <>
          <figcaption>
            Entrer un mot sans majuscule. <br/>Si vous rentrez un mot contenant un accent, une cédille ou autres, la possibilité d&APOS;affichage en majuscule sera désactivée.
          </figcaption>
          <input value={motInput} onChange={(event: FormEvent<HTMLInputElement>)=> handleChangeWordInput(event) } placeholder='Entrez votre mot'/>
          <div>
            <button onClick={()=> handleWordValidation(motInput)}>Valider {typeMot}</button>
          </div>
        </>
      }
      {
        customisedList.listeMot !== undefined &&
        <WordListTags wordList={customisedList.listeMot}/>
      }
      <div className='back'>
        <Image onClick={()=> goBack()} src='/images/arrow-down.svg' alt="Retour aux préférences" width={50} height={50} />
      </div>
    </CustomListStyle>
  )
}

const CustomListStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:940px;
  color: white;

  h2{
    letter-spacing: 2.5px;
    margin-bottom: 50px;
  }

  h3{
    margin-bottom: 5px;
  }
    
  figcaption{
    margin:15px auto;
    color:#F4E76E;
    text-align: center;
  }

  input{
    width: 500px;
    line-height: 25px;
    text-align: center;
  }
`

export default CreateListComponent