import { motion } from 'motion/react';
import { GameTile, Player } from '../types/game';
import { Shield, AlertTriangle, Trophy, Star } from 'lucide-react';

interface GameBoardProps {
  tiles: GameTile[];
  players: Player[];
}

export function GameBoard({ tiles, players }: GameBoardProps) {
  const getTileColor = (type: string) => {
    switch (type) {
      case 'bonus':
        return 'bg-[#7D0899] border-[#990B7E]';
      case 'penalty':
        return 'bg-[#FC279C] border-[#990B7E]';
      case 'finish':
        return 'bg-[#990B7E] border-[#7D0899]';
      default:
        return 'bg-pink-200 border-[#FC279C]';
    }
  };

  const getTileIcon = (type: string) => {
    switch (type) {
      case 'bonus':
        return <Star className="w-4 h-4 text-white" />;
      case 'penalty':
        return <AlertTriangle className="w-4 h-4 text-white" />;
      case 'finish':
        return <Trophy className="w-4 h-4 text-white" />;
      default:
        return <Shield className="w-4 h-4 text-[#FC279C]" />;
    }
  };

  const getPlayersOnTile = (tileId: number) => {
    return players.filter(p => p.position === tileId);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border-4 border-[#01002A]">
      <div className="grid grid-cols-8 gap-2">
        {tiles.map((tile, index) => {
          const playersHere = getPlayersOnTile(tile.id);
          
          return (
            <motion.div
              key={tile.id}
              className={`relative aspect-square ${getTileColor(tile.type)} border-2 rounded-lg flex flex-col items-center justify-center p-2 shadow-md`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              <span className={`${tile.type === 'normal' ? 'text-[#01002A]' : 'text-white'} z-10`}>{tile.id}</span>
              {tile.type !== 'normal' && (
                <div className="absolute top-1 right-1">
                  {getTileIcon(tile.type)}
                </div>
              )}
              
              {playersHere.length > 0 && (
                <div className="absolute -top-2 -right-2 flex flex-wrap gap-1">
                  {playersHere.map((player) => (
                    <motion.div
                      key={player.id}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: player.color }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <span className="text-xs text-white">{player.id}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#7D0899] rounded-full opacity-50" />
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#FC279C] rounded-full opacity-50" />
      <div className="absolute top-1/2 -left-6 w-8 h-8 bg-[#990B7E] rounded-full opacity-50" />
    </div>
  );
}
