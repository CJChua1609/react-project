import React, {useEffect, useRef, useState} from 'react';
import './SnakeGame.css'

const GRID_SIZE = 20;
const CELL_SIZE = 30;

// generate random food within grid size
function getRandomFood(snake) {
    return {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
    };
}

// Main snake Game
export default function SnakeGame() {
    const [snake, setSnake] = useState([
        { x: 5, y: 5 },
        { x: 4, y: 5 },
    ]);

    const [food, setFood] = useState(getRandomFood(snake)); // food spawner
    const [gameOver, setGameOver] = useState(false); // game over state
    const [started, setStarted] = useState(false);
    const [score, setScore] = useState(0);

    const directionRef = useRef("RIGHT");
    const pendingDirectionRef = useRef("RIGHT");

    // prevents instant reverse in snake direction
    const opposite = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
    };

    // handle keyboard inputs
    const nextDirectionRef = useRef(null);

    useEffect(() => {
        const handleKey = (e) => {
            let newDir;
            console.log(e.key);
            switch (e.key) {
                case "ArrowUp":
                    newDir = "UP";
                    break;
                case "ArrowDown":
                    newDir = "DOWN";
                    break;
                case "ArrowLeft":
                    newDir = "LEFT";
                    break;
                case "ArrowRight":
                    newDir = "RIGHT";
                    break;
                default:
                    return;
            }

            // prevent reversing into itself
            if (opposite[directionRef.current] !== newDir) {
                pendingDirectionRef.current = newDir;
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey); // prevents memory leaks
    }, []);

    // game restart
    const restartGame = () => {
        setSnake([
            { x: 5, y: 5 },
            { x: 4, y: 5 },
        ]);

        setFood(getRandomFood(snake));
        directionRef.current = "RIGHT";
        pendingDirectionRef.current = "RIGHT";
        setGameOver(false);
        setScore(0);
        setStarted(true);
    };

    // game loop
    const gameRef = useRef(null);
    
    useEffect(() => {
        // game ends when gameOver is triggered
        if (gameOver || !started) return;
        window.focus();

        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const dir = pendingDirectionRef.current;
                
                // commit the direction for this tick
                directionRef.current = dir;

                const head = prevSnake[0];
                let newHead = { ...head };

                // handles movement
                if (dir === "UP") newHead.y -= 1;
                if (dir === "DOWN") newHead.y += 1;
                if (dir === "LEFT") newHead.x -= 1;
                if (dir === "RIGHT") newHead.x += 1;

                // handles wall collision
                if (
                    newHead.x < 0 ||
                    newHead.y < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y >= GRID_SIZE
                ) {
                    setGameOver(true);
                    return prevSnake;
                }

                // handles self collison
                for (let segment of prevSnake) {
                    if (segment.x === newHead.x && segment.y === newHead.y) {
                        setGameOver(true);
                        setStarted(false);
                        return prevSnake;
                    }
                }
                // handles eats food
                let newSnake = [newHead, ...prevSnake];

                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood(getRandomFood(newSnake));
                    setScore(score + 1);
                } else {
                    newSnake.pop(); // move forward
                }

                return newSnake;
            });
        }, 250);

        return () => clearInterval(interval);
    }, [food, gameOver, started]);

    return (
        <div className='game-container' style={{ textAlign: "center" }}>
            <h2 className='game-title'>🐍 Snake Game</h2>
            <h3>Score: {score}</h3>
            <div
                style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
                margin: "0 auto",
                position: "relative",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://as2.ftcdn.net/v2/jpg/01/36/83/55/1000_F_136835511_ps5tf3V5XeAABudv49VTm52OkYMi8tyo.jpg')`,
                backgroundSize: "cover",       /* Fits the entire apple graphic inside the cell layout */
                backgroundRepeat: "no-repeat",   /* Stops the apple from creating duplicates inside the cell */
                backgroundPosition: "center",
                // background: "#111",
                boxShadow: `
                    0 0 10px rgba(0, 255, 255, 0.4),
                    0 0 30px rgba(0, 255, 255, 0.3),
                    0 0 60px rgba(0, 255, 255, 0.2)
                    `,
                }}
            >
                {/* Snake */}
                {snake.map((segment, i) => (
                <div
                    key={i}
                    style={{
                    position: "absolute",
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    background: i === 0 ? "lime" : "green",
                    borderRadius: "40%",
                    left: segment.x * CELL_SIZE,
                    top: segment.y * CELL_SIZE,

                    boxShadow: i === 0 
                    ? "0 4px 8px rgba(0, 0, 0, 0.6), 0 0 10px rgba(0, 255, 0, 0.4)" // Glowing shadow for the head
                    : "0 4px 6px rgba(0, 0, 0, 0.5)",                              // Standard deep shadow for body segments
                    
                    zIndex: i === 0 ? 2 : 1, /* Keeps the head and its shadow layered perfectly over the body */
                    }}
                />
                ))}

                {/* Food */}
                <div
                style={{
                    position: "absolute",
                    width: CELL_SIZE,
                    height: CELL_SIZE,

                    backgroundImage: `url('https://png.pngtree.com/png-clipart/20241230/original/pngtree-apple-clipart-vector-png-image_18352516.png')`,
                    backgroundSize: "contain",       /* Fits the entire apple graphic inside the cell layout */
                    backgroundRepeat: "no-repeat",   /* Stops the apple from creating duplicates inside the cell */
                    backgroundPosition: "center",
                    left: food.x * CELL_SIZE,
                    top: food.y * CELL_SIZE,

                    /* ADDED: Outlines the actual transparent apple shape with a dark drop shadow and a soft red neon glow */
                    filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.6)) drop-shadow(0px 0px 5px rgba(239, 68, 68, 0.5))",
    
                    zIndex: 3, /* Keeps the apple and its glow resting cleanly on top of the snake body layers */
                }}
                />

                {(!started || gameOver) && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0,0,0,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            zIndex: 10,
                            color: "white",
                        }}
                    >
                        <div className='snake-overlay'>
                            <h3 className='snake-overlay-text'>{gameOver ? "Game Over" : "Snake Game"}</h3>

                            <button className='snake-start-btn' onClick={() => {gameOver ? restartGame() : setStarted(true)}}>
                                {gameOver ? "Restart" : "Start"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}