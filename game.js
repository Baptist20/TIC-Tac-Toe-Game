function resestGameStatus(){
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML = '<h2>You won <span id="winner-name">PLAYER NAME</span>!</h2>';
  gameOverElement.style.display = 'none';

  let gameBoradIndex = 0;
  for (let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      gameData[i][j] = 0;
      const gameItemElement = gameBoardElement.children[gameBoradIndex]
      gameItemElement.textContent = '';
      gameItemElement.classList.remove('disabled');
      gameBoradIndex++;
    }
  }
}

function startNewGame (){
  if(players[0].name === '' || players[1].name === ''){
    alert('please input custom names for both players!');
    return;
  }

  resestGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = 'block';
}

function selectGameField (event){
  if (event.target.tagName !== 'LI' || gameIsOver){
    return;
  }

  const selectedField = event.target
  const selectedColunm = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if(gameData[selectedRow][selectedColunm] > 0){
    alert('please select an empty field!!!')
    return;
  }

  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add('disabled')

  gameData[selectedRow][selectedColunm] = activePlayer + 1;
  console.log(gameData);

  const winnerId = checkForGameOver();
  if (winnerId !== 0){
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function switchPlayer(){
  if (activePlayer === 0){
    activePlayer = 1;
  } else{
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function checkForGameOver(){
  // checking the rows for equality
  for (let i = 0; i < 3; i++){
    if (
      gameData[i][0] > 0 && 
      gameData[i][0] === gameData[i][1] && 
      gameData[i][1] === gameData[i][2]
      ){
      return gameData[i][0];
    }
  }

  // checking the columns for equality
  for (let i = 0; i < 3; i++){
    if (
      gameData[0][i] > 0 && 
      gameData[0][i] === gameData[1][i] && 
      gameData[1][i] === gameData[2][i]
      ){
      return gameData[0][i];
    }
  }

  // checking for diagonal equality
    if (
      gameData[0][0] > 0 && 
      gameData[0][0] === gameData[1][1] && 
      gameData[1][1] === gameData[2][2]
      ){
      return gameData[0][0];
    }
    if (
      gameData[2][0] > 0 && 
      gameData[2][0] === gameData[1][1] && 
      gameData[1][1] === gameData[0][2]
      ){
      return gameData[2][0];
    }
    if (currentRound === 9){
      return -1;
    }
    return 0;
}

function endGame(winnerId){
  gameIsOver = true;
  gameOverElement.style.display ='block';
  if (winnerId > 0){
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
  }else{
    gameOverElement.firstElementChild.textContent = 'It\'s a draw!'
  }
}