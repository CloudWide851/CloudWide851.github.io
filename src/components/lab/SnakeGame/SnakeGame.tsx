import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Info, Trophy, Ghost } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const [obstacles, setObstacles] = useState<Point[]>([]); // New obstacle state
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Point>(INITIAL_DIRECTION); // Prevent rapid keypress bug
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Initialize high score from local storage
  useEffect(() => {
    const saved = localStorage.getItem('snake-highscore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Utility to check if a point is occupied by anything
  const isOccupied = useCallback((p: Point, currentSnake: Point[], currentObstacles: Point[]) => {
    // Check snake
    if (currentSnake.some(s => s.x === p.x && s.y === p.y)) return true;
    // Check obstacles
    if (currentObstacles.some(o => o.x === p.x && o.y === p.y)) return true;
    return false;
  }, []);

  // BFS to check if path exists from head to food (prevent impossible obstacles)
  const isPathClear = useCallback((start: Point, target: Point, currentSnake: Point[], currentObstacles: Point[]) => {
    const queue = [start];
    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.x === target.x && current.y === target.y) return true;

      const neighbors = [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 }
      ];

      for (const next of neighbors) {
        // Bounds check
        if (next.x < 0 || next.x >= GRID_SIZE || next.y < 0 || next.y >= GRID_SIZE) continue;

        // Obstacle/Body check
        if (isOccupied(next, currentSnake, currentObstacles)) continue;

        const key = `${next.x},${next.y}`;
        if (!visited.has(key)) {
          visited.add(key);
          queue.push(next);
        }
      }
    }
    return false;
  }, [isOccupied]);

  const generateFood = useCallback((currentSnake: Point[], currentObstacles: Point[]) => {
    let newFood: Point;
    let attempts = 0;
    while (attempts < 100) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!isOccupied(newFood, currentSnake, currentObstacles)) return newFood;
      attempts++;
    }
    return { x: 0, y: 0 }; // Fallback (rare)
  }, [isOccupied]);

  const generateObstacles = useCallback((currentSnake: Point[], currentFood: Point[], currentObstacles: Point[]) => {
    let newObstacle: Point;
    let attempts = 0;

    // Try to find a valid spot
    while (attempts < 50) {
      newObstacle = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };

      // 1. Don't spawn on snake, food, or existing obstacles
      if (isOccupied(newObstacle, currentSnake, currentObstacles)) {
        attempts++;
        continue;
      }
      if (newObstacle.x === currentFood[0]?.x && newObstacle.y === currentFood[0]?.y) {
        attempts++;
        continue;
      }

      // 2. Don't spawn too close to head (give player reaction time)
      const head = currentSnake[0];
      const dist = Math.abs(head.x - newObstacle.x) + Math.abs(head.y - newObstacle.y);
      if (dist < 3) {
        attempts++;
        continue;
      }

      // 3. Ensure path still exists (optional optimization: only check sometimes to save perf)
      const tempObstacles = [...currentObstacles, newObstacle];
      if (isPathClear(head, currentFood[0] || {x:0, y:0}, currentSnake, tempObstacles)) {
        return newObstacle;
      }

      attempts++;
    }
    return null;
  }, [isOccupied, isPathClear]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setObstacles([]);
    const initialFood = generateFood(INITIAL_SNAKE, []);
    setFood(initialFood);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const checkCollision = (head: Point, currentSnake: Point[], currentObstacles: Point[]) => {
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
    // Obstacle collision
    if (currentObstacles.some(o => o.x === head.x && o.y === head.y)) {
      return true;
    }

    return false;
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setDirection(nextDirection); // Apply buffered direction

      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + nextDirection.x,
          y: prevSnake[0].y + nextDirection.y
        };

        if (checkCollision(newHead, prevSnake, obstacles)) {
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
          const newScore = score + 1;
          setScore(newScore);

          // Generate new food
          setFood(generateFood(newSnake, obstacles));

          // Generate obstacle logic: 30% chance every 5 points
          if (newScore > 0 && newScore % 5 === 0) {
             if (Math.random() > 0.7) {
                const newObs = generateObstacles(newSnake, [food], obstacles);
                if (newObs) {
                  setObstacles(prev => [...prev, newObs]);
                }
             }
          }
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [isPlaying, gameOver, nextDirection, food, score, highScore, obstacles, generateFood, generateObstacles]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      if (!isPlaying) return;

      // Prevent 180 degree turns using current direction state isn't enough because of rapid key presses
      // Use logic against the *current* direction, but set *nextDirection*

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
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

    // Clear canvas - Dark Theme
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid - Dark Theme
    ctx.strokeStyle = '#1e293b'; // slate-800
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

    // Draw food - Rose-500
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    // Food Glow
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw obstacles - Slate-600
    obstacles.forEach(obs => {
      ctx.fillStyle = '#475569';
      ctx.fillRect(
        obs.x * CELL_SIZE + 1,
        obs.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
      // X mark on obstacle
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(obs.x * CELL_SIZE + 4, obs.y * CELL_SIZE + 4);
      ctx.lineTo((obs.x + 1) * CELL_SIZE - 4, (obs.y + 1) * CELL_SIZE - 4);
      ctx.moveTo((obs.x + 1) * CELL_SIZE - 4, obs.y * CELL_SIZE + 4);
      ctx.lineTo(obs.x * CELL_SIZE + 4, (obs.y + 1) * CELL_SIZE - 4);
      ctx.stroke();
    });

    // Draw snake - Emerald-500
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#10b981' : '#059669'; // Head vs Body
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );

      // Draw eyes for head
      if (index === 0) {
        ctx.fillStyle = 'white';
        // Simple logic to position eyes based on direction
        // (Simplified: just draw two dots)
        ctx.beginPath();
        ctx.arc(segment.x * CELL_SIZE + 6, segment.y * CELL_SIZE + 6, 2, 0, Math.PI * 2);
        ctx.arc(segment.x * CELL_SIZE + 14, segment.y * CELL_SIZE + 6, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

  }, [snake, food, obstacles]);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8">
      {/* Game Board */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="block"
        />

        {(!isPlaying && !gameOver) && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-6 font-display">Snake Game</h3>
            <button
              onClick={resetGame}
              className="group px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
            >
              <Play size={24} className="fill-current" /> Start Game
            </button>
            <p className="mt-6 text-sm text-slate-300 flex items-center gap-2">
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Arrow Keys</span> to move
            </p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-white backdrop-blur-sm">
            <h3 className="text-4xl font-bold mb-2 text-rose-500">Game Over!</h3>
            <p className="mb-8 text-2xl font-light">Score: <span className="font-bold text-white">{score}</span></p>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-white text-slate-900 hover:bg-slate-200 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <RotateCcw size={20} /> Play Again
            </button>
          </div>
        )}

        {isPlaying && (
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full shadow-lg backdrop-blur-sm border border-slate-600 transition-colors"
            title="Pause"
          >
            <Pause size={20} />
          </button>
        )}

        {!isPlaying && !gameOver && snake.length > 1 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
             <button
              onClick={() => setIsPlaying(true)}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
            >
              <Play size={24} className="fill-current" /> Resume
            </button>
          </div>
        )}
      </div>

      {/* Info Panel (Right Side) */}
      <div className="w-full md:w-64 space-y-6">
        {/* Score Card */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Score</div>
            <Trophy size={16} className="text-yellow-500" />
          </div>
          <div className="text-4xl font-bold text-white mb-2">{score}</div>
          <div className="text-sm text-slate-400">Best: <span className="text-emerald-400 font-bold">{highScore}</span></div>
        </div>

        {/* Instructions Card */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3 text-white font-medium">
            <Info size={18} className="text-blue-400" />
            <span>How to Play</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              <span>Eat <strong>Red Food</strong> to grow</span>
            </li>
            <li className="flex gap-2">
              <span className="text-slate-500">•</span>
              <span>Avoid <strong>Grey Obstacles</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500">•</span>
              <span>Don't hit walls or yourself</span>
            </li>
          </ul>
        </div>

        {/* Difficulty Indicator */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 backdrop-blur-sm">
           <div className="flex items-center gap-2 mb-3 text-white font-medium">
            <Ghost size={18} className="text-purple-400" />
            <span>Danger Level</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Obstacles</span>
              <span className="text-white font-bold">{obstacles.length}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-purple-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(obstacles.length * 10, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Obstacles may appear randomly every 5 points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
