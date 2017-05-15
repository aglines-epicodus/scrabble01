
var testLetters = [ "A", "B", "C", "F", "P", "O", "O", "T", "R", "S","C","V","D","I","I","N","N","M","M","E","R","R","T","L","L","Q","Z","H","J","G","_"];
var initialBag = [];
for (var i = 0; i < 15; i++) {
  // this is testing code;  later, check actual letterValues
  var tile = new Tile(testLetters[i], i);
  initialBag.push(tile);
}
// console.log(arrayObj);

// test dictionary
var dictionary = ["cat", "tree", "rain", "wind"];

function Bag() {
  this.bagTiles = [];
};

function Game() {
};
function Player(name, rack) {
  this.name = name;
  this.score = 0;
  this.rack = rack;
  this.currentWord = [];
};

function Cell(x, y, pointMultiplier) {
  this.x = x;
  this.y = y;
  this.pointMultiplier = pointMultiplier;
  this.tile = {};
};
function Tile(letter, letterValue) {
  this.letter = letter;
  this.letterValue = letterValue;
};

function Rack() {
  this.rackTiles = [];
  this.needNumber = 7;
};

Player.prototype.buildWord = function (tile) {
  return this.currentWord.push(tile);
};

Game.prototype.checkHorizontalPosition = function (currentWord) {
  var checkHorizontal;
  for (var i = 0; i < currentWord.length-1; i++) {
    console.log("currentWord[i] = ", currentWord[i]);
    // var j = i + 1;
    // console.log(j);
    if (currentWord[i].x === currentWord[i+1].x) {
      checkHorizontal = true;
    } else {
      checkHorizontal = false;
    }
  }
  return checkHorizontal;
};
Game.prototype.checkVerticalPosition = function (currentWord) {
  var checkVertical;
  for (var i = 0; i < currentWord.length-1; i++) {
    if (currentWord[i].y === currentWord[i+1].y) {
      checkVertical = true;
    } else {
      checkVertical = false;
    }
  }
  return checkVertical;
};

Game.prototype.countScore = function(currentWord, cells) {
  var currentWordScore = 0;
  debugger;
  for (var i = 0; i < currentWord.length; i++) {
    // count any letters with double letter score;
    if ( cells[i].pointMultiplier === parseInt("2") ) {
      currentWord[i].letterValue *= 2;
    }
    // add all individual tile counts (with above);
    currentWordScore += currentWord[i].letterValue;

    // multiply any word-level multipliers (2w, 3W);
    if (cells[i].pointMultiplier === "2W") {
      currentWordScore *= 2;
      }
  }
  return currentWordScore;
  console.log("current word score = ", currentWordScore);
};

Game.prototype.checkValidWord = function (currentWord) {
 return dictionary.includes(currentWord);

};

Rack.prototype.generateRack = function (needNumber,initialBag) {
  for (var i = 0; i < needNumber; i++) {
    var currentRandomInt = getRandomInt(0, 15);
    this.rackTiles.push(initialBag[currentRandomInt]);
    initialBag.splice(currentRandomInt, 1);
  };
}

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
};

$(function () {
  // var word = JSON.parse(bag);
  // // console.log(JSON.parse(words));
  // console.log(JSON.parse(word));
  // console.log(word[1]);
  var rack = new Rack();
  rack.generateRack(7, initialBag);

  var scrabbleGame = new Game();
  var player = new Player ("Tom", rack);
  // console.log("player = ", player);
  var cells=[];
  for (var i = 0, j = 0; i < 5; i++) {
    var cell = new Cell(i, j, 2, rack.rackTiles[i]);
    cells.push(cell);
    player.buildWord(rack.rackTiles[i]);
    // console.log("word = ", player.currentWord);
    // console.log("rack.rackTiles[i] = ",rack.rackTiles[i]);
  }
  console.log("game score = ", scrabbleGame.countScore(player.currentWord, cells));
  // console.log("horiz position = ", scrabbleGame.checkHorizontalPosition(cells));
  // console.log("vertical position = ", scrabbleGame.checkVerticalPosition(cells));
  // console.log("array is a valid word = ",   scrabbleGame.checkValidWord("array"));
  // console.log(word[2]);
});



// buildGameGrid(row, col){
//     let square = null
//     let GameArray = []
//     for(var tempRow = 0; tempRow < row; tempRow++){
//         GameArray.push([])
//     GameArray[tempRow].push(new Array(col))
//     for(var tempCol = 0; tempCol < col; tempCol++){
//           square = new Square(tempRow, tempCol)
//           GameArray[tempRow][tempCol] = square.render()
//         }
//     }
//     return GameArray
//  };
