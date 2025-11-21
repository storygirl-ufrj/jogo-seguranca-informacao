import { useState } from 'react';
import { Player } from '../types/game';
import { playerColors } from '../data/gameData';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/c45a8afaa713746c4cb6412dee277eb73309e7f0.png';

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void;
}

export function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [gameMode, setGameMode] = useState<'single' | 'multi' | null>(null);
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);

  const handleModeSelect = (mode: 'single' | 'multi') => {
    setGameMode(mode);
    if (mode === 'single') {
      setPlayerCount(1);
      setPlayerNames(['']);
    } else {
      setPlayerCount(2);
      setPlayerNames(['', '']);
    }
  };

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    const newNames = Array(count).fill('').map((_, i) => playerNames[i] || '');
    setPlayerNames(newNames);
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStart = () => {
    const players: Player[] = Array(playerCount).fill(0).map((_, i) => ({
      id: i + 1,
      name: playerNames[i] || (gameMode === 'single' ? 'Você' : `Jogador ${i + 1}`),
      position: 1,
      color: playerColors[i].color
    }));
    onStartGame(players);
  };

  // Tela de seleção de modo
  if (gameMode === null) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border-4 border-[#01002A]"
      >
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="Story Girl" className="h-24" />
        </div>
        <h1 className="text-[#01002A] text-center mb-6">Jogo de Segurança Digital</h1>
        
        <div className="mb-8">
          <label className="block text-gray-700 mb-4 text-center">
            Escolha o modo de jogo:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              onClick={() => handleModeSelect('single')}
              className="p-6 bg-gradient-to-br from-[#FC279C] to-[#990B7E] text-white rounded-2xl border-2 border-[#990B7E] hover:scale-105 transition-transform shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-3">👤</div>
              <h3 className="text-white mb-2">Um Jogador</h3>
              <p className="text-white/90 text-sm">
                Jogue sozinho e aprenda no seu ritmo
              </p>
            </motion.button>

            <motion.button
              onClick={() => handleModeSelect('multi')}
              className="p-6 bg-gradient-to-br from-[#7D0899] to-[#01002A] text-white rounded-2xl border-2 border-[#7D0899] hover:scale-105 transition-transform shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-white mb-2">Multiplayer</h3>
              <p className="text-white/90 text-sm">
                Jogue com amigos e família
              </p>
            </motion.button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-pink-50 rounded-lg border-2 border-[#FC279C]">
          <p className="text-gray-700 text-center">
            Aprenda sobre segurança digital enquanto se diverte! Role os dados, avance pelas casas e complete desafios educativos.
          </p>
        </div>
      </motion.div>
    );
  }

  // Tela de configuração de jogadores
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border-4 border-[#01002A]"
    >
      <div className="flex justify-center mb-6">
        <img src={logoImage} alt="Story Girl" className="h-24" />
      </div>
      <h1 className="text-[#01002A] text-center mb-2">Jogo de Segurança Digital</h1>
      <p className="text-[#990B7E] text-center mb-6">
        Modo: {gameMode === 'single' ? 'Um Jogador' : 'Multiplayer'}
      </p>
      
      <button
        onClick={() => setGameMode(null)}
        className="mb-6 px-4 py-2 text-gray-600 hover:text-[#FC279C] transition-colors"
      >
        ← Voltar
      </button>

      {gameMode === 'multi' && (
        <div className="mb-8">
          <label className="block text-gray-700 mb-3">
            Quantos jogadores?
          </label>
          <div className="flex gap-3">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => handlePlayerCountChange(count)}
                className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                  playerCount === count
                    ? 'bg-[#FC279C] text-white border-[#990B7E]'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-[#FC279C]'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8 space-y-4">
        <label className="block text-gray-700">
          {gameMode === 'single' ? 'Seu nome:' : 'Nomes dos jogadores:'}
        </label>
        {Array(playerCount).fill(0).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: playerColors[i].color }}
            />
            <input
              type="text"
              placeholder={gameMode === 'single' ? 'Seu nome' : `Jogador ${i + 1}`}
              value={playerNames[i]}
              onChange={(e) => handleNameChange(i, e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FC279C] focus:outline-none"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleStart}
        className="w-full py-4 bg-[#FC279C] text-white rounded-lg hover:bg-[#990B7E] transition-colors shadow-lg"
      >
        Começar Jogo! 🎮
      </button>

      <div className="mt-8 p-4 bg-pink-50 rounded-lg border-2 border-[#FC279C]">
        <p className="text-gray-700 text-center">
          Aprenda sobre segurança digital enquanto se diverte! Role os dados, avance pelas casas e complete desafios educativos.
        </p>
      </div>
    </motion.div>
  );
}
