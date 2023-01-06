import React, { ReactEventHandler } from 'react';
import { Puppy } from '../../../types'

interface PuppyCardProps {
  puppy: Puppy;
  handleData: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void;
}

const PuppyCard = ({puppy, handleData}: PuppyCardProps) => {
  return (
    <article >
      <h1>{puppy.name}</h1>
      <p>{puppy.breed}</p>
      <button onClick={(e) => handleData(e, puppy.id)}>Delete</button>
    </article>
  )
}

export default PuppyCard