// creating Characters

class Character {
	constructor(name, attack, defense, hp, img, ){
		this.charName 	= name;
		this.attack 	= attack;
		this.defense 	= defense;
		this.charHP		= hp;
		this.imgSrc		= `./assets/${img}`;
		this.status		= 'active';

	}
};

var natsu 	=new Character("Natsu Dragneel", 10,10,100,"natsu.png" );
var erza	=new Character('Erza Scarlet', 15,20,100,"erza.jpg" );
var gray	=new Character("Gray Fullbuster", 9,9,100,"gray.jpg");
var laxus	=new Character("Laxus Dreyar", 19,9,100,"laxus.jpg");

var Characters = [natsu, erza, gray, laxus];
var fighterSelectCount =0;
var opponentSelectCount=0;

var player = document.querySelector('.player');
var opponent= document.querySelector('.opponent');

//creating DOM Elements for the characters
var selection = document.querySelector('.selection');
Characters.map(char => addCharacters(char, selection));


selection.addEventListener('click', e => {
	console.log(!!e.target.attributes.value.value);
	if(e.target.attributes.value.value){

			var nameStr = e.target.attributes.value.value;
			nameStr = nameStr.split(' ')[0].toLowerCase();

		if(fighterSelectCount===0 ){
			player.innerHTML = "";
			addCharacters(window[nameStr], player);
			fighterSelectCount=1;
			}
		else if(opponentSelectCount ===0 )
		{
			opponent.innerHTML='';
			addCharacters(window[nameStr], opponent);
			opponentSelectCount=1;
		}
	}
});












function addCharacters(char, parentDiv){
	var charDiv = document.createElement('div');
	charDiv.setAttribute('class',"selectionChars");
	var template = `<h2>${char.charName}</h2>
					<h3>Attack 	:${char.attack}</h3>
					<h3>Defense :${char.defense}</h3>
					<h3>hp 		:${char.charHP}</h3>
					`;

	var  charDetails = document.createElement('div');
	charDetails.setAttribute('class','charDetails');
	
	charDetails.innerHTML = template;
	charDiv.appendChild(charDetails);

	var image = document.createElement('img');
	image.setAttribute('src', char.imgSrc);
	image.setAttribute('class', 'charImage');
	
	charDiv.appendChild(image);
	charDiv.setAttribute('value', char.charName);

	return parentDiv.appendChild(charDiv);
}

