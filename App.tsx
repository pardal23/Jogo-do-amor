
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PHRASES, MAX_X, MAX_Y, INITIAL_POSITION, MOVE_STEP } from './constants';
import type { Phrase, MoveDirection } from './types';

// Helper component for control buttons to avoid re-definitions in the main component render
interface ControlButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    ariaLabel: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children, ariaLabel }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className="m-1 py-2 px-3 bg-blue-400 text-white rounded-lg shadow-md cursor-pointer font-bold hover:bg-blue-600 transition-all duration-200 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
    >
        {children}
    </button>
);


const App: React.FC = () => {
    const [position, setPosition] = useState(INITIAL_POSITION);
    const [visiblePhraseId, setVisiblePhraseId] = useState<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const handleMove = useCallback((direction: MoveDirection) => {
        setPosition(currentPos => {
            let newX = currentPos.x;
            let newY = currentPos.y;

            switch (direction) {
                case 'up':
                    newY = Math.max(0, currentPos.y - MOVE_STEP);
                    break;
                case 'down':
                    newY = Math.min(MAX_Y, currentPos.y + MOVE_STEP);
                    break;
                case 'left':
                    newX = Math.max(0, currentPos.x - MOVE_STEP);
                    break;
                case 'right':
                    newX = Math.min(MAX_X, currentPos.x + MOVE_STEP);
                    break;
                case 'center':
                    return INITIAL_POSITION;
                case 'corner':
                    const corners = [
                        { x: 0, y: 0 },
                        { x: MAX_X, y: 0 },
                        { x: 0, y: MAX_Y },
                        { x: MAX_X, y: MAX_Y },
                    ];
                    return corners[Math.floor(Math.random() * 4)];
            }
            return { x: newX, y: newY };
        });
    }, []);

    useEffect(() => {
        let targetPhrase: Phrase | null = null;

        for (const phrase of PHRASES) {
            const dx = phrase.position.left - position.x;
            const dy = phrase.position.top - position.y;
            if (Math.abs(dx) < 60 && Math.abs(dy) < 60) {
                targetPhrase = phrase;
                break;
            }
        }
        
        if (targetPhrase && targetPhrase.id !== visiblePhraseId) {
            setVisiblePhraseId(targetPhrase.id);
        }
    }, [position, visiblePhraseId]);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (visiblePhraseId !== null) {
            timeoutRef.current = window.setTimeout(() => {
                setVisiblePhraseId(null);
            }, 2500);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [visiblePhraseId]);

    return (
        <main className="bg-gradient-to-br from-pink-100 via-blue-100 to-indigo-200 min-h-screen font-sans text-center flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 drop-shadow-md my-6 animate-pulse">
                💞 Jogo do Amor 💞
            </h1>

            <div className="relative w-[600px] h-[380px] mx-auto border-2 border-dashed border-blue-500 bg-white/70 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                <div 
                    id="flor"
                    className="absolute text-4xl transition-all duration-200 ease-in-out"
                    style={{ left: `${position.x}px`, top: `${position.y}px` }}
                >
                    🌸
                </div>

                {PHRASES.map((phrase) => (
                    <div
                        key={phrase.id}
                        className={`absolute text-base italic font-bold text-indigo-800 transition-opacity duration-500 p-2 bg-white/50 rounded-md ${
                            visiblePhraseId === phrase.id ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ top: `${phrase.position.top}px`, left: `${phrase.position.left}px` }}
                    >
                        "{phrase.text}"
                    </div>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
                <ControlButton onClick={() => handleMove('up')} ariaLabel="Mover para cima">⬆️</ControlButton>
                <ControlButton onClick={() => handleMove('down')} ariaLabel="Mover para baixo">⬇️</ControlButton>
                <ControlButton onClick={() => handleMove('left')} ariaLabel="Mover para esquerda">⬅️</ControlButton>
                <ControlButton onClick={() => handleMove('right')} ariaLabel="Mover para direita">➡️</ControlButton>
                <ControlButton onClick={() => handleMove('center')} ariaLabel="Mover para o centro">🎯 Centro</ControlButton>
                <ControlButton onClick={() => handleMove('corner')} ariaLabel="Mover para um canto aleatório">💫 Canto</ControlButton>
            </div>
        </main>
    );
};

export default App;
