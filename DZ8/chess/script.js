var alphabet = "abcdefgh"; //used for naming chessboard positions
var currentSelect = "";
var chessPieces = [];
var chessField, whiteTaken, blackTaken;
var divOutput = document.getElementById("output");

drawTable();
initPieces();
placePieces();

document.addEventListener("keydown", onKeyDown);
chessField.addEventListener("click", onFieldClicked);
whiteTaken.addEventListener("click", onTakenClicked);
blackTaken.addEventListener("click", onTakenClicked);

function drawTable(){
  //create table, containing chesstable and place for taken pieces
  var myTable = document.createElement("div");
  myTable.className = "myTable";
  document.body.appendChild(myTable);

  //create area for taken pieces (white)
  whiteTaken = document.createElement("div");
  whiteTaken.className = "takenArea";
  myTable.appendChild(whiteTaken);

  //create chessboard 
  var chessBoard = document.createElement("div");
  chessBoard.className = "chessBoard";
  myTable.appendChild(chessBoard);

  //inside chessBoard make areas for numbers and chessfield itself
  var fieldNumbers = document.createElement("div");
  fieldNumbers.className = "cbElement numbers";
  chessBoard.appendChild(fieldNumbers);

  chessField = document.createElement("div");
  chessField.className = "cbElement chessField";
  chessBoard.appendChild(chessField);

  var fieldLetters = document.createElement("div");
  fieldLetters.className = "cbElement letters";
  chessBoard.appendChild(fieldLetters);

  //create area for taken pieces (black)
  blackTaken = document.createElement("div");
  blackTaken.className = "takenArea";
  myTable.appendChild(blackTaken);

  //fill-in taken areas
  for (var i = 0; i < 8; i++){
    for (var j= 0; j < 2; j++){
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.id = alphabet[i] + (j + 1) + "taken";
      whiteTaken.appendChild(cell);
      cell = document.createElement("div");
      cell.className = "cell";
      cell.id = alphabet[i] + (j + 7) + "taken";
      blackTaken.appendChild(cell);
    }
  }

  //fill-in chessfield
  for (var i = 0; i < 8; i++){
    for (var j= 0; j < 8; j++){
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.id = alphabet[j]+(8 - i);
      if ((i + j) % 2){
        cell.className += " black";
      } else {
        cell.className += " white"; //put a chess piece symbol
      }
      chessField.appendChild(cell);
    } 
  }

  //fill-in numbers and letters
  for (var i = 0; i < 8; i++){
    var cell = document.createElement("div");
    cell.className = "cell";
    cell.innerText = alphabet[i];
    fieldLetters.appendChild(cell);

    cell = document.createElement("div");
    cell.className = "cell";
     cell.innerText = 8 - i;
    fieldNumbers.appendChild(cell);
  }
}

function onFieldClicked(e){// when field clicked
  if (e.target.className.indexOf("cell") !== -1){ //if chessfield cell was clicked
    divOutput.textContent = e.target.id; //write cell number into a div for output
    if(currentSelect != ""){ //if previous selection exists
      var oldSelect = document.getElementById(currentSelect);
      oldSelect.style.border = "none";
    }
    currentSelect = e.target.id;
    e.target.style.border = "3px solid yellow";
    
    takePiece(currentSelect);//if has a piece, place it to the taken area
  }
}

function onTakenClicked(e){// when area for taken clicked
  if (e.target.className.indexOf("cell") !== -1){ //if cell was clicked
    var id = e.target.id.slice(0, 2);
    restorePiece(id);//if has a piece, restore it from the taken area
  }
}

function onKeyDown(e){//when any key is pressed, tells selection to move
  switch(e.keyCode){
    case 38: moveSelection("up");
    break;
    case 40: moveSelection("down");
    break;
    case 37: moveSelection("left");
    break;
    case 39: moveSelection("right");
    break;
  }
}
  
function moveSelection(where){  //moves selection around
  if(currentSelect != ""){
    var oldSelect = document.getElementById(currentSelect);
    oldSelect.style.border = "none";
    var newSelect = "";
    switch(where){  //where to move selection
      case "up": {
        newSelect = currentSelect[0];
        if(currentSelect[1] != '8'){
          newSelect += (parseInt(currentSelect[1]) + 1);
        } else newSelect += '1';
      }
      break;
      case "down": {
        newSelect = currentSelect[0];
        if(currentSelect[1] != '1'){
          newSelect += (parseInt(currentSelect[1]) - 1);
        } else newSelect += '8';
      }
      break;
      case "right": {
        if(currentSelect[0] != 'h'){
          newSelect = alphabet[alphabet.indexOf(currentSelect[0]) + 1];
        } else newSelect = 'a';
        newSelect += currentSelect[1];
      }
      break;
      case "left": {
        if(currentSelect[0] != 'a'){
          newSelect = alphabet[alphabet.indexOf(currentSelect[0]) - 1];
        } else newSelect = 'h';
        newSelect += currentSelect[1];
      }
      break;
    }
    currentSelect = newSelect;
    document.getElementById(currentSelect).style.border = "3px solid yellow";
    divOutput.textContent = currentSelect;
  }
}

function initPieces(){ //places pieces on the field
  chessPieces.push(getFigure("white", "tower", "a1"));
  chessPieces.push(getFigure("white", "tower", "h1"));
  chessPieces.push(getFigure("white", "knight", "b1"));
  chessPieces.push(getFigure("white", "knight", "g1"));
  chessPieces.push(getFigure("white", "bishop", "c1"));
  chessPieces.push(getFigure("white", "bishop", "f1"));
  chessPieces.push(getFigure("white", "queen", "d1"));
  chessPieces.push(getFigure("white", "king", "e1")); 
  chessPieces.push(getFigure("black", "tower", "a8"));
  chessPieces.push(getFigure("black", "tower", "h8"));
  chessPieces.push(getFigure("black", "knight", "b8"));
  chessPieces.push(getFigure("black", "knight", "g8"));
  chessPieces.push(getFigure("black", "bishop", "c8"));
  chessPieces.push(getFigure("black", "bishop", "f8"));
  chessPieces.push(getFigure("black", "queen", "d8"));
  chessPieces.push(getFigure("black", "king", "e8"));
  for (var i = 0; i < 8; i++){
    chessPieces.push(getFigure("white", "pawn", alphabet[i] + 2));
    chessPieces.push(getFigure("black", "pawn", alphabet[i] + 7));
  }
}

function getFigure(color, name, position){ //creates object chesspiece
  var piece = {};
  piece.name = name;
  piece.color = color;
  piece.symbol = getSymbol(color, name);
  piece.position = position;
  piece.taken = false;
  return piece;
}

function getSymbol(color, name){  //returns chesspiece symbol in utf-8
  switch(name){
    case "pawn": return color == "white"? '&#9817;': '&#9823;';
    break;
    case "tower": return color == "white"? '&#9814;': '&#9820;';
    break;
    case "bishop": return color == "white"? '&#9815;': '&#9821;';
    break;
    case "knight": return color == "white"? '&#9816;': '&#9822;';
    break;
    case "queen": return color == "white"? '&#9813;': '&#9819;';
    break;
    case "king": return color == "white"? '&#9812;': '&#9818;';
    break;
  }
}

function placePieces(){//puts pieces on the chessboard
  for(var i = 0; i < chessPieces.length; i++){
    var cell = document.getElementById(chessPieces[i].position);
    cell.innerHTML = chessPieces[i].symbol;
  }
}

function takePiece(pos){
  for(var i=0; i < chessPieces.length; i++){
    if(chessPieces[i].position == pos){
      if (!chessPieces[i].taken){
        document.getElementById(pos).innerHTML = "";
        document.getElementById(pos+"taken").innerHTML = chessPieces[i].symbol;
        chessPieces[i].taken = true;
      }
      break;
    }
  }
}

function restorePiece(pos){
  for(var i=0; i < chessPieces.length; i++){
    if(chessPieces[i].position == pos){
      if (chessPieces[i].taken){
        document.getElementById(pos+"taken").innerHTML = "";
        document.getElementById(pos).innerHTML = chessPieces[i].symbol;
        chessPieces[i].taken = false;
      }
      break;
    }
  }
}