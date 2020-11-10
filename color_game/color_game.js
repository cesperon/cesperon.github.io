//generate an array of random color rgb strings
var colors = generateRandomColors(6);
var pickedColor = pickColor(colors);
var squares = document.querySelectorAll(".square");
var guessColor = document.querySelector("#guessColor");
var guessIS = document.getElementById("guessIS");
var h1 = document.querySelector("h1");
var easyMode = document.querySelector("#easyMode");
var hardMode = document.querySelector("#hardMode");
var newColors = document.querySelector('#newColors');
var info = document.querySelector('#info');
//bool flags for easy and hardmode
var hardClicked = true;
var easyClicked = false;

//initialize game buttons
buttons_init();

//initializes squares and provides logic for game rules
squares_init();

//intializes buttons for game
function buttons_init(){

	info.addEventListener("click", function(){

		alert("Click the square which corresponds to the RGB value above!");
	});
	//color to guess
	guessColor.innerHTML = pickedColor;

	easyMode.addEventListener("click", function(){

		easyModeEngaged(this);
		
	});
	hardMode.addEventListener("click", function(){

		hardModeEngaged(this);
	});

	//click event for new colors button
	newColors.addEventListener("click", function(){

		if(easyClicked){

			newColorSelect(3);
		}
		if(hardClicked){
			newColorSelect(6);
		}
	});

}

//initializs squares and game logic
function squares_init(){
	for(var i =0; i<squares.length; i++){
	//add initial colors to squares
	squares[i].style.background = colors[i];

	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		//grab color of clicked square
		var thisColor = this.style.background;
		//compare color to picked color if true you win
		if(thisColor === pickedColor){

			guessIS.innerHTML = "Correct!";
			guessIS.style.color = "rgb(71,162,127)";
			changeColors(squares);
			newColors.innerHTML = "PLAY AGAIN?";


		}
		//picked color does not equal this color
		else{

			this.style.background = "#232323";
			guessIS.innerHTML = "Try Again";
			guessIS.style.color = "red";

		}
});
}

}

//function changes square colors to pickedColor
function changeColors(colors){

	for(var i =0; i<colors.length; i++){

			colors[i].style.background = pickedColor;
		}

	h1.style.background = pickedColor;

}

//picks a random number which to choose color from array
function pickColor(colors){

	var randColor = Math.floor((Math.random() * colors.length) );

	return colors[randColor];
}

//generate random rgb arrays
function generateRandomColors(num){

	 var colorArray = [];
	 for(var i = 0; i < num ; i++){

		 colorArray.push(randomRGB());
		}
	return colorArray;

}

//generate random rgb string
function randomRGB(){

	var num1 = Math.floor((Math.random() * 255) +1);
	var num2 = Math.floor((Math.random() * 255) +1);
	var num3 = Math.floor((Math.random() * 255) +1);

	var string = "rgb(" + String(num1) + ", " + String(num2) + ", " + String(num3) + ")";

	return string;

}

//handles when easy mode button is engaged
function easyModeEngaged(vars){

	easyClicked = true;
	hardClicked = false;
	vars.classList.add("selected");
	hardMode.classList.remove("selected");
	//block display of bottome 3 squares
	for(var i = squares.length/2; i < squares.length; i++ ){
		squares[i].style.display = "none";
	}

	colors = generateRandomColors(3);
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.background = colors[i];
		}
	}
	pickedColor = pickColor(colors);
	guessColor.innerHTML = pickedColor;

}

//handles when hard mode button is engaged
function hardModeEngaged(vars){

	hardClicked = true;
	easyClicked = false;
	vars.classList.add("selected");
	easyMode.classList.remove("selected");
	colors = generateRandomColors(6);
	for(var i = 0; i < squares.length; i++ ){
		squares[i].style.display = "block";
		squares[i].style.background = colors[i];
	}
	pickedColor = pickColor(colors);
	guessColor.innerHTML = pickedColor;

}

//generates new colors of new color button when easy or hard mode
//is selected
function newColorSelect(num){

		colors = generateRandomColors(num);
		for(var i = 0; i < num; i++){
			if(colors[i]){
				squares[i].style.background = colors[i];
			}

		}
		pickedColor = pickColor(colors);
		guessColor.innerHTML = pickedColor;
		newColors.innerHTML = "NEW COLORS";
		guessIS.innerHTML = "";
		h1.style.background = "rgb(187, 159, 251)";

}
