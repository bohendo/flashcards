
export interface CardData {
  front: string,
  backTitle: string,
  backDescription: string,
}

export type DeckData = Array<CardData>;

export interface Card extends CardData {
  difficulty: number,
  color: string
}

export type Deck = Array<Card>;
