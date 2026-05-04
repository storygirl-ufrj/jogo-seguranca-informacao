import React, { useState } from 'react';
import { Player, GameTile } from './types/game';
import { gameTiles } from './data/gameData';
import { PlayerSetup } from './components/PlayerSetup';
import { GameBoard } from './components/GameBoard';
import { Dice } from './components/Dice';
import { ChallengeCard } from './components/ChallengeCard';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw } from 'lucide-react';
import logoImage from './assets/logo.png';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedTile, setSelectedTile] = useState<GameTile | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameLog, setGameLog] = useState<string[]>([]);

  const currentPlayer = players[currentPlayerIndex];

  const addLog = (message: string) => {
    setGameLog(prev => [`${new Date().toLocaleTimeString()}: ${message}`, ...prev.slice(0, 9)]);
  };

  const handleStartGame = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    setGameStarted(true);
    addLog('Jogo iniciado! Boa sorte a todos! 🎮');
  };

  const handleDiceRoll = (value: number) => {
    const newPosition = Math.min(currentPlayer.position + value, 38);
    const tile = gameTiles.find(t => t.id === newPosition);

    setPlayers(prev =>
      prev.map(p =>
        p.id === currentPlayer.id ? { ...p, position: newPosition } : p
      )
    );

    addLog(`${currentPlayer.name} tirou ${value} e foi para casa ${newPosition}`);

    if (tile && tile.type !== 'normal') {
      setTimeout(() => {
        setSelectedTile(tile);
      }, 500);
    } else {
      setTimeout(() => {
        nextPlayer();
      }, 1000);
    }
  };

  const handleCloseCard = () => {
    if (!selectedTile) return;

    const action = selectedTile.action || 0;
    const currentPos = currentPlayer.position;

    if (action !== 0) {
      const newPosition = Math.max(1, Math.min(currentPos + action, 38));
      
      setPlayers(prev =>
        prev.map(p =>
          p.id === currentPlayer.id ? { ...p, position: newPosition } : p
        )
      );

      if (action > 0) {
        addLog(`${currentPlayer.name} avançou ${action} casas!`);
      } else if (action < 0) {
        addLog(`${currentPlayer.name} voltou ${Math.abs(action)} casas!`);
      }

      if (newPosition === 38) {
        setWinner(currentPlayer);
      }
    }

    setSelectedTile(null);

    if (selectedTile.type === 'finish' || currentPlayer.position === 38) {
      setWinner(currentPlayer);
    } else {
      setTimeout(() => {
        nextPlayer();
      }, 500);
    }
  };

  const nextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  const resetGame = () => {
    setGameStarted(false);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setSelectedTile(null);
    setWinner(null);
    setGameLog([]);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-fuchsia-200 p-4 flex items-center justify-center">
        <PlayerSetup onStartGame={handleStartGame} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-fuchsia-200 p-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logoImage} alt="Story Girl" className="h-20" />
          </div>
          <h1 className="text-[#01002A] mb-2">Jogo de Segurança Digital</h1>
          <p className="text-[#990B7E]">Aprenda sobre segurança online de forma divertida!</p>
        </div>

        {/* Game Board */}
        <div className="mb-8">
          <GameBoard tiles={gameTiles} players={players} />
        </div>

        {/* Game Controls */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Player & Dice */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-[#01002A]">
            <h3 className="text-[#01002A] mb-4 text-center">Vez de:</h3>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                style={{ backgroundColor: currentPlayer.color }}
              >
                <span className="text-white">{currentPlayer.id}</span>
              </div>
              <div>
                <p className="text-gray-900">{currentPlayer.name}</p>
                <p className="text-gray-600">Casa {currentPlayer.position}</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Dice onRoll={handleDiceRoll} disabled={!!selectedTile || !!winner} />
            </div>

            <button
              onClick={resetGame}
              className="w-full mt-6 px-4 py-2 bg-[#01002A] text-white rounded-lg hover:bg-[#7D0899] transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar Jogo
            </button>
          </div>

          {/* Players Status */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-[#01002A]">
            <h3 className="text-[#01002A] mb-4">Placar:</h3>
            <div className="space-y-3">
              {players.map((player) => (
                <motion.div
                  key={player.id}
                  className={`p-3 rounded-lg border-2 ${
                    player.id === currentPlayer.id
                      ? 'border-[#FC279C] bg-pink-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                  animate={player.id === currentPlayer.id ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                        style={{ backgroundColor: player.color }}
                      >
                        <span className="text-white text-xs">{player.id}</span>
                      </div>
                      <span className="text-gray-900">{player.name}</span>
                    </div>
                    <span className="text-gray-700">Casa {player.position}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Game Log */}
            <div className="mt-6">
              <h4 className="text-gray-700 mb-2">Histórico:</h4>
              <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto border border-gray-200">
                {gameLog.length === 0 ? (
                  <p className="text-gray-500 text-center">Nenhuma jogada ainda</p>
                ) : (
                  <div className="space-y-1">
                    {gameLog.map((log, i) => (
                      <p key={i} className="text-gray-600 text-xs">{log}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Card Modal */}
        <AnimatePresence>
          {selectedTile && (
            <ChallengeCard tile={selectedTile} onClose={handleCloseCard} />
          )}
        </AnimatePresence>

        {/* Winner Modal */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="absolute inset-0 bg-black/50" />
              <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="relative max-w-md w-full p-8 bg-gradient-to-br from-[#FC279C] via-[#990B7E] to-[#7D0899] rounded-3xl border-4 border-[#01002A] shadow-2xl text-center"
              >
                <Trophy className="w-24 h-24 text-white mx-auto mb-4" />
                <h2 className="text-white mb-2">🎉 Parabéns! 🎉</h2>
                <p className="text-white mb-6">
                  <span className="text-white">{winner.name}</span> venceu o jogo!
                </p>
                <p className="text-white mb-6">
                  Agora você sabe mais sobre segurança digital! Continue praticando esses hábitos no seu dia a dia.
                </p>
                <button
                  onClick={resetGame}
                  className="w-full px-6 py-3 bg-[#01002A] text-white rounded-lg hover:bg-white hover:text-[#01002A] transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-5 h-5" />
                  Jogar Novamente
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
