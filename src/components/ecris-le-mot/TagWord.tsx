import React, { FC } from 'react'
import styled from 'styled-components'

type TagWordProps = {
  word: string;
}
const TagWord: FC<TagWordProps> = ({word}) => {
  return (
    <TagWordStyle>
      {word}
    </TagWordStyle>
  )
}

const TagWordStyle = styled.div`
  color: white;
`

export default TagWord