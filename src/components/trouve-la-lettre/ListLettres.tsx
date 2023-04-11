import { letters } from '@/datas/trouve-la-lettre/letters'
import { RootState } from '@/store/store';
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

type ListLettresProps = {
  lettersSuccess: string[];
}
const ListLettres: FC<ListLettresProps> = ({lettersSuccess}) => {
  const LETTERS = letters

  const { typeLettre } = useSelector((state: RootState)=> state.trouveLaLettre)

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
          {typeLettre === "capitale" ? letter.toUpperCase() : letter.toLowerCase()}
        </div>
      ))
    }
    </Container>
  )
}

const Container = styled.div`
  margin: 100px auto 0;
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