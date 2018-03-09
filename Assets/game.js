window.onload = function() // to make sure that JS loads after the webpage is loaded

{


	var audio = new Audio("Assets/FairyTailTheme.mp3");
	var mouseClick = new Audio("Assets/MouseClick.mp3");
	audio.play();
	audio.volume = 0.2;
	
	// $("#mute").on("click",function(){
	// 	$("#mute").toggle(
	// 		function()
	// 			{audio="";
	// 			mouseClick ="";
	// 			},
	// 		function() 
	// 			{audio =new Audio("Assets/FairyTailTheme.mp3");
	// 			mouseClick =new Audio("Assets/MouseClick.mp3");

	// 			})
	// 	});


	$("#music").on("click", function(){
		audio.pause();
		mouseClick.play();

		});
	// start playing FairyTail Theme music

	// Add "BackGround Kill" Button to stop the background music
	// Add "Mute" button to stop all the sounds from the game.


	$("#welcome").text("Welcome! to the FairyTail Game. Please select your fighter.")


// creating the objects

var natsuDragneel = {
	name : "Natsu Dragneel",
	attack: 10,
	defense: 10,
	hp: 100,
	imageSource: "./Assets/natsuDragneel.png"
		};


var erzaScarlet = {
	name : "Erza Scarlet",
	attack: 15,
	defense: 20,
	hp: 100,
	
	
		};

var grayFullbuster = {
	name : "Gray Fullbuster",
	attack: 9,
	defense: 9,
	hp: 100,
	
	
		};

var laxusDreyar = {
	name : "Laxus Dreyar",
	attack: 19,
	defense: 9,
	hp: 100,
	
	
		};



// // creating an array to track the active players.

// var array = [natsuDragneel.name, erzaScarlet.name, grayFullbuster.name, laxusDreyar.name];
// console.log(array); // to check if the array  is working


// creating the variables 

var hero = {}; // created hero object variable
var challenger ={}; // crated challenger object variable
var fightCount = 0;
var gameOver = 0;
var player1selected = 0; // if player 1 is selected the value becomes 1.
var player2selected = 0; // If player 2 is selected the value becomes 1.
var player3selected = 0; // If player 3 is selected the value become 1. 


function stats(){
	console.log(hero);
	$("#heroHeader").text(hero.name);
	$('#heroImage').attr("src", hero.imageSource)
	$("#heroAttack").text("Attack: "+hero.attack);
	$("#heroDefense").text("Defense: "+hero.defense);
	$("#heroHp").text("HP: "+hero.hp);
	}

function stats2(){
	console.log(hero);
	$('#heroImage').attr("src", hero.imageSource)
	$("#cHeader").text(challenger.name);
	// $("#cImage").text(challenger.image );
	$("#cAttack").text("Attack: "+challenger.attack);
	$("#cDefense").text("Defense: "+challenger.defense);
	$("#cHp").text("HP: "+challenger.hp);
	
	}


function fight() {
	
	$("#displayDiv").css({"position": "absolute", "top": "461px", "left": "69px"});

	var r = $('<button/>').text("Fight").appendTo("#button");
	r.css({"position":"absolute", "top":"125px","left":"536px","width":"150px", "height":"30px", "border-radius":"8px"});
	}

		

function verdict () {

	if ((challenger.hp <=0) && (hero.hp >0) && (player1selected==4)) {
		$("#welcome").text("Congratulation! on defeating all");
		player1selected ++;
		console.log(player1selected);
		var z = $('<button/>').text("Refresh").appendTo("#button");

		z.css({"position":"absolute", "top":"125px","left":"536px","width":"150px", "height":"30px","border-radius":"8px"})
		
	}

	else if ((challenger.hp <=0) && (hero.hp >0)) {
		
		player2selected =3;
		player1selected ++;
		console.log(player1selected);
		$("#button").hide();
		$("#welcome").text("Congratulation! on defeating "+challenger.name+". Please select the next opponent");
		challenger = {
						name: "",
						attack: 0,
						hp: 0,
						defense: 0
						};
		hero.hp = 100;	
		var bonus = Math.floor(hero.attack + (hero.attack*0.4));
		var attackBonus = Math.floor(hero.attack*0.4);
		hero.attack = bonus;
		bonus = Math.floor(hero.defense + (hero.defense *0.4));
		var defenseBonus = Math.floor(hero.defense *0.4);
		hero.defense = bonus;
		stats();
		$("#heroAttack").text("Attack: "+hero.attack +" + "+attackBonus);
		$("#heroDefense").text("Defense: "+hero.defense +" + "+defenseBonus);	
		stats2();
		
		}

	else if ((hero.hp <=0) && (challenger.hp >0)){
		
		$("#welcome").text("Your warrior "+hero.name+" has fallen. Sometimes failure are the stepping stones to success. Train you warrior hard next time");

		var a = $('<button/>').text("Refresh").appendTo("#button");

		a.css({"position":"absolute", "top":"125px","left":"536px","width":"150px", "height":"30px", "border-radius":"8px"})
		
		gameOver =1;
		
		} 
}
// 	else if (fightCount ==3){

// 		$("#welcome").text("Your warrior "+hero.name+" has defeated all his opponents. Congratulation! GameOVer");
		
		
	
// creating the On-Click function to the #natsu
$("#natsu").on("click",function(){

	console.log(hero);
	if (player1selected == 0) {
		mouseClick.play();
	hero = natsuDragneel; // Natsu becomes hero
	player1selected ++;
	$('#heroImage').attr("src", hero.imageSource)
	// function to update the 1st status div
	stats();
	$("#welcome").text("You have selected "+hero.name+". Now please select your opponent.");
	$("#natsu").hide(); // hide natsu
	fight(); // bring the stats bar above the displayDiv
	}

	else if ((player1selected == 1) && (hero != natsuDragneel)) {
		mouseClick.play();
		challenger = natsuDragneel;
		player2selected=1;
		player1selected = 2;			
		stats2(); // updating the 2nd status div
		$("#natsu").hide(); // hide natsu
		$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");

	}

	else if ((player2selected ==3) && (hero != natsuDragneel)) {
				mouseClick.play();
				challenger = natsuDragneel;
				player2selected=4;
			
		stats2(); // updating the 2nd status div
		$("#natsu").hide(); // hide natsu
		$("#button").show();
		$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");
	}

});




$("#erza").on("click",function(){
	
	if (player1selected == 0) {
	
		mouseClick.play();
	hero = erzaScarlet; // erza becomes hero
	player1selected = 1;
			console.log(player1selected);
			console.log(player2selected);
	// function to update the 1st status div
	stats();
	$("#erza").hide(); // hide erza
	fight(); // bring the stats bar above the displayDiv
	$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");
	}

	

		else if ((player1selected == 1) && (hero != erzaScarlet)) {
			mouseClick.play();
			challenger = erzaScarlet;
			player2selected=1;
			player1selected = 2;
			console.log(player1selected);
			console.log(player2selected);
			stats2(); // updating the 2nd status div
						console.log(player1selected);
			console.log(player2selected);
			$("#erza").hide(); // hide erza
			$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");
					}

			else if ((player2selected ==3) && (hero != erzaScarlet)) {

				mouseClick.play();
				challenger = erzaScarlet;
				player2selected=4;
				stats2(); // updating the 2nd status div
				$("#erza").hide(); // hide erza
				$("#button").show();	
				$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");
			}

	});






$("#gray").on("click",function(){
	
	if (player1selected == 0) {
	
	mouseClick.play();
	hero = grayFullbuster; // gray becomes hero
	player1selected = 1
	// function to update the 1st status div
	stats();
	$("#gray").hide(); // hide gray
	fight(); // bring the stats bar above the displayDiv
	$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");
	}

	

	else if ((player1selected == 1) && (hero != grayFullbuster)) {
			mouseClick.play();
			challenger = grayFullbuster;
			player2selected=1;
			player1selected = 2;
			stats2(); // updating the 2nd status div
			$("#gray").hide(); // hide gray
			$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");

					}

	else if ((player2selected ==3) && (hero != grayFullbuster)) {
				mouseClick.play();
				challenger = grayFullbuster;
				player2selected=4;
				stats2(); // updating the 2nd status div
				$("#gray").hide(); // hide gray
				$("#button").show();	
			}	$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");

	});






$("#laxus").on("click",function(){
	
	if (player1selected == 0) {
		mouseClick.play();
		hero = laxusDreyar // laxus becomes hero
		player1selected = 1
		// function to update the 1st status div
		stats();
		$("#laxus").hide(); // hide laxus
		fight(); // bring the stats bar above the displayDiv
		$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");
	}

	

	else if ((player1selected == 1) && (hero != laxusDreyar)) {
			mouseClick.play();
			challenger = laxusDreyar;
			player2selected=1;
			player1selected = 2;
			stats2(); // updating the 2nd status div
			$("#laxus").hide(); // hide laxus
			$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");

					}

		else if ((player2selected ==3) && (hero != laxusDreyar)) {
				mouseClick.play();
				challenger = laxusDreyar;
				player2selected=4;
				stats2(); // updating the 2nd status div
				$("#laxus").hide(); // hide laxux
				$("#button").show();	
				$("#welcome").text("Now that your Fighter and his Opponent are ready. Let the fight begin.");
			}

	});



$("#button").on("click", function(){
	// hero attacks the challenger
console.log(hero);	

if ((player1selected ==5)|| (gameOver == 1)) {
	mouseClick.play();

		document.location.reload(true);
	}
else if ((player1selected ==2)||(player1selected ==3)||(player1selected ==4)) {

	var hDamage = Math.floor((hero.attack/challenger.defense)*10);
	var cDamage = Math.floor((challenger.attack/hero.defense)*10);

	var newHp = hero.hp;
	hero.hp = newHp - cDamage;
	newHp = challenger.hp;
	challenger.hp = newHp-hDamage;
	$("#welcome").text("Fight - "+ hero.name+" vs. "+ challenger.name);
	stats();
	stats2();
	verdict();
	mouseClick.play();

	}
	
});


// $("#natsu").hover(function(){

// },
	// function(){
	// 	$("natsu").text(natsuDragneel.name/n "Attack: "+ "+ "+natsuDragneel.attack)
	// });





}



	

















