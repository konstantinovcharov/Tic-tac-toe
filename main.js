const Gameboard = {
    gameboard: ["", "", "", "", "", "", "", "", ""],
  
    updateCell: function(index, marker) {
      if (this.gameboard[index] === "") {
        this.gameboard[index] = marker;
        this.render();
        this.checkGameOver();
        switchPlayers();
      }
    },
  
    render: function() {
      for (let i = 0; i < this.gameboard.length; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.textContent = this.gameboard[i];
      }
    },
  
    isFull: function() {
      for (let i = 0; i < this.gameboard.length; i++) {
        if (this.gameboard[i] === "") {
          return false;
        }
      }
      return true;
    },
  
    reset: function() {
      this.gameboard = ["", "", "", "", "", "", "", "", ""];
      this.render();
      currentPlayer = "X";
      message.textContent = "";
      gameover = false;
    },
  
    checkGameOver: function() {
      const winner = checkWinner();
      if (winner) {
        message.textContent = `${winner} wins!`;
        gameover = true;
      } else if (this.isFull()) {
        message.textContent = "Tie game!";
        gameover = true;
      }
    }
  };
  
  let currentPlayer = "X";
  let gameover = false;
  const message = document.getElementById("message");
  
  function switchPlayers() {
    if (currentPlayer === null) {
      currentPlayer = "X";
    } else if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
  }
  
  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let i = 0; i < winningCombos.length; i++) {
      const combo = winningCombos[i];
      if (
        Gameboard.gameboard[combo[0]] === currentPlayer &&
        Gameboard.gameboard[combo[1]] === currentPlayer &&
        Gameboard.gameboard[combo[2]] === currentPlayer
      ) {
        return currentPlayer;
      }
    }
  
    return null;
  }
  
  function handleClick(event) {
    console.log('Cell clicked');
    if (!gameover && event.target.classList.contains("cell")) {
      const index = event.target.id.split("-")[1];
      Gameboard.updateCell(index, currentPlayer);
    }
  }
  
  function resetGame() {
    Gameboard.reset();
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    Gameboard.render();
    document.getElementById("game-board").addEventListener("click", handleClick);
    document.getElementById("restart-button").addEventListener("click", resetGame);
  });