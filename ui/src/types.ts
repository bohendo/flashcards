
export interface Card {
  front: string,
  back: string,
  color: string
}

export type Deck = Array<Card>;
