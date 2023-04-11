import React, { FC } from 'react'
import styled from 'styled-components'
import TagWord from './TagWord'

type WordListTagsProps = {
  wordList: string[]
}

const WordListTags: FC<WordListTagsProps> = ({wordList}) => {
  return (
    <WordListTagsStyle>
      {
        wordList.map((word: string, index: number)=> (
          <TagWord key={index} word={word}/>
        ))
      }
    </WordListTagsStyle>
  )
}

const WordListTagsStyle = styled.div`
  display: flex;
  gap: 15px;
`

export default WordListTags