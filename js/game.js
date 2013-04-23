/* 
	basketball

	The MIT License (MIT)

	Copyright (c) 2013 Nicholas Ortenzio 

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

*/

$(function () {

	var KEYS = {
		left : false, 	
		up : false,		
		right : false,	
		down : false,	
		shoot : false 	//32
	};

	var P1 = {
		dom : null,
		x : 0,
		y : 0,
		lastX : 0,
		lastY : 0,
		points : 0,
		hasBasketball : false,
		isBehind : true
	};

	var P2 = {
		dom : null,
		x : 0,
		y : 0,
		lastX : 0,
		lastY : 0,
		points : 0,
		hasBasketball : false
	}	

	var BASKETBALL = {
		dom : null,
		currentX : 0,
		currentY : 0,
		lastX : 0,
		lastY : 0,
		isBouncing : false,
		direction : 0,
		floorY : 0
	}
	
	var lastFrame = null;
	var moveX = 8;
	var moveY = 8;
	
	
	/*** RENDERING ***/
	
	var renderGameScreen = function () {		
		var w = 1056;
		var h = 467;
		
		// init keypress event handlers
		$(document).keydown(onKeyDown).keyup(onKeyUp);
		var paper = Raphael("container", w, h);

		// render court
		var court = config.court;
		var $court = paper.image(court.src, court.x, court.y, court.w, court.h);
		
		// render playerone
		P1.cfg = config.p1;
		P1.x = P1.cfg.x;
		P1.y = P1.cfg.y;
		P1.dom = paper.image(P1.cfg.src, P1.x, P2.y, P1.cfg.w, P1.cfg.h);
		
		// render playerone
		P2.cfg = config.p2;
		P2.x = P2.cfg.x;
		P2.y = P2.cfg.y;
		P2.dom = paper.image(P2.cfg.src, P2.x, P2.y, P2.cfg.w, P2.cfg.h);
				
		
	};
	
	var renderEntities = function (dt) {
		P1.dom.attr({x:P1.x, y:P1.y})
	}
	
	
	
	/*** ***/
	
	var updatePlayerOne = function (dt) {
		
		// set movement
		if (KEYS.left) {
			P1.x -= moveX;
		};
		if (KEYS.right) {
			P1.x += moveX;		
		};
		if (KEYS.up) {
			P1.y -= moveY;
		};
		if (KEYS.down) {
			P1.y += moveY;		
		};
		
		// set zindex
		if ((P1.y > P2.y) & (P1.isBehind)) {
			P1.dom.toFront();
			P1.IsBehind = false;
		} else {
			P2.dom.toFront();
			P1.isBehind = true;
		}
		
		// set bounds
		if (P1.y > 360) {
			P1.y = 360;
		} else if (P1.y < 66) {
			P1.y = 66;
		}
		
		// 
		var slopeL = (P1.y - 360) / (P1.x - 10);
		var slopeR = (P1.y - 360) / (P1.x - 1009);
		
		if (slopeL < -2.26) {
			P1.x += moveX;
		}

		if (slopeR > 2.26) {
			P1.x -= moveX;
		}
		
		//
		var x2 = 66; var y1 = 152;
		
		
		
	};
	
	var updatePlayerTwo = function (dt) {
		// ai logic here
	};
	
	var updateBasketball = function (dt) {
	
	
	};
	
	var updateScore = function (dt) {
	
	};
	
	
	
	
	
	
	/*** EVENTS ***/
	
	var onKeyDown = function (e) {
		e.preventDefault();
		e.stopPropagation();

		var key = e.keyCode;

		switch (key) {
			case 37 : 
				KEYS.left = true;
				break;
			case 38 :
				KEYS.up = true;
				break;
			case 39 :
				KEYS.right = true;
				break;
			case 40 :
				KEYS.down = true;
				break;
		}
	};
		
	var onKeyUp = function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		var key = e.keyCode;
		
		switch (key) {
			case 37 : 
				KEYS.left = false;
				break;
			case 38 :
				KEYS.up = false;
				break;
			case 39 :
				KEYS.right = false;
				break;
			case 40 :
				KEYS.down = false;
				break;
		}
	}
	
	var onAnimationFrame = function (dt, e) {
	
		if ((Date.now()-lastFrame) < 50) {
			requestFrame(onAnimationFrame);
			return;
		}
		
		requestFrame(onAnimationFrame);		
		
		lastFrame = Date.now();
		
		updatePlayerOne(dt);
		updatePlayerTwo(dt);
		updateBasketball(dt);
		updateScore(dt);
		
		renderEntities(dt);
		
	};
	
	


	
	
	/*** INIT ***/
	
	var init = (function () {
			
		// render game screen
		renderGameScreen();
		
		// init animation frame
		requestFrame = 	window.requestAnimationFrame || 
						window.mozRequestAnimationFrame || 
						window.webkitRequestAnimationFrame || 
						window.msRequestAnimationFrame || 
						window.oRequestAnimationFrame || 
						function(callback) { 
							window.setTimeout(function() { callback(Date().now());}, 1 / 60 * 1000);
						};
		
		lastFrame = Date.now();
		
		// kickoff render loop
		onAnimationFrame(Date.now());		
		
		
	}());


});