// Michael Antrobus
// Michael_Antrobus@student.uml.edu
// Student in 91.601 GUI Programming 1
// 12/6/16
// JS for Scrabble


//Makes sure the document is ready
$(document).ready(
    function () {
         new_game();
        DragAndDrop();
    });

var letters = "";  //The letters available to the player in their tray
var globalScore = 0;  //Total score for the player
var currentScore = 0; //Score of the current round
var tripleWordScore = false; //Whether or not there is a tile on the triple word score tile

//Alphabet array
var piecesArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
//Value array
var valuesArray = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];


//drag and drop 
function DragAndDrop() {
    $(".draggable").draggable({
        //Returns the tile to its original position when you remove it from the board
        revert: function(event, ui) {
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;
        },
        snap: ".droppable",
        snapMode: "inner"
    });
    $(".droppable").droppable({
        accept: ".draggable",
        drop: function (event, ui) {
            ui.draggable.position({
                my: "center",
                at: "center",
                of: $(this),
                using: function (pos) {
                    $(this).animate(pos, 200, "linear");
                }});

            //give scoring the current letter we dropped
            Scoring($(ui.draggable).children("img").attr("alt"), $(this).children("img").attr("alt"));

            $(this).droppable('option', 'accept', ui.draggable);
        }
        
    });
};

//creates new scrabble game
function new_game() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //Possible letters to give to the user
    var random_tile = 0; 
    var triple_tile_used = false; //Boolean to say whether a triple word score tile has been generated
    //Clears the board and the rack
    $("#rack").html("");
    $("#board").html("");

    // generates new random letters until there is enough
    for (var i = letters.length; i < 7; i++)
        letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    //Creates tiles for the rack
    for (var j = 0; j < 7; j++) {
        $("#rack").append("<div class='draggable'>"
            + "<img src='img/Scrabble_Tile_"
            + letters.charAt(j)
            + ".jpg' width=50 height=50 alt='"
            + letters.charAt(j)
            + "'>"
            + "</div>");

        //Generates random board tiles
        random_tile = Math.floor(Math.random() * 4);
        switch (random_tile) {
            case 0:
                $("#board").append("<div class='droppable'>" +
                    "<img src='img/plain_square.png' alt='plain'>" +
                    "</div>");
                break;

            case 1:
                $("#board").append("<div class='droppable'>" +
                    "<img src='img/double_letter_square.png' alt='double_letter'>" +
                    "</div>");
                break;

            case 2:
                if (!triple_tile_used) {
                    triple_tile_used = true;
                    $("#board").append("<div class='droppable'>" +
                        "<img src='img/triple_word_square.png' alt='triple_word'>" +
                        "</div>");
                } else {
                    $("#board").append("<div class='droppable'>" +
                        "<img src='img/plain_square.png' alt='plain'>" +
                        "</div>");
                }
                break;
            case 3:
                $("#board").append("<div class='droppable'>" +
                    "<img src='img/plain_square.png' alt='plain'>" +
                    "</div>");
        }


    }

    //Reinitialize the Drag and drop functionality whenever we create a new board
    DragAndDrop();

    //If the player played a word on the triple word score tile, then triple the score of the entire word and reset the
  
    if (tripleWordScore) {
        currentScore = currentScore * 3;
        tripleWordScore = false;
    }

    //Add the current score of the word to the global score and reset the current score
    globalScore = globalScore + currentScore;
    currentScore = 0;

    //Write the current score of 0 and the users total score to the screen
    $("#total_score").html("<p>Total Score: " + globalScore + "<p>");
    $("#score").html("<p>Current Score: " + currentScore + "<p>");
};

//Function that calculates the total score of the word every time the user moves a tile onto the board
function Scoring(tile, square) {

    var letterscore = 0;

    //Loop through the possible values of the tile and finds the corresponding point value
    for (var i = 0; i < 26; i++) {
        if (tile === piecesArray[i]) {
            letterscore = valuesArray[i];
        }
    }
    //Removes the letter tile from the letter string
    letters = letters.replace(tile, '');

    //If the tile was on a double ltter score tile, double the score
    if (square === "double_letter")
        letterscore = letterscore * 2;

    currentScore += letterscore;

    if (square === "triple_word")
        tripleWordScore = true;

    //write the score on the page
    $("#score").html("<p>Score: " + currentScore + "<p>");
};

