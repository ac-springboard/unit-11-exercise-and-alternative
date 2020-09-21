/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

let gameIsRunning = true;
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

 /////avoid using global variables as much as possible
function makeBoard() {
  let localBoard = []
  // TODO: [DONE] set "board" to empty HEIGHT x WIDTH matrix array
  for ( let i = 0; i < HEIGHT; i++){
    localBoard[i] = new Array( WIDTH );
    localBoard[i].fill(null);
  }

  return localBoard;
  // console.log( 'test/board:', board );
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: [DONE] get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById( "board")

  // TODO: [DONE] add comment for this code
  /* Create an 'tr' (table row) and attribute it to the constant 'top' */
  const top = document.createElement("tr");
  /* Set 'column-top' as the id of the DOM element created above */
  top.setAttribute("id", "column-top");
  /* Set a 'click' event to 'column-top' element, to be treated by the function 'handleClick' */
  top.addEventListener("click", handleClick);

  /* For each column index of the table... */
  for (let x = 0; x < WIDTH; x++) {
    /* ... create a 'td' element (table column)... */
    const headCell = document.createElement("td");
    /* ... set the index (variable 'x' in the 'for' loop as its id ... */
    headCell.setAttribute("id", x); /* (My customization) */
    /* ... add the newly created 'td' element to the 'column-top' of the table created before... */
    top.append(headCell);
  }
  /* ... finally, send the entire row ('column-top)' to the DOM to be rendered. */
  htmlBoard.append(top);

  // TODO: [DONE] add comment for this code
  /* For each index row... */
  for (let y = 0; y < HEIGHT; y++) {
    /* ... create a corresponding table row... */
    const row = document.createElement("tr");
    /* ... for each column index... */
    for (let x = 0; x < WIDTH; x++) {
      /* ... create a new table column element ('td')... */
      const cell = document.createElement("td");
      /* ... set the 'td' element's id as a String with the pattern <row>-<col>... */
      cell.setAttribute("id", `${y}-${x}`);
      /* ... add the 'td' element to the table row created at the line 56... */
      row.append(cell);
    }
    /* ... finally, send the entire set of rows to the DOM to be rendered. */
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for ( let i = HEIGHT - 1; i >= 0; i-- ){
    if ( board[i][x] === null ){
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
////piece abstraction to breakdown this into 2 smaller functions
function createPiece(currPlayer){
  const piece = document.createElement('div');
  piece.classList.add('piece', 'p'+currPlayer );

  return piece;
}

function placeInTable(y, x, piece) {
  // TODO: [DONE] make a div and insert into correct table cell
  const correctTd = document.getElementById(`${y}-${x}` );
  correctTd.append( piece );
}

/** endGame: announce game end */
////game state control
function endGame(msg) {
  gameIsRunning = false;
  // TODO: [DONE] pop up alert message
  alert( msg );
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  if(gameIsRunning === false)
    return;
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if ( y === null ) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: [DONE] add line to update in-memory board
  let piece = createPiece(currPlayer);
  placeInTable(y, x, piece);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: [DONE] check if all cells in board are filled; if so call, call endGame
  ////rename to checkForTie to be more expressive
  const checkForTie = () => board.flat().every( ( elem ) => elem !== null );
  if (checkForTie()){
    ////was missing return
    return endGame("That's a TIE!" );
  }

  // TODO: [DONE] switch currPlayer 1 <-> 2
  ////switchPLayers to be more expressive also
  switchPlayers()
}

function switchPlayers(){
  currPlayer = currPlayer === 1 ? 2 : 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    /* Given the row 'y'... */
    for (let x = 0; x < WIDTH; x++) {
      /* ... and the col 'x'... */
      /* ... get the 4 horizontal coordinates starting at (x, y) ... */
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      /* ... get the 4 vertical coordinates starting at (x, y)... */
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      /* ... get the 4 diagonal coordinates to the right ('\') starting at (x, y)... */
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      /* ... get the 4 diagonal coordinates to the left ('/') starting at (x, y) */
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      /* If any of the above is valid in the HEIGHT x WIDTH domain AND
         is filled with the same player, then this player is the winner.
       */
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

board = makeBoard();
makeHtmlBoard();
