import React, { FC, FormEvent, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CreateListComponent from './CreateListComponent';
import CustomListModify from './CustomListModify';
import { useKeyUp } from '../../../../hooks/useKeyUp';

const CreateListPanel: FC = () => {
  const [listeMots, setListeMots] = useState<string[]>([])
  const [motInput, setMotInput] = useState<string>("")
  const [wordExists, setWordExists] = useState<boolean>(false)
  const { createList, modifyList } = useSelector((state: RootState)=> state.ecrisLeMot)

  const keyUp = useKeyUp()
  
  useEffect(() => {
    if(keyUp === "Enter" && motInput.length>0){
      handleWordValidation(motInput, listeMots)
    }
  }, [keyUp])

  const handleChangeWordInput = (event: FormEvent<HTMLInputElement>)=> {
    const mot = event.currentTarget.value
    const result = listeMots?.find((word: string) => word.trim() === mot ) ?? undefined
    if(!result) {
      setWordExists(false)
      setMotInput(mot.trim())
    } else {
      setWordExists(true)
    }
  }

  const handleWordValidation = (word: string, listeMots: string[])=> {
    if(wordExists){
      alert("Ce mot est déjà dans la liste !")
      return
    }
    if(word.length>0){
      if((listeMots === undefined) || listeMots.length<1){
        setListeMots([word])
      } else {
        const listArray = [...listeMots, word]
        setListeMots(listArray)
      }
      setMotInput("")     
    }
  }

  const handleDeleteWordFromListe = ( index: number, listToModify: string[]): void=> {
    let copyArray = [...listToModify]
    copyArray.splice(index, 1)
    setListeMots(copyArray)
  }
  
  return (
    <CreateListeMain style={{ transform: `translateY(${createList || modifyList ? "0vh":"100vh" })`}}>
      {
        createList && 
        <CreateListComponent 
          handleWordValidation={handleWordValidation} 
          motInput={motInput} 
          listeMots={listeMots} 
          setListeMots={setListeMots} 
          wordExists={wordExists} 
          handleChangeWordInput={handleChangeWordInput}
          handleDeleteWordFromListe={handleDeleteWordFromListe}
        />
      }
      {
        modifyList && 
        <CustomListModify 
          handleWordValidation={handleWordValidation} 
          motInput={motInput} 
          listeMots={listeMots} 
          wordExists={wordExists}
          setListeMots={setListeMots}
          handleChangeWordInput={handleChangeWordInput}
          handleDeleteWordFromListe={handleDeleteWordFromListe}
        />
      }
    </CreateListeMain>
  )
}

const CreateListeMain = styled.main`
  height:calc(100vh - 5px);
  margin: 0px auto;
  width: 940px;
  position: fixed;
  left: calc((100% - 940px)/2);
  z-index: 8;
  outline: 5px solid black;
  background-color: #313638;
  transition: transform 0.55s ease-out;
  padding:15px;
  border-radius: 10px;

  .back {
    position: absolute;
    bottom: 20px;
    left: 425px;

    img{
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .words-list-container{
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 10px;
    width:930px;
    margin: 20px auto;
  }
`

export default CreateListPanel