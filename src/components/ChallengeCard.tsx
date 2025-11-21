import { motion } from 'motion/react';
import { Shield, TrendingUp, TrendingDown, Trophy } from 'lucide-react';
import { GameTile } from '../types/game';

interface ChallengeCardProps {
  tile: GameTile;
  onClose: () => void;
}

export function ChallengeCard({ tile, onClose }: ChallengeCardProps) {
  const getCardStyle = () => {
    switch (tile.type) {
      case 'bonus':
        return 'bg-purple-50 border-[#7D0899]';
      case 'penalty':
        return 'bg-pink-50 border-[#FC279C]';
      case 'finish':
        return 'bg-fuchsia-50 border-[#990B7E]';
      default:
        return 'bg-slate-50 border-[#01002A]';
    }
  };

  const getIcon = () => {
    switch (tile.type) {
      case 'bonus':
        return <TrendingUp className="w-12 h-12 text-[#7D0899]" />;
      case 'penalty':
        return <TrendingDown className="w-12 h-12 text-[#FC279C]" />;
      case 'finish':
        return <Trophy className="w-12 h-12 text-[#990B7E]" />;
      default:
        return <Shield className="w-12 h-12 text-[#01002A]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        className={`relative max-w-md w-full p-8 rounded-2xl border-4 ${getCardStyle()} shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        <div className="flex flex-col items-center text-center gap-4">
          {getIcon()}
          <h2 className="text-gray-900">{tile.title}</h2>
          <p className="text-gray-700">{tile.description}</p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-3 bg-[#01002A] text-white rounded-lg hover:bg-[#990B7E] transition-colors"
          >
            Continuar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
