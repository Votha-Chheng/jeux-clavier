import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

const BackToMenu: FC = () => {
  return (
    <Link href='/'>
      <Image src="/images/home-house.svg" alt="Retour vers le menu" width={50} height={50} priority={true} />
    </Link>
  )
}

export default BackToMenu