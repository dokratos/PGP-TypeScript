import { Puppy } from "./types";

export const nextId = (puppiesDb: Puppy[]) => {
    const highestId: number = puppiesDb.reduce(
      (accumulator, currentValue) => (currentValue.id > accumulator ? currentValue.id : accumulator),
      0
    );
    return highestId + 1;
  };