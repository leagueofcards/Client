function drawanimations(core) {

	for (var i = 0; i < core.animation.length; i++) {
		
		if (core.animation[i].complete == 0) {
			
			animationselector(core, core.animation[i], i);
			
		}
		
	}

}

function animationselector(core, animation, index) {
	
	if (animation.type == 'cardhealth') {
		cardhealthanimation(core, animation, index);
	} else if (animation.type == 'playcard') {
		playcardanimation(core, animation, index);
	} else if (animation.type == 'goldcoin') {
		infinitegoldcoinanimation(core, animation, index);
	} else if (animation.type == 'silvercoin') {
		infinitesilvercoinanimation(core, animation, index);
	} else if (animation.type == 'attack') {
		attackanimation(core, animation, index);
	} else if (animation.type = 'turn') {
		turnanimation(core, animation, index);
	}
	
}

function addanimation(core, type, top, left, var1 = 'none', var2 = 'none', var3 = 'none') {
	
	// new animation json
	var animation = {};
	
	// set animation values
	animation.starttime = core.information.time;
	animation.complete = 0;
	animation.type = type;
	animation.top = top;
	animation.left = left;
	animation.var1 = var1;
	animation.var2 = var2;
	animation.var3 = var3;
	
	// add animation to array
	core.animation.push(animation);
	
}

function turnanimation(core, animation, index) {

	var turn = animation.var1;
	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .25;

	ctx.save();

	if (turn == 1) {
		ctx.strokeStyle = '#38b4fd';
		ctx.shadowColor = '#38b4fd';
	} else if (turn == 2) {
		ctx.strokeStyle = '#993939';
		ctx.shadowColor = '#993939';
	}

	var radius = .3 + (time * 16);

	ctx.shadowBlur = 5; 
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.arc(core.information.pwidth * 50, core.information.pheight * 11.3, core.information.pwidth * radius, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.restore();

	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}

}

function cardhealthanimation(core, animation, index) {
	
	var amount = animation.var1;
	
	// current animation time
	var time = core.information.time - animation.starttime;
	
	// set settings based off plus or minus
	if (animation.var1 < 0) {
		ctx.fillStyle = '#A11A1A';
	} else if (animation.var1 >0) {
		ctx.fillStyle = '#53A72F';
	} else {
		ctx.fillStyle = '#323776';
	}
	// set the font
	ctx.font = core.information.pwidth * 3 + "px lifecraft";
	
	ctx.save();
	ctx.globalAlpha = 1 - time;

	if (animation.var2 == 'right') {
		ctx.fillText(amount, core.information.pwidth * (animation.left + (time * 5)), core.information.pheight * animation.top);
	} else if (animation.var2 == 'left') {
		ctx.fillText(amount, core.information.pwidth * (animation.left - (time * 5)), core.information.pheight * animation.top);
	}
	
	if (time >= 1) {		
		core.animation[index].complete = 1;		
	}
	
	ctx.restore();
	
}

function attackanimation(core, animation, index) {
	var time = core.information.time - animation.starttime;
	animation.animationlength = 1;
	
	attacksprite(core, animation, time);
	
	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}
}

function playcardanimation(core, animation, index) {
	
	/* Notes
	
	*/
	
	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .8;
	
	playcardsprite(core, animation, time);
	
	if (time >= animation.animationlength) {
		core.animation[index].complete = 1;
	}

}

function infinitegoldcoinanimation(core, animation, index) {
	
	/* Notes
	
	*/
	
	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .8;
	
	goldcoinsprite(core, animation, time);
	
	if (time >= animation.animationlength) {
		animation.starttime = core.information.time;
	}

}

function infinitesilvercoinanimation(core, animation, index) {
	
	/* Notes
	
	*/
	
	// current animation time
	var time = core.information.time - animation.starttime;
	animation.animationlength = .8;
	
	if (time >= animation.animationlength) {
		animation.starttime = core.information.time;
	}
	
	silvercoinsprite(core, animation, time);

}