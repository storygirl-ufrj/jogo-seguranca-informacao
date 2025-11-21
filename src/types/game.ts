export type TileType = 'normal' | 'challenge' | 'bonus' | 'penalty' | 'finish';

export interface GameTile {
  id: number;
  type: TileType;
  title?: string;
  description?: string;
  action?: number; // movimento extra (positivo) ou voltar casas (negativo)
}

export interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
}
