var __bwMeet14 = (function(){

	'use strict';

	var frame = document.getElementById('frame'),
		canvas = document.getElementsByTagName('canvas')[0],
		ctx = canvas.getContext('2d'),
		windParticles = [],
		wind = {
			speed : undefined,
			direction : undefined
		};

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame; 
		window.requestAnimationFrame = requestAnimationFrame;

	function animate(){

		ctx.clearRect(0,0,canvas.width, canvas.height);

		var tp = 0;

		while(tp < windParticles.length){

			var thisParticle = windParticles[tp];

			ctx.fillStyle = "rgba(" + thisParticle.color.r + "," + thisParticle.color.g + "," + thisParticle.color.b + "," + thisParticle.color.a + ")";
		
			// console.log("rgba(" + thisParticle.color.r + "," + thisParticle.color.g + "," + thisParticle.color.b + thisParticle.color.a + ")");

			ctx.fillRect(thisParticle.x, thisParticle.y, thisParticle.size * 8, thisParticle.size * 8);

			// thisParticle.x += thisParticle.speed;
			// thisParticle.y += thisParticle.speed;

			// function trigonometry(whichIsIt, xOrY, radius, angle){

			thisParticle.x = maths.trig("X", thisParticle.x, thisParticle.speed, wind.direction - 90);
			thisParticle.y = maths.trig("Y", thisParticle.y, thisParticle.speed, wind.direction - 90);

			if(thisParticle.x > canvas.width){
				thisParticle.x = 0;
			}

			if(thisParticle.x < 0){
				thisParticle.x = canvas.width
			}

			if(thisParticle.y > canvas.height){
				thisParticle.y = 0;
			}

			if(thisParticle.y < 0){
				thisParticle.y = canvas.height;
			}


			tp += 1;

		}

		requestAnimationFrame(animate);

	}

	function createWindParticles(){

		var maxParticles = 500,
			az = 0;

		while(az < maxParticles){

			var size = Math.round(Math.random()*3),
				speed = Math.round(Math.random()*wind.speed) / size,
				pX = Math.round(Math.random()*canvas.width),
				pY = Math.round(Math.random()*canvas.height),
				alpha = Math.random();

			if(size === 0){
				size = 1;
			}

			if(speed === 0){
				speed = 1;
			}

			windParticles.push({
				size : size,
				speed : speed,
				x : pX,
				y : pY,
				color : {
					r : 83,
					g : 142,
					b : 239,
					a : alpha
				}
			})

			az += 1;

		}

		animate();

	}

	function getWeather(){
    	
    	// var url = "http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where location=13383&format=json&nojsoncallback=1&callback=?";
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D13383&format=json&diagnostics=true&callback=";

		jQuery.ajax({
			type : "GET",
			dataType : 'json',
			// url : "http://weather.yahooapis.com/forecastrss?w=13383&u=c&format=json&nojsoncallback=1&callback=?",
			url : url, 
			success : function(e){
				
				var result = e.query.results.channel;

				wind.speed = result.wind.speed;
				wind.direction = result.wind.direction;

				console.log(wind);
				createWindParticles();

			},
			error : function(e){
				console.error(e);
			}
		})

	}

	function addEvents(){

	}

	function init(){

		console.log("BWMEET 14 BABY, YEAH!!!");
		addEvents();
		getWeather();
		//createWindParticles();

	}

	return {
		init : init
	};
})();

(function(){
	__bwMeet14.init();
})();