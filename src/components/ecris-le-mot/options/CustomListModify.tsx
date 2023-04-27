import { RootState } from '@/store/store'
import { Rubik } from 'next/font/google'
import React, { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Image from 'next/image'
import { ListeMotCustom, getModifyList } from '@/store/slices/ecrisLeMotSlice'
import TagWord from './TagWord'
import { modifyCustomListMots } from '@/store/slices/customListArray'
import { rubik } from '@/fonts/rubik'

interface CustomListModifyProps {
  handleWordValidation: Function;
  motInput: string;
  listeMots: string[];
  setListeMots: Dispatch<SetStateAction<string[]>>;
  handleChangeWordInput: Function;
  handleDeleteWordFromListe: Function;
  wordExists: boolean;
}

const CustomListModify: FC<CustomListModifyProps> = ({ handleWordValidation, motInput, listeMots, setListeMots, handleChangeWordInput, handleDeleteWordFromListe, wordExists }) => {
  const [nomListe, setNomListe] = useState<string>("")

  const { options, selectedCustomListName } = useSelector((state: RootState)=> state.ecrisLeMot) 
  const { typeMot } = options
  const { customPrenomsListArray, customMotsListArray } = useSelector((state: RootState)=> state.customListArray)

  const dispatch = useDispatch()

  const returnListeMot = (nomListe: string, typeMot: "prénom"|"mot"): string[]|undefined=> {
    const temp = typeMot === "prénom" ? customPrenomsListArray : customMotsListArray
    const selectedList: string[] = temp?.find((liste: ListeMotCustom)=> liste.nom === nomListe)?.listeMot ?? []
    return selectedList
  }

  useEffect(()=> {
    setNomListe(selectedCustomListName)
  }, [])

  useEffect(()=> {
    if((nomListe !== "") || (nomListe !== undefined)){
      const temp = returnListeMot(nomListe, typeMot)
      setListeMots(temp ?? [])
    }

  }, [nomListe])  

  const findCustomListId = (customListArray: ListeMotCustom[]|undefined): string=> {
    return customListArray?.find((listeMotsCustom: ListeMotCustom)=> listeMotsCustom.nom === nomListe)?.id ?? ""
  }

  const getNewCustomListArray = (startCustomListArray: ListeMotCustom[]|undefined): ListeMotCustom[]=> {
    if(startCustomListArray !== undefined){
      const copy = [...startCustomListArray] 
      const index = startCustomListArray?.findIndex((customList: ListeMotCustom)=> customList.id === findCustomListId(startCustomListArray))
      copy[index]= {listeMot: listeMots, nom: nomListe, id: findCustomListId(startCustomListArray)}
      return copy

    } else {
      return []
    }
    
  } 
  
  const replaceList = (customListArray: ListeMotCustom[]|undefined): void=> {
    if(listeMots === undefined || listeMots.length<1){
      alert("Vous ne pouvez pas laisser une liste de mots vide !")
      return
    }

    if(nomListe !== ""){
      const listArray = getNewCustomListArray(customListArray)
      dispatch(modifyCustomListMots({customListArray: listArray , typeMot}))
      dispatch(getModifyList(false))
    }
  }

  const goBack = (): void => {
    if(confirm("Aucune modification ne sera sauvegardée !") === true) {
      dispatch(getModifyList(false))
    }
  }

  return (
    <ModifyListStyle className={rubik.className}>
      <h2>Modifier une liste de {typeMot}s personnalisée existante</h2>
      <h3>Choisir une liste à modifier :</h3>

      {
        nomListe !== "" && listeMots.length>0 
        ?
        <div className='modification-container'>
          <h4>
            <span style={{fontWeight:"normal"}}>Nom de la liste :</span> <span style={{textDecoration:"underline"}}>{nomListe}  </span>
          </h4>
          <figcaption>
            Entrez un mot sans majuscule. <br/>
          </figcaption>
          <div className='input-container'>
            <input className={`${wordExists ? "word-exists": ""}`} value={motInput} onChange={(event: FormEvent<HTMLInputElement>)=> handleChangeWordInput(event) } placeholder='Entrez votre mot'/>
            <button className='validate-word' onClick={()=> handleWordValidation(motInput, listeMots)}>Valider {typeMot}</button>
          </div>
          <div className='words-list-container'>  
          {
            listeMots.map((mot: string, index: number)=> (
              <TagWord key={index} wordExists={wordExists} wordList={listeMots} word={mot} index={index} handleDeleteWordFromListe={handleDeleteWordFromListe} />
            ))  
          }
          </div>
        </div>
        :
        <h3>Vous n&apos;avez séléctionné aucune liste.</h3>
      }
      <div className='back'>
        <Image onClick={()=> typeMot==="prénom" ? replaceList(customPrenomsListArray) : replaceList(customMotsListArray)} src='/images/arrow-down.svg' alt="Retour aux préférences" width={50} height={50} />
        <Image onClick={()=>goBack() } src='/images/cancel.svg' alt="Annuler" width={45} height={45} />
      </div>
    </ModifyListStyle>
  )
}

const ModifyListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 100vh;
  width: 910px;

  h2{
    letter-spacing: 2.5px;
    color: white;
    text-align: center;
    margin: 20px auto;
  }
  h3{
    font-size: 13.5px;
    margin: 20px 0 5px;
    font-weight: bold;
    letter-spacing: 1.2px;
  }
  .modification-container {
    margin-top: 25px;
    width: 900px;
  }
  figcaption{
    margin:15px auto;
    color:#F4E76E;
    text-align: center;
  }
  .input-container{
    width: 910px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input{
      width: 500px;
      line-height: 25px;
      text-align: center;
      outline: 1px solid black;
      color: black;
      text-align: center;
  
      &.word-exists {
        outline: 3px solid red;
        color: red;
      }
    }
    .validate-word{
      padding:2.5px;
      margin: 2.5px auto;
    }
  }
  
`

export default CustomListModify