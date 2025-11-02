
export interface Phrase {
  id: number;
  text: string;
  position: {
    top: number;
    left: number;
  };
}

export type MoveDirection = 'up' | 'down' | 'left' | 'right' | 'center' | 'corner';
