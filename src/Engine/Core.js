/*
General Engine Functions



*/

function drawcard(core, card, width, left, top, rotation, hover) {

	var canvas = document.getElementById('GameCanvas');
	var ctx = canvas.getContext("2d");
	
	var adjust = 0;
	
	if (typeof(card) != 'undefined' && card != '') {
	
		var asset = core.sprites.cards[card.refName];
		var type = card.type;
		
		// set the card height based off the width
		var height = width * 2.66;
		// 2.75377054728
		// save the canvas before rotating
		ctx.save();
		// hover effect for drawn card
		if (core.information.xoffset >= left && core.information.xoffset <= left + width && core.information.yoffset >= top && core.information.yoffset <= top + height && hover != 0) {
		
			ctx.shadowColor = 'white';
			ctx.shadowBlur = 15;
		
		}
		
		if (hover == 1) {
			ctx.shadowColor = 'white';
			ctx.shadowBlur = 15;
		}
		
		// translate to the center of the card
		ctx.translate(core.information.pwidth * (left + width/2), core.information.pheight * (top + height/2));
		
		// rotate the canvas for the card
		ctx.rotate(rotation * Math.PI/180);
	
		// translate back
		ctx.translate(-core.information.pwidth * (left + width/2), -core.information.pheight * (top + height/2));
		
		// attacking effect
		if (card.attacking == 1) {
			ctx.shadowColor = 'orange';
			ctx.shadowBlur = 15;
			ctx.fillRect(core.information.pwidth * (left + .6), core.information.pheight * (top + .6), core.information.pwidth * (width - 1.2), core.information.pheight * (height - 1.2));
			ctx.fillRect(core.information.pwidth * (left + .6), core.information.pheight * (top + .6), core.information.pwidth * (width - 1.2), core.information.pheight * (height - 1.2));
			ctx.fillRect(core.information.pwidth * (left + .6), core.information.pheight * (top + .6), core.information.pwidth * (width - 1.2), core.information.pheight * (height - 1.2));
			ctx.fillRect(core.information.pwidth * (left + .6), core.information.pheight * (top + .6), core.information.pwidth * (width - 1.2), core.information.pheight * (height - 1.2));
		}
		
		// rectangle for box shadow on rotated cards due to Google Chrome bug
		ctx.fillRect(core.information.pwidth * (left + .6), core.information.pheight * (top + .6), core.information.pwidth * (width - 1.2), core.information.pheight * (height - 1.2));
		ctx.fillRect(core.information.pwidth * (left + .6), core.information.pheight * (top + .6), core.information.pwidth * (width - 1.2), core.information.pheight * (height - 1.2));
		
		// draw the card
		ctx.drawImage(asset, core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * width, core.information.pheight * height);
		
			// draw the card values
			ctx.fillStyle = 'white';
			
			ctx.font = core.information.pwidth * width / 8.333 + "px lifecraft";
			adjust = ctx.measureText(card.cost).width / 2;
			
		if (type != 'Spell') {
			// card cost
			ctx.fillText(card.cost, core.information.pwidth * (left + (width * .875)) - adjust, core.information.pheight * (top + (height * .114)));
		} else {
			ctx.fillText(card.cost, core.information.pwidth * (left + (width * .888)) - adjust, core.information.pheight * (top + (height * .945)));
		}
			
		if (type != 'Spell') {
		
			// card attack
			ctx.font= core.information.pwidth * width / 9.375 + "px lifecraft";
			adjust = ctx.measureText(card.attack).width / 2;
			ctx.fillText(card.attack, core.information.pwidth * (left + (width * .787)) - adjust, core.information.pheight * (top + (height * .483)));

			// card defense
			ctx.font= core.information.pwidth * width / 9.375 + "px lifecraft";
			adjust = ctx.measureText(card.defense).width / 2;
			ctx.fillText(card.defense, core.information.pwidth * (left + (width * .192)) - adjust, core.information.pheight * (top + (height * .483)));
			
			ctx.shadowBlur = 15;
			ctx.shadowColor = 'black';
			
			// card armor
			ctx.font= core.information.pwidth * width / 12.5 + "px lifecraft";
			adjust = ctx.measureText(card.armor).width / 2;
			ctx.fillText(card.armor, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .184)));
			ctx.fillText(card.armor, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .184)));
			ctx.fillText(card.armor, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .184)));
			ctx.fillText(card.armor, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .184)));
			ctx.fillText(card.armor, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .184)));
			
			// card magic resist
			ctx.font= core.information.pwidth * width / 12.5 + "px lifecraft";
			adjust = ctx.measureText(card.magicresist).width / 2;
			ctx.fillText(card.magicresist, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .289)));
			ctx.fillText(card.magicresist, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .289)));
			ctx.fillText(card.magicresist, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .289)));
			ctx.fillText(card.magicresist, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .289)));
			ctx.fillText(card.magicresist, core.information.pwidth * (left + (width * .144)) - adjust, core.information.pheight * (top + (height * .289)));

		}
		
		// restore the canvas after rotating	
		ctx.restore();
	
	}

}

function drawhand(core) {
	
	// adjust the hand to resort it
	adjusthand(core);

	// hover area to bring up hand
	if (core.information.xoffset >= 46 && core.information.xoffset <= 53 && core.information.yoffset >= 90 && core.information.yoffset <= 100) {
	
		core.information.focus = 'hand';
	
	} else if (core.information.focus == 'hand' && core.information.xoffset >= 15.5 && core.information.xoffset <= 80 && core.information.yoffset >= 56 && core.information.yoffset <= 100) {
	
		core.information.focus = 'hand';
	
	} else if (core.information.focus == 'hand') {
	
		core.information.focus = 'board';
	
	}
	// animations
	handanimations(core);
	
	if (core.information.focus == 'hand') {
	
		if (core.information.player == 1) {
			
			drawcard(core, core.player1.hand[0], 15, 21 + core.animation.h1left, 70 + core.animation.handtop + core.animation.h1top, -35, core.animation.h1hover); // 1
			drawcard(core, core.player1.hand[1], 15, 28 + core.animation.h2left, 63 + core.animation.handtop + core.animation.h2top, -25, core.animation.h2hover); // 2
			drawcard(core, core.player1.hand[2], 15, 35 + core.animation.h3left, 59 + core.animation.handtop + core.animation.h3top, -15, core.animation.h3hover); // 3
			drawcard(core, core.player1.hand[3], 15, 42 + core.animation.h4left, 59 + core.animation.handtop + core.animation.h4top, 0, core.animation.h4hover); // 4
			drawcard(core, core.player1.hand[4], 15, 49 + core.animation.h5left, 61.5 + core.animation.handtop + core.animation.h5top, 15, core.animation.h5hover); // 5
			drawcard(core, core.player1.hand[5], 15, 55 + core.animation.h6left, 66 + core.animation.handtop + core.animation.h6top, 25, core.animation.h6hover); // 6
			drawcard(core, core.player1.hand[6], 15, 60 + core.animation.h7left, 73 + core.animation.handtop + core.animation.h7top, 35, core.animation.h7hover); // 7
		
		} else {
		
			drawcard(core, core.player2.hand[0], 15, 21 + core.animation.h1left, 70 + core.animation.handtop + core.animation.h1top, -35, core.animation.h1hover); // 1
			drawcard(core, core.player2.hand[1], 15, 28 + core.animation.h2left, 63 + core.animation.handtop + core.animation.h2top, -25, core.animation.h2hover); // 2
			drawcard(core, core.player2.hand[2], 15, 35 + core.animation.h3left, 59 + core.animation.handtop + core.animation.h3top, -15, core.animation.h3hover); // 3
			drawcard(core, core.player2.hand[3], 15, 42 + core.animation.h4left, 59 + core.animation.handtop + core.animation.h4top, 0, core.animation.h4hover); // 4
			drawcard(core, core.player2.hand[4], 15, 49 + core.animation.h5left, 61.5 + core.animation.handtop + core.animation.h5top, 15, core.animation.h5hover); // 5
			drawcard(core, core.player2.hand[5], 15, 55 + core.animation.h6left, 66 + core.animation.handtop + core.animation.h6top, 25, core.animation.h6hover); // 6
			drawcard(core, core.player2.hand[6], 15, 60 + core.animation.h7left, 73 + core.animation.handtop + core.animation.h7top, 35, core.animation.h7hover); // 7
		
		}
		
		// hide chatbox
		var cbox = document.getElementsByClassName("chat-box");
		cbox[0].style.display = 'none';
		core.chat.show(true);
	
	}

}

function handanimations(core) {

	//set all hand animation vars first time around and reset vars when hand isnt open
	if (typeof(core.animation.handcounter) == 'undefined' || core.information.focus != 'hand') {
		core.animation.handcounter = 0;
		core.animation.handtop = 15;
		
		core.animation.h1top = 0;
		core.animation.h1left = 0;
		core.animation.h1hover = 0;
		core.animation.h2top = 0;
		core.animation.h2left = 0;
		core.animation.h2hover = 0;
		core.animation.h3top = 0;
		core.animation.h3left = 0;
		core.animation.h3hover = 0;
		core.animation.h4top = 0;
		core.animation.h4left = 0;
		core.animation.h4hover = 0;
		core.animation.h5top = 0;
		core.animation.h5left = 0;
		core.animation.h5hover = 0;
		core.animation.h6top = 0;
		core.animation.h6left = 0;
		core.animation.h6hover = 0;
		core.animation.h7top = 0;
		core.animation.h7left = 0;
		core.animation.h7hover = 0;
		
		// show chatbox
		var cbox = document.getElementsByClassName("chat-box");
		cbox[0].style.display = 'block';
	}
	
	// check how many cards are in your hand
	var amount;
	
	if (core.information.player == 1) {
			amount = core.player1.hand.length;
		} else {
			amount = core.player2.hand.length;
		}
		
	var h1left = 27.3;
	var h2left = 34;
	var h3left = 41.7;
	var h4left = 48.6;
	var h5left = 55.8;
	var h6left = 62.6;

        var handlength = gethandlength(core);
		
        if (handlength == 1) {
			h1left += 10;
        } else if (handlength == 2) {
        	h2left += 9;
        } else if (handlength == 3) {
            h3left += 8.2;
        } else if (handlength == 4) {
        	h4left += 8.5;
        } else if (handlength == 5) {
        	h5left += 9;
        } else if (handlength == 6) {
        	h6left += 10;
        }
	
	// top adjustment for hand animation
	if (core.information.focus == 'hand' && core.animation.handcounter <= 8) {
		core.animation.handcounter += .5;
		core.animation.handtop -= 1;
	} else if (core.information.focus == 'hand' && core.animation.handcounter > 8 && core.animation.handcounter < 13) {
		core.animation.handcounter += .5;
		core.animation.handtop += .5;
	}
	
	// variable to prevent higher card selection
	var selected = 0;
	
	// animation for raising hovered cards
	if (core.information.xoffset >= 16 && core.information.xoffset <= h1left && core.information.yoffset >= 56 && core.information.yoffset <= 100 && core.information.focus == 'hand' && selected == 0) {
		core.animation.h1top = -5;
		core.animation.h1left = -2;
		core.animation.h1hover = 1;
		selected = 1;
		
			if (core.information.player == 1) {
				core.information.cardfocus = core.player1.hand[0];
				previewcard(core, core.player1.hand[0]);
			} else {
				core.information.cardfocus = core.player2.hand[0];
				previewcard(core, core.player2.hand[0]);
			}
		
			core.information.currenthandselection = 0;
		
	} else {
		core.animation.h1top = 0;
		core.animation.h1left = 0;
		core.animation.h1hover = 0;
	}
	
	if (core.information.xoffset > 27.3 && core.information.xoffset <= h2left && core.information.yoffset >= 56 && core.information.yoffset <= 100 && core.information.focus == 'hand' && selected == 0) {
		core.animation.h2top = -5;
		core.animation.h2left = -2;
		core.animation.h2hover = 1;
		selected = 1;
			
			if (core.information.player == 1) {
				core.information.cardfocus = core.player1.hand[1];
				previewcard(core, core.player1.hand[1]);
			} else {
				core.information.cardfocus = core.player2.hand[1];
				previewcard(core, core.player2.hand[1]);
			}
		
			core.information.currenthandselection = 1;
		
	} else {
		core.animation.h2top = 0;
		core.animation.h2left = 0;
		core.animation.h2hover = 0;
	}
	
	if (core.information.xoffset > 34 && core.information.xoffset <= h3left && core.information.yoffset >= 56 && core.information.yoffset <= 100 && core.information.focus == 'hand' && selected == 0) {
		core.animation.h3top = -5;
		core.animation.h3left = -1;
		core.animation.h3hover = 1;
		selected = 1;
			
			if (core.information.player == 1) {
				core.information.cardfocus = core.player1.hand[2];
				previewcard(core, core.player1.hand[2]);
			} else {
				core.information.cardfocus = core.player2.hand[2];
				previewcard(core, core.player2.hand[2]);
			}
		
			core.information.currenthandselection = 2;
		
	} else {
		core.animation.h3top = 0;
		core.animation.h3left = 0;
		core.animation.h3hover = 0;
	}
	
	if (core.information.xoffset > 41.7 && core.information.xoffset <= h4left && core.information.yoffset >= 56 && core.information.yoffset <= 100 && core.information.focus == 'hand' && selected == 0) {
		core.animation.h4top = -5;
		core.animation.h4left = 0;
		core.animation.h4hover = 1;
		selected = 1;
		
			
			if (core.information.player == 1) {
				core.information.cardfocus = core.player1.hand[3];
				previewcard(core, core.player1.hand[3]);
			} else {
				core.information.cardfocus = core.player2.hand[3];
				previewcard(core, core.player2.hand[3]);
			}
		
			core.information.currenthandselection = 3;
		
	} else {
		core.animation.h4top = 0;
		core.animation.h4left = 0;
		core.animation.h4hover = 0;
	}
	
	if (core.information.xoffset > 48.6 && core.information.xoffset <= h5left && core.information.yoffset >= 56 && core.information.yoffset <= 100 && core.information.focus == 'hand' && selected == 0) {
		core.animation.h5top = -5;
		core.animation.h5left = 1;
		core.animation.h5hover = 1;
		selected = 1;
		
			
			if (core.information.player == 1) {
				core.information.cardfocus = core.player1.hand[4];
				previewcard(core, core.player1.hand[4]);
			} else {
				core.information.cardfocus = core.player2.hand[4];
				previewcard(core, core.player2.hand[4]);
			}
		
			core.information.currenthandselection = 4;
		
	} else {
		core.animation.h5top = 0;
		core.animation.h5left = 0;
		core.animation.h5hover = 0;
	}
	
	if (core.information.xoffset > 55.8 && core.information.xoffset <= h6left && core.information.yoffset >= 56 && core.information.yoffset <= 100 && core.information.focus == 'hand' && selected == 0) {
		core.animation.h6top = -5;
		core.animation.h6left = 2;
		core.animation.h6hover = 1;
		selected = 1;
		
			
			if (core.information.player == 1) {
				core.information.cardfocus = core.player1.hand[5];
				previewcard(core, core.player1.hand[5]);
			} else {
				core.information.cardfocus = core.player2.hand[5];
				previewcard(core, core.player2.hand[5]);
			}

			core.information.currenthandselection = 5;
		
	} else {
		core.animation.h6top = 0;
		core.animation.h6left = 0;
		core.animation.h6hover = 0;
	}
	
	if (core.information.xoffset > 62.6 && core.information.xoffset <= 79 && core.information.yoffset >= 56 && core.information.yoffset <= 100 && core.information.focus == 'hand' && selected == 0) {
		core.animation.h7top = -5;
		core.animation.h7left = 2;
		core.animation.h7hover = 1;
		selected = 1;
		
			
			if (core.information.player == 1) {
				core.information.cardfocus = core.player1.hand[6];
				previewcard(core, core.player1.hand[6]);
			} else {
				core.information.cardfocus = core.player2.hand[6];
				previewcard(core, core.player2.hand[6]);
			}
		
			core.information.currenthandselection = 6;
		
	} else {
		core.animation.h7top = 0;
		core.animation.h7left = 0;
		core.animation.h7hover = 0;
	}
	
	dragcard(core);

}

function previewcard(core, card) {

	if (card != '' && typeof(card) != 'undefined') {
		drawcard(core, card, 20, 40, 1, 0, 0);
	}
	
}

function dragcard(core) {

	var canvas = document.getElementById('GameCanvas');
	var ctx = canvas.getContext("2d");
	
	if (core.information.focus == 'hand' && core.information.mousedown == 1 && (core.information.dragcard == '' || typeof(core.information.dragcard) == 'undefined')) {
	
		core.information.dragcard = core.information.cardfocus;
		core.information.focus = 'board';
	
	} else if (core.information.mousedown == 0 && core.information.dragcard != '' && typeof(core.information.dragcard) != 'undefined') {
	
		playcard(core, core.information.dragcard);
		core.information.dragcard = '';
		
	}

	if (core.information.dragcard != '' && typeof(core.information.dragcard) != 'undefined') {
	
		ctx.save();
		ctx.globalAlpha = 0.5;
		drawcard(core, core.information.dragcard, 8, core.information.xoffset - 4, core.information.yoffset - (8 * 2.66 / 2), 0, 0);
		ctx.restore();
		
	}
	
}

function playcard(core, card) {
	// need to add check for gold
	if (core.information.player == 1 && core.information.currentslothover >= 6 && core.information.currentslothover <= 10 && card.type != 'Spell' && core.player1.gold >= card.cost) {
	
		// remove card from hand
		removecardfromhand(core);
		
		// subtract one from hand length
		core.player1.handlength -= 1;
		var action = {};
		action.name = 'HandAdjust', action.sendingplayer = '1', action.receivingplayer = '2', action.var1 = '-1', action.var2 = '1';
		submitaction(core, action);
		
		// subtract gold
		adjustgold(core, 1, -card.cost);
		// subtract gold action
		var action = {};
		action.name = 'GoldAdjust', action.sendingplayer = '1', action.receivingplayer = '2', action.var1 = -card.cost, action.var2 = '1';
		submitaction(core, action);
		
		// add card to position on board
		var slot = core.information.currentslothover;
		setTimeout(function(){ addtoboard(core, card, slot); }, 500);
		//addtoboard(core, card, 0);
        
		// play card action
		var action = {};

		action.name = 'PlayCard', action.sendingplayer = '1', action.receivingplayer = '2', action.refName = card.refName, action.var2 = core.information.currentslothover;
		submitaction(core, action);
		
		// get board left and top for the animation and then play the animation
		getboardposition(core, core.information.currentslothover);
		addanimation(core, 'playcard', core.information.topposition - 15, core.information.leftposition - 6, var1 = 90, var2 = '', var3 = '');
		
		// play sound
		core.sounds.playcard.play();
		
		// add chat message
		core.chat.post(ChatBox.msg.PLAYED_CARD, {
			player: core.information.player1ID,
			card: card.name
		});
	
	} else if (core.information.player == 1 && core.information.currentslothover >= 1 && core.information.currentslothover <= 5 && card.type == 'Spell' && core.player1.gold >= card.cost) {
	
		// remove card from hand
		removecardfromhand(core);
		
		// subtract one from hand length
		core.player1.handlength -= 1;
		var action = {};
		action.name = 'HandAdjust', action.sendingplayer = '1', action.receivingplayer = '2', action.var1 = '-1', action.var2 = '1';
		submitaction(core, action);
		
		// subtract gold
		adjustgold(core, 1, -card.cost);
		// subtract gold action
		var action = {};
		action.name = 'GoldAdjust', action.sendingplayer = '1', action.receivingplayer = '2', action.var1 = -card.cost, action.var2 = '1';
		submitaction(core, action);

		// add card to position on board
		var slot = core.information.currentslothover;
		setTimeout(function(){ addtoboard(core, card, slot); }, 500);
		
		// play card action
		var action = {};
		action.name = 'PlayCard', action.sendingplayer = '1', action.receivingplayer = '2', action.refName = card.refName, action.var2 = core.information.currentslothover;
		submitaction(core, action);
		
		// get board left and top for the animation and then play the animation
		getboardposition(core, core.information.currentslothover);
		addanimation(core, 'playcard', core.information.topposition - 15, core.information.leftposition - 6, var1 = 90, var2 = '', var3 = '');
		
		// play sound
		core.sounds.playcard.play();
		
		// add chat message
		core.chat.post(ChatBox.msg.PLAYED_CARD, {
		player: core.information.player1ID,
		card: 'a facedown card'
		});
	
	
	} else if (core.information.player == 2 && core.information.currentslothover >= 16 && core.information.currentslothover <= 20 && card.type != 'Spell' && core.player2.gold >= card.cost) {
	
		// remove card from hand
		removecardfromhand(core);
		
		// subtract one from hand length
		core.player2.handlength -= 1;
		var action = {};
		action.name = 'HandAdjust', action.sendingplayer = '1', action.receivingplayer = '2', action.var1 = '-1', action.var2 = '2';
		submitaction(core, action);
		
		// subtract gold
		adjustgold(core, 2, -card.cost);
		// subtract gold action
		var action = {};
		action.name = 'GoldAdjust', action.sendingplayer = '2', action.receivingplayer = '1', action.var1 = -card.cost, action.var2 = '2';
		submitaction(core, action);
		
		// add card to position on board
		var slot = core.information.currentslothover;
		setTimeout(function(){ addtoboard(core, card, slot); }, 500);
		
		// play card action
		var action = {};
		action.name = 'PlayCard', action.sendingplayer = '2', action.receivingplayer = '1', action.refName = card.refName, action.var2 = core.information.currentslothover;
		submitaction(core, action);
		
		// get board left and top for the animation and then play the animation
		getboardposition(core, core.information.currentslothover);
		addanimation(core, 'playcard', core.information.topposition - 15, core.information.leftposition - 6, var1 = 90, var2 = '', var3 = '');
		
		// play sound
		core.sounds.playcard.play();
		
		// add chat message
		core.chat.post(ChatBox.msg.PLAYED_CARD, {
		player: core.information.player2ID,
		card: card.name
		});
	
	} else if (core.information.player == 2 && core.information.currentslothover >= 10 && core.information.currentslothover <= 15 && card.type == 'Spell' && core.player2.gold >= card.cost) {
	
		// remove card from hand
		removecardfromhand(core);
		
		// subtract one from hand length
		core.player2.handlength -= 1;
		var action = {};
		action.name = 'HandAdjust', action.sendingplayer = '1', action.receivingplayer = '2', action.var1 = '-1', action.var2 = '2';
		submitaction(core, action);
		
		// subtract gold
		adjustgold(core, 2, -card.cost);
		// subtract gold action
		var action = {};
		action.name = 'GoldAdjust', action.sendingplayer = '2', action.receivingplayer = '1', action.var1 = -card.cost, action.var2 = '2';
		submitaction(core, action);
		
		// add card to position on board
		var slot = core.information.currentslothover;
		setTimeout(function(){ addtoboard(core, card, slot); }, 500);
		
		// play card action
		var action = {};
		action.name = 'PlayCard', action.sendingplayer = '2', action.receivingplayer = '1', action.refName = card.refName, action.var2 = core.information.currentslothover;
		submitaction(core, action);
		
		// get board left and top for the animation and then play the animation
		getboardposition(core, core.information.currentslothover);
		addanimation(core, 'playcard', core.information.topposition - 15, core.information.leftposition - 6, var1 = 90, var2 = '', var3 = '');
		
		// play sound
		core.sounds.playcard.play();
		
		// add chat message
		core.chat.post(ChatBox.msg.PLAYED_CARD, {
		player: core.information.player2ID,
		card: 'a facedown card'
		});
	
	}

}

function adjustgold(core, player, amount) {
	
	if (player == 1) {
		core.player1.gold += amount;
	} else if (player == 2) {
		core.player2.gold += amount;
	}
	
}

function addtoboard (core, card, slot) {
	
	if (slot == 0) {
		
		slot = core.information.currentslothover;
		
	}

     switch(slot) {
          case 1:
             core.board.s1 = card;
             break;
          case 2:
             core.board.s2 = card;
             break;
          case 3:
             core.board.s3 = card;
             break;
          case 4:
             core.board.s4 = card;
             break;
          case 5:
             core.board.s5 = card;
             break;
          case 6:
             core.board.s6 = card;
             break;
          case 7:
             core.board.s7 = card;
             break;
          case 8:
             core.board.s8 = card;
             break;
          case 9:
             core.board.s9 = card;
             break;
          case 10:
             core.board.s10 = card;
             break;
          case 11:
             core.board.s11 = card;
             break;
          case 12:
             core.board.s12 = card;
             break;
          case 13:
             core.board.s13 = card;
             break;
          case 14:
             core.board.s14 = card;
             break;
          case 15:
             core.board.s15 = card;
             break;
          case 16:
             core.board.s16 = card;
             break;
          case 17:
             core.board.s17 = card;
             break;
          case 18:
             core.board.s18 = card;
             break;
          case 19:
             core.board.s19 = card;
             break;
          case 20:
             core.board.s20 = card;
             break;
          default:
             // nothing
          }

}

function gethandlength(core) {
	
	var handcount = 0;
	
	if (core.information.player == 1) {
		for (var i = 0; i < 6; i++) {
			if (core.player1.hand[i] != '' && typeof(core.player1.hand[i]) != 'undefined') {
				handcount++;
			}
		}
	} else {
		for (var i = 0; i < 6; i++) {
			if (core.player2.hand[i] != '' && typeof(core.player2.hand[i]) != 'undefined') {
				handcount++;
			}
		}
	}
	
	return handcount;
	
     /*if (core.information.player == 1) {
          return core.player1.handlength;
     } else {
          return core.player2.handlength;
      }*/

}

function removecardfromhand(core) {

	if (core.information.player == 1) {
		core.player1.hand[core.information.currenthandselection] = '';
	} else {
		core.player2.hand[core.information.currenthandselection] = '';
	}

}

function previewboardcard(core) {

	switch(core.information.currentslothover) {
          case 1:
			if (core.information.player == 1) {
				previewcard(core, core.board.s1);
			}
             break;
          case 2:
			if (core.information.player == 1) {
             previewcard(core, core.board.s2);
			}
             break;
          case 3:
			if (core.information.player == 1) {
             previewcard(core, core.board.s3);
			}
             break;
          case 4:
			if (core.information.player == 1) {
             previewcard(core, core.board.s4);
			}
             break;
          case 5:
			if (core.information.player == 1) {
             previewcard(core, core.board.s5);
			}
             break;
          case 6:
             previewcard(core, core.board.s6);
             break;
          case 7:
             previewcard(core, core.board.s7);
             break;
          case 8:
             previewcard(core, core.board.s8);
             break;
          case 9:
             previewcard(core, core.board.s9);
             break;
          case 10:
             previewcard(core, core.board.s10);
             break;
          case 11:
			if (core.information.player == 2) {
             previewcard(core, core.board.s11);
			}
             break;
          case 12:
			if (core.information.player == 2) {
             previewcard(core, core.board.s12);
			}
             break;
          case 13:
			if (core.information.player == 2) {
             previewcard(core, core.board.s13);
			}
             break;
          case 14:
			if (core.information.player == 2) {
             previewcard(core, core.board.s14);
			}
             break;
          case 15:
			if (core.information.player == 2) {
             previewcard(core, core.board.s15);
			}
             break;
          case 16:
             previewcard(core, core.board.s16);
             break;
          case 17:
             previewcard(core, core.board.s17);
             break;
          case 18:
             previewcard(core, core.board.s18);
             break;
          case 19:
             previewcard(core, core.board.s19);
             break;
          case 20:
             previewcard(core, core.board.s20);
             break;
          default:
             // nothing
          }

}

function checkcurrenttower(core) {
	
	if (core.player1.tier1health == 0 && core.player1.currenttower == 1) {
		core.player1.currenttower += 1;	
	} else if (core.player1.tier2health == 0 && core.player1.currenttower == 2) {
		core.player1.currenttower += 1;	
	} else if (core.player1.tier3health == 0 && core.player1.currenttower == 3) {
		core.player1.currenttower += 1;	
	} else if (core.player1.nexushealth == 0 && core.player1.currenttower == 4) {
		core.player1.currenttower += 1;	
	}
	
	if (core.player2.tier1health == 0 && core.player2.currenttower == 1) {
		core.player2.currenttower += 1;	
	} else if (core.player2.tier2health == 0 && core.player2.currenttower == 2) {
		core.player2.currenttower += 1;	
	} else if (core.player2.tier3health == 0 && core.player2.currenttower == 3) {
		core.player2.currenttower += 1;	
	} else if (core.player2.nexushealth == 0 && core.player2.currenttower == 4) {
		core.player2.currenttower += 1;	
	}
	
}

function adjusthand(core) {
	
	if (core.information.player == 1) {
		for (var i = 1; i < 7; i++) {
			if (core.player1.hand[i - 1] == '' || typeof(core.player1.hand[i - 1]) == 'undefined') {
					if (core.player1.hand[i] != '' && typeof(core.player1.hand[1]) != 'undefined' ) {
						core.player1.hand[i - 1] = core.player1.hand[i];
						core.player1.hand[i] = '';
					}
			}	
		}
	} else if (core.information.player == 2) {
		for (var i = 1; i < 7; i++) {
			if (core.player2.hand[i - 1] == '' || typeof(core.player2.hand[i - 1]) == 'undefined') {
					if (core.player2.hand[i] != '' && typeof(core.player2.hand[1]) != 'undefined' ) {
						core.player2.hand[i - 1] = core.player2.hand[i];
						core.player2.hand[i] = '';
					}
			}	
		}
	}
		
	
}

function drawcardback(core, card, left, top, width, height, rotation) {
	
	var canvas = document.getElementById('GameCanvas');
	var ctx = canvas.getContext("2d");
	
	ctx.save();
	
	// translate to the center of the card
	ctx.translate(core.information.pwidth * (left + width/2), core.information.pheight * (top + height/2));
	
	ctx.rotate(rotation * Math.PI/180);
	
	// translate back
	ctx.translate(-core.information.pwidth * (left + width/2), -core.information.pheight * (top + height/2));
	
	ctx.fillRect(core.information.pwidth * (left + .5), core.information.pheight * (top + .5), core.information.pwidth * (width - 1), core.information.pheight * (height - 1));
	
	ctx.drawImage(card.back, core.information.pwidth * left, core.information.pheight * top, core.information.pwidth * width, core.information.pheight * height);
	
	ctx.restore();
	
}

function getboardposition(core, position) {
	
	var canvas = document.getElementById('GameCanvas');
	var ctx = canvas.getContext("2d");
	
	switch(position) {
    case 1:
        core.information.topposition = 10;
		core.information.leftposition = 4.5;
        break;
    case 2:
        core.information.topposition = 26;
		core.information.leftposition = 4.5;
        break;
	case 3:
        core.information.topposition = 42;
		core.information.leftposition = 4.5;
        break;
	case 4:
        core.information.topposition = 58;
		core.information.leftposition = 4.5;
        break;
	case 5:
        core.information.topposition = 74;
		core.information.leftposition = 4.5;
        break;
	case 6:
        core.information.topposition = 10;
		core.information.leftposition = 20;
        break;
    case 7:
        core.information.topposition = 26;
		core.information.leftposition = 20;
        break;
	case 8:
        core.information.topposition = 42;
		core.information.leftposition = 20;
        break;
	case 9:
        core.information.topposition = 58;
		core.information.leftposition = 20;
        break;
	case 10:
        core.information.topposition = 74;
		core.information.leftposition = 20;
        break;
	case 11:
        core.information.topposition = 10;
		core.information.leftposition = 82.5;
        break;
    case 12:
        core.information.topposition = 26;
		core.information.leftposition = 82.5;
        break;
	case 13:
        core.information.topposition = 42;
		core.information.leftposition = 82.5;
        break;
	case 14:
        core.information.topposition = 58;
		core.information.leftposition = 82.5;
        break;
	case 15:
        core.information.topposition = 74;
		core.information.leftposition = 82.5;
        break;
	case 16:
        core.information.topposition = 10;
		core.information.leftposition = 67;
        break;
    case 17:
        core.information.topposition = 26;
		core.information.leftposition = 67;
        break;
	case 18:
        core.information.topposition = 42;
		core.information.leftposition = 67;
        break;
	case 19:
        core.information.topposition = 58;
		core.information.leftposition = 67;
        break;
	case 20:
        core.information.topposition = 74;
		core.information.leftposition = 67;
        break;
	}
	
}

function addturnstoboardcards(core, player) {
	
	if (player == 1) {
		
		if (core.board.s6 != '' && typeof(core.board.s6) != 'undefined') {
			core.board.s6.turns += 1;
		}
		
		if (core.board.s7 != '' && typeof(core.board.s7) != 'undefined') {
			core.board.s7.turns += 1;
		}
		
		if (core.board.s8 != '' && typeof(core.board.s8) != 'undefined') {
			core.board.s8.turns += 1;
		}
		
		if (core.board.s9 != '' && typeof(core.board.s9) != 'undefined') {
			core.board.s9.turns += 1;
		}
		
		if (core.board.s10 != '' && typeof(core.board.s10) != 'undefined') {
			core.board.s10.turns += 1;
		}
		
	} else if (player == 2) {
		
		if (core.board.s16 != '' && typeof(core.board.s16) != 'undefined') {
			core.board.s16.turns += 1;
		}
		
		if (core.board.s17 != '' && typeof(core.board.s17) != 'undefined') {
			core.board.s17.turns += 1;
		}
		
		if (core.board.s18 != '' && typeof(core.board.s18) != 'undefined') {
			core.board.s18.turns += 1;
		}
		
		if (core.board.s19 != '' && typeof(core.board.s19) != 'undefined') {
			core.board.s19.turns += 1;
		}
		
		if (core.board.s20 != '' && typeof(core.board.s20) != 'undefined') {
			core.board.s20.turns += 1;
		}
		
	}
	
}

function checkboardturns(core) {
	
	if (core.information.player == 1) {
		
		if (core.board.s6.turns >= 1) {
			return true;
		}
		
		if (core.board.s7.turns >= 1) {
			return true;
		}
		
		if (core.board.s8.turns >= 1) {
			return true;
		}
		
		if (core.board.s9.turns >= 1) {
			return true;
		}
		
		if (core.board.s10.turns >= 1) {
			return true;
		}
		
	} else if (core.information.player == 2) {
		
		if (core.board.s16.turns >= 1) {
			return true;
		}
		
		if (core.board.s17.turns >= 1) {
			return true;
		}
		
		if (core.board.s18.turns >= 1) {
			return true;
		}
		
		if (core.board.s19.turns >= 1) {
			return true;
		}
		
		if (core.board.s20.turns >- 1) {
			return true;
		}
		
	}
	
	return false;
	
}

function setattacker(core) {
	
	if (core.information.player == 1 && core.information.turn == 1) {
		
		if (core.information.currentslothover == 6 && core.board.s6.turns >= 1 && core.board.s6.attacking != 1) {		
			core.board.s6.attacking = 1;			
		} else if (core.information.currentslothover == 6 && core.board.s6.turns >= 1 && core.board.s6.attacking == 1) {
			core.board.s6.attacking = 0;
		}
		
		if (core.information.currentslothover == 7 && core.board.s7.turns >= 1 && core.board.s7.attacking != 1) {		
			core.board.s7.attacking = 1;			
		} else if (core.information.currentslothover == 7 && core.board.s7.turns >= 1 && core.board.s7.attacking == 1) {
			core.board.s7.attacking = 0;
		}
		
		if (core.information.currentslothover == 8 && core.board.s8.turns >= 1 && core.board.s8.attacking != 1) {		
			core.board.s8.attacking = 1;			
		} else if (core.information.currentslothover == 8 && core.board.s8.turns >= 1 && core.board.s8.attacking == 1) {
			core.board.s8.attacking = 0;
		}
		
		if (core.information.currentslothover == 9 && core.board.s9.turns >= 1 && core.board.s9.attacking != 1) {		
			core.board.s9.attacking = 1;			
		} else if (core.information.currentslothover == 9 && core.board.s9.turns >= 1 && core.board.s9.attacking == 1) {
			core.board.s9.attacking = 0;
		}
		
		if (core.information.currentslothover == 10 && core.board.s10.turns >= 1 && core.board.s10.attacking != 1) {		
			core.board.s10.attacking = 1;			
		} else if (core.information.currentslothover == 10 && core.board.s10.turns >= 1 && core.board.s10.attacking == 1) {
			core.board.s10.attacking = 0;
		}
		
	}
	
	if (core.information.player == 2 && core.information.turn == 2) {
		
		if (core.information.currentslothover == 16 && core.board.s16.turns >= 1 && core.board.s16.attacking != 1) {		
			core.board.s16.attacking = 1;			
		} else if (core.information.currentslothover == 16 && core.board.s16.turns >= 1 && core.board.s16.attacking == 1) {
			core.board.s16.attacking = 0;
		}
		
		if (core.information.currentslothover == 17 && core.board.s17.turns >= 1 && core.board.s17.attacking != 1) {		
			core.board.s17.attacking = 1;			
		} else if (core.information.currentslothover == 17 && core.board.s17.turns >= 1 && core.board.s17.attacking == 1) {
			core.board.s17.attacking = 0;
		}
		
		if (core.information.currentslothover == 18 && core.board.s18.turns >= 1 && core.board.s18.attacking != 1) {		
			core.board.s18.attacking = 1;			
		} else if (core.information.currentslothover == 18 && core.board.s18.turns >= 1 && core.board.s18.attacking == 1) {
			core.board.s18.attacking = 0;
		}
		
		if (core.information.currentslothover == 19 && core.board.s19.turns >= 1 && core.board.s19.attacking != 1) {		
			core.board.s19.attacking = 1;			
		} else if (core.information.currentslothover == 19 && core.board.s19.turns >= 1 && core.board.s19.attacking == 1) {
			core.board.s19.attacking = 0;
		}
		
		if (core.information.currentslothover == 20 && core.board.s20.turns >= 1 && core.board.s20.attacking != 1) {		
			core.board.s20.attacking = 1;			
		} else if (core.information.currentslothover == 20 && core.board.s20.turns >= 1 && core.board.s20.attacking == 1) {
			core.board.s20.attacking = 0;
		}
		
	}
	
}

function resetturninfo(core) {
	core.board.s6.attacking = 0;
	core.board.s7.attacking = 0;
	core.board.s8.attacking = 0;
	core.board.s9.attacking = 0;
	core.board.s10.attacking = 0;
	core.board.s16.attacking = 0;
	core.board.s17.attacking = 0;
	core.board.s18.attacking = 0;
	core.board.s19.attacking = 0;
	core.board.s20.attacking = 0;
}

function checkforattackers(core) {
	
	if (core.information.player == 1) {
		
		if (core.board.s6.attacking == 1) {
			return true;
		}
		
		if (core.board.s7.attacking == 1) {
			return true;
		}
		
		if (core.board.s8.attacking == 1) {
			return true;
		}
		
		if (core.board.s9.attacking == 1) {
			return true;
		}
		
		if (core.board.s10.attacking == 1) {
			return true;
		}
		
	} else if (core.information.player == 2) {
		
		if (core.board.s16.attacking == 1) {
			return true;
		}
		
		if (core.board.s17.attacking == 1) {
			return true;
		}
		
		if (core.board.s18.attacking == 1) {
			return true;
		}
		
		if (core.board.s19.attacking == 1) {
			return true;
		}
		
		if (core.board.s20.attacking == 1) {
			return true;
		}
		
	}
	
	return false;
	
}

function declareattack(core) {
	
	if (core.information.xoffset >= 42.5 && core.information.xoffset <= 59.5 && core.information.yoffset >= 23 && core.information.yoffset <= 55 && checkforattackers(core)) {
		
		var attackers = addattackers(core);
		
		// attack action
		var action = {};
		action.name = 'Attack', action.sendingplayer = core.information.player, action.receivingplayer = core.information.enemyplayer;
		
		for (var i = 0; i < attackers.length; i++) {
			action['var' + (i + 1)] = attackers[i];
		}
		
		action.var6 = core.information.time;
		
		defenseturn(core, action.var6);
		
		submitaction(core, action);
		
		core.sounds.attack.volume(.3);
		core.sounds.attack.play();
		
		// game screen effect
		document.getElementById('GameCanvas').style.boxShadow = 'inset 0px 0px 75px 24px rgba(94,84,94,1)';
		
	}
	
}

function addattackers(core) {
	
	var array = [];
	
	if (core.information.player == 1) {
		for (var i = 6; i <= 10; i++) {
			if (core.board['s' + i] != '' && typeof(core.board['s' + i]) != 'undefined' && core.board['s' + i].attacking == 1) {
				array.push(i);
			}
		}
	} else if (core.information.player == 2) {
		for (var i = 16; i <= 20; i++) {
			if (core.board['s' + i] != '' && typeof(core.board['s' + i]) != 'undefined' && core.board['s' + i].attacking == 1) {
				array.push(i);
			}
		}
	}
	
	return array;
	
}

function generateshields(core) {
	
	core.mechanics.shields = [];
	
	if (core.information.player == 1) {
		
		for (var i = 6; i <= 10; i++) {
			if (core.board['s' + i] != '' && typeof(core.board['s' + i]) != 'undefined') {
				
				// create shield
				var shield = createshield(core, i);
				
				// add shield to array to be drawn
				core.mechanics.shields.push(shield);
			}
		}
		
	} else if (core.information.player == 2) {
		for (var i = 16; i <= 20; i++) {
			if (core.board['s' + i] != '' && typeof(core.board['s' + i]) != 'undefined') {
				
				// create shield
				var shield = createshield(core, i);
				
				// add shield to array to be drawn
				core.mechanics.shields.push(shield);
			}
		}
	}
	
}

function createshield(core, position) {
	
	var shield = {};
	
	if (position >= 6 && position <= 10) {
		var adjust = (position - 6) * 16;
		shield.left = 34;
		shield.top = 12 + adjust;
	} else if (position >= 16 && position <= 20) {
		var adjust = (position - 16) * 16;
		shield.left = 61;
		shield.top = 12 + adjust;
	}
	
	shield.linecolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
	shield.width = 5;
	shield.height = 10;
	
	shield.startleft = shield.left;
	shield.starttop = shield.top;
	
	shield.drag = function() {
			this.left = core.information.xoffset - 2.5;
			this.top = core.information.yoffset - 5;
	}
	
	$("#GameCanvas").mousedown(function(){
		if (core.information.xoffset >= shield.left && core.information.xoffset <= shield.left + 5 && core.information.yoffset >= shield.top && core.information.yoffset <= shield.top + 10) {
			shield.interval = setInterval(function(){ shield.drag(); }, 10);
			shield.defending = 0;
			shield.intervalflag = true;
		}
	});
	
	$("#GameCanvas").mouseup(function(){
		if (shield.intervalflag) {
			clearInterval(shield.interval);
			shield.lockposition();
			shield.intervalflag = false;
		}
	});
	
	$("#GameCanvas").mouseleave(function() {
		if (shield.intervalflag) {
			clearInterval(shield.interval);
			shield.lockposition();
			shield.intervalflag = false;
		}
	});
	
	shield.lockposition = function() {
		
		if (typeof(core.board['s' + core.information.currentslothover]) != 'undefined') {
			if (core.board['s' + core.information.currentslothover].attacking == 1 && checkshieldpositions(core, core.information.currentslothover)) {
				shield.defending = core.information.currentslothover;
			} else {
				shield.defending = 0;
				shield.left = shield.startleft;
				shield.top = shield.starttop;
			}
		} else {
			shield.defending = 0;
			shield.left = shield.startleft;
			shield.top = shield.starttop;
		}
	}
	
	return shield;
	
}

function checkshieldpositions(core, drop_position) {
	
	for (var i = 0; i < core.mechanics.shields.length; i++) {
		
		if (core.mechanics.shields[i].defending == drop_position) {
			return false;
		}
		
	}
	
	return true;
	
}