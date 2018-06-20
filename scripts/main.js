// creating Characters

class Character {
	constructor(name, attack, defense, hp, img, ){
		this.charName 	= name;
		this.attack 	= attack;
		this.defense 	= defense;
		this.charHP		= hp;
		this.imgSrc		= `./Assets/${img}`;
		this.status		= 'active';

		//default values

		this.attackD	= attack;
		this.defenseD	= defense;
		this.charHpD  	= hp;

	}
};



//defining variables

var natsu 	=new Character("Natsu Dragneel", 10,10,100,"natsu.png" );
var erza	=new Character('Erza Scarlet', 15,20,100,"erza.jpg" );
var gray	=new Character("Gray Fullbuster", 9,9,100,"gray.jpg");
var laxus	=new Character("Laxus Dreyar", 19,9,100,"laxus.jpg");

var Characters = [natsu, erza, gray, laxus];


var gameDiv			= document.querySelector('.gameDiv');
var urFighterDiv  	= document.querySelector('.player');
var urOpponentDiv 	= document.querySelector('.opponent');
var fightButton		= addDOM('button', 'Fight');
	fightButton.classList.add('fightButton');

// music and sounds
// check promises and async
// var theme = document.querySelector('#theme');
// var backgroundPlay = window.onload;




// gameStatus

var gameStatus = {
					player1 : {},
					player2	: {},
					winner 	: {},
					looser 	: {},
					gameMusic: true,
					gameSounds: true,
					fighterSelectCount: 0,
					opponentSelectCount: 0,
					status: "select"
				};



//creating DOM Elements for the characters
var selection = document.querySelector('.selection');

Characters.map(char => addCharacters(char, selection));

// adding click event to the children of Selection div
for(var s of selection.children)
{
	s.addEventListener('click', charSelection)
}

//adding click event to fightButton

fightButton.addEventListener("click", () => {
	if(gameStatus.status ==='ready')
	{
		fight(gameStatus.player1, gameStatus.player2);
		verdict(gameStatus.player1, gameStatus.player2);
	}
});




//<<------------------------------------------------ Functions ------------------------------------------------>>

//fuction responsible to select the players
function charSelection()
{
		if(gameStatus.fighterSelectCount===0  && gameStatus.status ==="select")
		{

			// adding <h2>Your Fighter</h2> to  the selected char Div
			var urFighter = addDOM('h2', 'Your Fighter');
			
			//inserting fighter before the first child of (the charDiv) this
			this.children[0].style.display = 'block';

			this.children[0].insertBefore(urFighter, this.children[0].firstElementChild);
			
			// finally selected Char Div is added to urFighterDiv
			urFighterDiv.appendChild(this);

			// fighterSelectCount stays 1 untill the refresh to avoid the reselection of player1
			gameStatus.fighterSelectCount=1;

			//setting player1 
			gameStatus.player1 = window[this.attributes.value.value];
			console.log(gameStatus.player1);

			anounce("Now, please select your opponent");

		}
	

		else if(gameStatus.opponentSelectCount ===0 && gameStatus.status==="select")
		{
			// adding <h2>Your Fighter</h2> to  the selected char Div
			var urOpponent = addDOM('h2', 'Your Opponent');

			//inserting contender before the first child of the charDiv
			//now the chardetails are visible
			this.children[0].style.display = 'block';
			this.children[0].insertBefore(urOpponent, this.children[0].firstElementChild);
			
			// appending the selected char Div to opponent Div
			urOpponentDiv.appendChild(this);

			//opponentSelection count remains 1  until the current opponent is  defeated. 
			//Upon  defeat, the oponentSelectCount becomes zero.
			gameStatus.opponentSelectCount=1;
			gameStatus.status="ready";

			//setting  the player2
			gameStatus.player2 = window[this.attributes.value.value];
			//console.log(gameStatus.player2);

			// inserting fightButton before .selection in gameDiv

			anounce(`${gameStatus.player1.charName} and ${gameStatus.player2.charName} are ready to fight. Waiting for your signal...`)

			gameDiv.insertBefore(fightButton, selection);




		}
};
 
 //<<--------------------------------------------->>

function addCharacters(char, parentDiv){
	var charDiv = document.createElement('div');
	charDiv.setAttribute('class',"selectionChars");
	var template = `<h2>${char.charName}</h2>
					<h3 class="attack">Attack : ${char.attack}</h3>
					<h3 class="defense">Defense : ${char.defense}</h3>
					<h3 class="charHP">hp : ${char.charHP}</h3>
					`;

	var  charDetails = document.createElement('div');
	charDetails.setAttribute('class','charDetails');
	
	charDetails.innerHTML = template;
	charDiv.appendChild(charDetails);

	var image = document.createElement('img');
	image.setAttribute('src', char.imgSrc);
	image.setAttribute('class', 'charImage');
	
	charDiv.appendChild(image);
	charDiv.setAttribute('value', char.charName.split(' ')[0].toLowerCase());

	return parentDiv.appendChild(charDiv);
}



//<<------------------------------------------------------>>

//function to create DOM and its text
function addDOM(domElement, text){
	var element 	=  document.createElement(domElement);
	var elementText = document.createTextNode(text);
	element.appendChild(elementText);
	return element;
}

//<<------------------------------------------------------->>
function fight(char1, char2){
attack(char1, char2);
attack(char2, char1);
updateStats(gameStatus.player1, urFighterDiv);
updateStats(gameStatus.player2, urOpponentDiv);

//console.log([char1, char2 ]);
}


//<<------------------------------------------------------->>
function attack(attaker, defender){
	var damage = Math.floor((attaker.attack/defender.defense)*10);
	//console.log(defender.charHP - damage);
	return defender.charHP = defender.charHP - damage; 
}


//<--------------------------------------------------------->>
function updateStats(playerNo, parentDiv){
	
	parentDiv.children[0].children[0].children[2].innerText = `Attack : ${playerNo.attack}`;
	parentDiv.children[0].children[0].children[3].innerText = `Defense : ${playerNo.defense}`;
	parentDiv.children[0].children[0].children[4].innerText = `hp : ${playerNo.charHP}`;
}

//<<------------------------------------------------------->>

function verdict(char1, char2){
	var lostDiv 	= addDOM("div", "Defeated");
	lostDiv.setAttribute('class', 'verdict');
	var winDiv 		= addDOM('div', 'Winner');
	winDiv.setAttribute('class', 'verdict'); 
	var drawDiv1	= addDOM('div', 'Draw');
	var drawDiv2	= addDOM('div', 'Draw');


	if(char1.charHP <= 0 && char2.charHP <= 0)
	{
		urFighterDiv.appendChild(drawDiv1);
		urOpponentDiv.appendChild(drawDiv2);
		gameStatus.winner = null;
		gameStatus.looser = null;
		console.log(gameStatus);


	}
	else if(char1.charHP <=0 && char2.charHP>0)
	{
		urFighterDiv.appendChild(lostDiv);
		urOpponentDiv.appendChild(winDiv);
		gameStatus.winner = char2;
		gameStatus.looser = char1;
		anounce(`${gameStatus.winner.charName} fought ${gameStatus.looser.charName} in a arduous battle and emerged as winner. Sorry! GAMEOVER `);
		console.log(gameStatus);
	}
 	else if(char1.charHP > 0 && char2.charHP<= 0)
 	{
 		urFighterDiv.appendChild(winDiv);
 		urOpponentDiv.appendChild(lostDiv);
 		gameStatus.winner = char1;
 		gameStatus.looser = char2;
 		gameStatus.status = "select";
 		onPlayerWin();
 		anounce(`'${gameStatus.winner.charName}' fought '${gameStatus.looser.charName}' in a arduous battle and emerged as winner. Congratulations! Now, please select the next opponent.`);
 		console.log(gameStatus);
 	}
}

function anounce(anouncement){
	document.querySelector('#anouncement').innerText = anouncement;
}

function onPlayerWin(){
	// reset the stats of hero
	// boost all stats by 20%
	resetAndBoost(gameStatus.player1, 1.20);
	
	//player2 count  to 0
	gameStatus.opponentSelectCount = 0;
	urOpponentDiv.innerHTML= "";
	// select next opponent 

}

function resetAndBoost(char, boost){
	char.attack = (char.attackD * boost);
	char.defense= Math.floor(char.defenseD * boost);
	char.charHP= Math.floor(char.charHpD * boost);
	updateStats(gameStatus.player1, urFighterDiv);
}






