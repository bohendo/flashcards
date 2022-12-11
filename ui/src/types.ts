
export interface CardData {
  front: string,
  back: string,
}

export type DeckData = Array<CardData>;

export interface Card extends CardData {
  difficulty: number,
  color: string
}

export type Deck = Array<Card>;
