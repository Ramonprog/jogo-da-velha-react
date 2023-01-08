import { useEffect, useState } from "react";

function App() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("o");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (i) => {
    if (winner) return;
    if (board[i] !== "") return;

    setBoard(board.map((item, index) => (index === i ? currentPlayer : item)));

    setCurrentPlayer((pev) => (pev === "x" ? "o" : "x"));
  };

  const checkDraw = () => {
    if (board.every((item) => item !== "")) {
      setWinner("e");
    }
  };

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach((cells) => {
      if (cells.every((cell) => cell === "o")) setWinner("o");
      if (cells.every((cell) => cell === "x")) setWinner("x");
    });

    checkDraw();
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  const resetGame = () => {
    setCurrentPlayer("o");
    setBoard(emptyBoard);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1 className="title">Jogo da Velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, i) => (
          <div
            key={i}
            className={`cell ${item}`}
            onClick={() => handleCellClick(i)}
          >
            {item}
          </div>
        ))}
      </div>
      {winner && (
        <footer>
          {winner === "e" ? (
            <h2 className="winner-message">
              <span className={`winner ${winner}`}>Empatou</span>
            </h2>
          ) : (
            <h2 className="winner-message">
              <span className={`winner ${winner}`}>{winner}</span> Venceu !
            </h2>
          )}

          <button onClick={resetGame}>Recomeçar jogo</button>
        </footer>
      )}
    </div>
  );
}

export default App;
