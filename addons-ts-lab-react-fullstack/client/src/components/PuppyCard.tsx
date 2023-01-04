import React from 'react';
import { Puppy } from '../../../types'

interface PuppyCardProps {
  puppy: Puppy;
}

const PuppyCard = ({puppy}: PuppyCardProps) => {
  return (
    <article>
      <h1>{puppy.name}</h1>
      <p>{puppy.breed}</p>
    </article>
  )
}

export default PuppyCard