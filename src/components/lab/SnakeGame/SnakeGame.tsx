import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

// Game constants
const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

type Point = { x: number; y: number };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Initialize high score from local storage
  useEffect(() => {
    const saved = localStorage.getItem('snake-highscore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food spawns on snake
      const onSnake = currentSnake.some(
        segment => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const checkCollision = (head: Point, currentSnake: Point[]) => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision (ignore head)
    for (let i = 1; i < currentSnake.length; i++) {
      if (head.x === currentSnake[i].x && head.y === currentSnake[i].y) {
        return true;
      }
    }
    return false;
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };

        if (checkCollision(newHead, prevSnake)) {
          setGameOver(true);
          setIsPlaying(false);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snake-highscore', score.toString());
          }
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [isPlaying, gameOver, direction, food, score, highScore, generateFood]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, direction]);

  // Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f9fafb'; // gray-50
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid (optional, subtle)
    ctx.strokeStyle = '#e5e7eb'; // gray-200
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#ef4444'; // red-500
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#059669' : '#10b981'; // emerald-600 head, emerald-500 body
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

  }, [snake, food]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="w-full flex justify-between items-center mb-4 px-2">
        <div className="text-gray-600 font-medium">Score: <span className="text-primary-600 font-bold">{score}</span></div>
        <div className="text-gray-500 text-sm">Best: {highScore}</div>
      </div>

      <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="block"
        />

        {(!isPlaying && !gameOver) && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-4">Snake Game</h3>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-full font-medium transition-colors flex items-center gap-2"
            >
              <Play size={20} /> Start Game
            </button>
            <p className="mt-4 text-sm text-gray-200">Use arrow keys to move</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold mb-2">Game Over!</h3>
            <p className="mb-6 text-xl">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-medium transition-colors flex items-center gap-2"
            >
              <RotateCcw size={20} /> Play Again
            </button>
          </div>
        )}

        {isPlaying && (
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-sm backdrop-blur-sm"
            title="Pause"
          >
            <Pause size={20} />
          </button>
        )}

        {!isPlaying && !gameOver && snake.length > 1 && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
             <button
              onClick={() => setIsPlaying(true)}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors flex items-center gap-2 shadow-lg"
            >
              <Play size={20} /> Resume
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
          Controls: Arrow Keys
        </div>
      </div>
    </div>
  );
}
