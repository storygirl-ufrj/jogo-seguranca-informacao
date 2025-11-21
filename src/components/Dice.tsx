import { useState } from 'react';
import { motion } from 'motion/react';

interface DiceProps {
  onRoll: (value: number) => void;
  disabled: boolean;
}

export function Dice({ onRoll, disabled }: DiceProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentValue, setCurrentValue] = useState(1);

  const rollDice = () => {
    if (disabled || isRolling) return;

    setIsRolling(true);
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setCurrentValue(finalValue);
        setIsRolling(false);
        onRoll(finalValue);
      }
    }, 100);
  };

  const renderDots = (value: number) => {
    const dots = [];
    const positions: { [key: number]: string[] } = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
    };

    const dotPositions: { [key: string]: string } = {
      'top-left': 'top-[20%] left-[20%]',
      'top-right': 'top-[20%] right-[20%]',
      'middle-left': 'top-[50%] left-[20%] -translate-y-1/2',
      'middle-right': 'top-[50%] right-[20%] -translate-y-1/2',
      'bottom-left': 'bottom-[20%] left-[20%]',
      'bottom-right': 'bottom-[20%] right-[20%]',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    };

    positions[value].forEach((pos, index) => {
      dots.push(
        <div
          key={index}
          className={`absolute w-3 h-3 bg-[#01002A] rounded-full ${dotPositions[pos]}`}
        />
      );
    });

    return dots;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onClick={rollDice}
        disabled={disabled || isRolling}
        className="relative w-20 h-20 bg-white border-4 border-[#01002A] rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        animate={isRolling ? { rotate: [0, 360] } : {}}
        transition={{ duration: 0.2, repeat: isRolling ? Infinity : 0 }}
        whileHover={!disabled && !isRolling ? { scale: 1.1 } : {}}
        whileTap={!disabled && !isRolling ? { scale: 0.95 } : {}}
      >
        {renderDots(currentValue)}
      </motion.button>
      <button
        onClick={rollDice}
        disabled={disabled || isRolling}
        className="px-6 py-2 bg-[#FC279C] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#990B7E] transition-colors"
      >
        {isRolling ? 'Rolando...' : 'Jogar Dados'}
      </button>
    </div>
  );
}
