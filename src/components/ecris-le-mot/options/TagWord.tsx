import React, { FC } from 'react'
import styled from 'styled-components'

type TagWordProps = {
  word: string;
  index: number;
  wordList: string[];
  handleDeleteWordFromListe: Function;
  wordExists?: boolean;
}

const TagWord: FC<TagWordProps> = ({word, index, wordList, handleDeleteWordFromListe}) => {
  return (
    <TagWordStyle>
      <span>{word}</span>
      <div className={`delete-word ${index}`} onClick={()=>handleDeleteWordFromListe(index, wordList)}>X</div>
    </TagWordStyle>
  )
}

const TagWordStyle = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-width:175px;
  border: 2px solid white;
  padding:3.5px 5px;
  border-radius: 5px;

  .delete-word {
    cursor: pointer;
  }
  .word-exists{
    color: red;
  }
`

export default TagWord