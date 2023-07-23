import { ListeMotCustom, getCreateList } from '@/store/slices/ecrisLeMotSlice'
import { RootState } from '@/store/store'
import Image from 'next/image'
import React, { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import TagWord from './TagWord'
import { addCustomList } from '@/store/slices/customListArray'
import { rubik } from '@/fonts/rubik'

interface CreateListComponentProps {
  handleWordValidation: Function;
  motInput: string; 
  listeMots: string[];
  setMotInput: Dispatch<SetStateAction<string>>;
  setListeMots: Dispatch<SetStateAction<string[]>>;
  wordExists: boolean;
  handleChangeWordInput: Function;
  handleDeleteWordFromListe: Function;
  nomListeExiste: boolean;
  setNomListeExiste: Dispatch<SetStateAction<boolean>>;
}

const CreateListComponent: FC<CreateListComponentProps> = ({handleWordValidation, motInput, setMotInput, listeMots, setListeMots, wordExists, handleChangeWordInput, handleDeleteWordFromListe, nomListeExiste, setNomListeExiste}) => {
  const [nomListe, setNomListe] = useState<string>("")

  const { customListArray } = useSelector((state: RootState)=> state.customListArray) 
  const { options, selectedCustomListName } = useSelector((state: RootState)=> state.ecrisLeMot) 
  const { typeMot } = options

  const dispatch = useDispatch()
  

  const checkIfWordExists = (inputName: string, list: string[]): boolean=> {
    let tempExists: string|undefined

    tempExists = list.find((mot: string)=> mot === inputName)

    return tempExists === undefined ? false : true
    
  }

  const validateCreationCustomList = (): void=> {
    if(nomListeExiste){
      alert(`Une liste personnalisée porte déja le nom de ${nomListe}. Veuillez changer de nom.`)
      return
    }

    if(listeMots.length<1 || listeMots === undefined ){
      alert(`Votre liste de mots est vide. Annuler la création de mots ou insérer des mots.`)
      return
    }
    const newCustomList: ListeMotCustom = { 
      nom: nomListe,
      listeMot: listeMots,
      id: Date.now().toString()
    }

    dispatch(addCustomList(newCustomList))
    goBack()
  }

  const goBack = (): void => {
    dispatch(getCreateList(false))
    setListeMots([])
    setNomListe("")
    setMotInput("")
  }

  const handleChangeInputNomListe = (event: FormEvent<HTMLInputElement>)=> {
    setNomListe(event.currentTarget.value)
    if(customListArray.length>0){
      const listOfNameList = customListArray.map((liste: ListeMotCustom)=> liste.nom)
      const exist =  checkIfWordExists(event.currentTarget.value, listOfNameList)
      setNomListeExiste(exist)
    }
  }  

  return (
    <CustomListStyle className={rubik.className}  style={{transform: `translateY(0)`}}>
      <h2>Créer une liste de mots personnalisée</h2>
      <h3>Nom de la liste :</h3> 
      
      <input 
        className={`${nomListeExiste ? "nom-existe": ""}`}
        value={nomListe} 
        onChange={(event: FormEvent<HTMLInputElement>)=> handleChangeInputNomListe(event)}
        placeholder='Entrez votre mot'
      />
      {
        ((nomListe.length>0)) &&
        <>
          <figcaption>
            Entrer un mot sans majuscule. <br/>
          </figcaption>
          <input className={`${wordExists ? "word-exists": ""}`} value={motInput} onChange={(event: FormEvent<HTMLInputElement>)=> handleChangeWordInput(event) } placeholder='Entrez votre mot'/>
          <div>
            <button onClick={()=> handleWordValidation(motInput, listeMots)}>Valider {typeMot}</button>
          </div>
        </>
      }
      {
        listeMots !== undefined &&
          <div className='words-list-container'>
          {
            listeMots.map((word: string, index: number)=> (
              <TagWord key={index} word={word} wordList={listeMots} index={index} handleDeleteWordFromListe={handleDeleteWordFromListe}/>
            ))
          }
        </div>
      }
      <div className='total'>
        Total de mot : {listeMots.length}
      </div>
      <div className='back'>
        <Image onClick={()=> validateCreationCustomList()} src='/images/save.svg' alt="Retour aux préférences" width={50} height={50} />
        <Image onClick={()=> goBack()} src='/images/cancel.svg' alt="Annuler" width={45} height={45} />
      </div>
    </CustomListStyle>
  )
}

const CustomListStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 100vh;
  margin: 0px auto;
  width: 910px;

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
    outline: 1px solid black;
    color: black;

    &.nom-existe, &.word-exists{
      outline: 3px solid red;
      color: red;
    }
  }

  .total{
    margin: 20px 0;
    color: yellow;
  }
`

export default CreateListComponent