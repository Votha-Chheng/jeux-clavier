import { FC, useEffect } from 'react'
import { letters } from '../../../data/letters'
import styled from 'styled-components'

type ListLettresProps = {
  lettersSuccess: string[]
}
const ListLettres: FC<ListLettresProps> = ({lettersSuccess}) => {
  const LETTERS = letters

  useEffect(()=> {

  }, [lettersSuccess])

  return (
    <Container>
    {
      LETTERS.map((letter: string)=> (
        <div className='letter-list' 
          key={letter} 
          style={{color:`${lettersSuccess.includes(letter) ? "#f5f5f5": "green"}`, transform:`scale(${lettersSuccess.includes(letter) ? "1": "1.75"}) translateY(${lettersSuccess.includes(letter) ? "20px": "0"})`}}
        >
          {letter.toUpperCase()}
        </div>
      ))
    }
    </Container>
  )
}

const Container = styled.div`
  margin: 20px auto;
  display:flex;
  justify-content: center;
  gap: 7.5px;

  .letter-list {
    font-family: "Arial";
    margin: 0 7.5px;
    font-weight: bold;
    font-size: 20px;
    transition: transform 0.5s ;
  }
`

export default ListLettres