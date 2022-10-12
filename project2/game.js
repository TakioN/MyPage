$('document').ready(function() {
	//데이터 정의-----------------
	
	//공의 개수
	var circleCount = 0;
	
	//공의 종류 [색, 지름, 반지름, 속도(이동 시 걸리는 시간)]
	var circleType = {
		"option" : ["color", "diameter", "radius", "velocity"],
		"small" : ["black", 5, 2.5, 3000], 
		"medium" : ["blue", 15, 7.5, 4000],
		"large" : ["yellow", 30, 15, 5000]
	};
	
	//플레이 시간
	var t = 0;
	
	//게임 실행 여부
	var gameOn = false;
	
	//마우스 좌표
	var mouseX;
	var mouseY;
	
	//--------------------------
	
	//마우스 좌표 담기
	$('body').mousemove(function() {
		mouseX = event.pageX;
		mouseY = event.pageY;
	});
	
	//시간 증가
	function timer() {
		if(gameOn) {
			setTimeout(function() {
				t += 0.01;
				$('.timer').html(`<h1><div class="center">${t.toFixed(2)}</div></h1>`);
				timer();
			}, 10)			
		}
	};	
	timer();
	
	//게임 시작
	$('.startbutton').click(function() {
		$('.startbutton').fadeToggle(500, function() {
			gameOn = true;
			timer();
			$('.space').mouseenter(endGame);
			createCircle();
		})
	});
	
	//공 생성
	function createCircle() {
		circleCount++;
		var randNum = Math.floor(Math.random() * 3 + 1);
		var circleChoice
		switch(randNum) {
			case 1:
				circleChoice = 'small';
				break;
			case 2:
				circleChoice = 'medium';
				break;
			case 3:
				circleChoice = 'large';
				break;
		}
		
		var circleColor = circleType[circleChoice][0];
		var circleDiameter = circleType[circleChoice][1];
		var circleRadius = circleType[circleChoice][2];
		var circleVelocity = circleType[circleChoice][3];
		
		var circleID = "circle" + circleCount;
		
		//공의 가동 범위
		var movableWidth = $('body').width() - circleDiameter;
		var movableHeight = $('body').height() - circleDiameter;
		
		//공의 초기 좌표
		var initX = (movableWidth * Math.random()).toFixed();
		var initY = (movableHeight * Math.random()).toFixed();
		
		var ball = `<div class = "circle" id = ${circleID}></div>`;
		$('body').append(ball);
		$('#' + circleID).css({
			"background-color" : circleColor,
			"width" : circleDiameter + "vmin",
			"height" : circleDiameter + "vmin",
			"border-radius": circleRadius + "vmin",
			"top" : initY + "px",
			"left" : initX + "px"
		});
		
		//1ms마다 마우스와 공 거리 계산
		function distance(currentBallID) {
			setTimeout(function() {
				var ballPos = $(currentBallID).position();
				var ballRadius = parseInt($(currentBallID).css('width')) * 0.5;

				var distanceX = mouseX - (ballPos.left + ballRadius);
				var distanceY = mouseY - (ballPos.top + ballRadius);

				if(Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)) <= ballRadius) {
					// console.log('HELLO');
					$(currentBallID).removeClass('circle').addClass('redcircle');
					$(currentBallID).css('background-color', 'red');

					// console.log('Game Over');
					endGame();
				}
				distance(currentBallID);
			}, 1);
		}
		distance('#' + circleID);
		
		//공 이동시키기
		function animateBall(circleID, diameter, speed) {
			var movableWidth = $('body').width() - diameter;
			var movableHeight = $('body').height() - diameter;
			var afterLeft = (movableWidth * Math.random()).toFixed();
			var afterTop = (movableHeight * Math.random()).toFixed();
			
			$('#' + circleID).animate({
				"top" : afterTop,
				"left" : afterLeft
			}, speed, function(){animateBall(circleID, diameter, speed);});
		}
		animateBall(circleID, circleDiameter, circleVelocity);
		
		setTimeout(function() {
			if(gameOn == true)
				createCircle();
		}, 3000);
	}
	
	//게임 오버
	function endGame() {
		if(gameOn == true) {
			gameOn = false;
			$('.redcircle').stop();
			$('.circle').remove();
			updateScore(t);
		} 
	}
	
	var resetButton = "<div class = 'resetbutton center'><h2>Play Again</h2></div>"
	var score1 = 0.00;
	var score2 = 0.00;
	var score3 = 0.00;
	var score4 = 0.00;
	var score5 = 0.00;
	
	//스코어보드 업데이트
	function updateScore(newScore) {
		newScore += 0.01;
		if(newScore > score1) {
			var redScore = "score1";
			score5 = score4;
			score4 = score3;
			score3 = score2;
			score2 = score1;
			score1 = newScore;
		}
		else if(newScore > score2) {
			var redScore = "score2";
			score5 = score4;
			score4 = score3;
			score3 = score2;
			score2 = newScore;
		}
		else if(newScore > score3) {
			var redScore = "score3";
			score5 = score4;
			score4 = score3;
			score3 = newScore;
		}
		else if(newScore > score4) {
			var redScore = "score4";
			score5 = score4;
			score4 = newScore;
		}
		else if(newScore > score5) {
			var redScore = "score5";
			score5 = newScore;
		}
		
		var scorePlace1 = "<div class = 'score center' id = 'score1'><h2>" + score1.toFixed(2) + "</h2></div>";
		var scorePlace2 = "<div class = 'score center' id = 'score2'><h2>" + score2.toFixed(2) + "</h2></div>";
		var scorePlace3 = "<div class = 'score center' id = 'score3'><h2>" + score3.toFixed(2) + "</h2></div>";
		var scorePlace4 = "<div class = 'score center' id = 'score4'><h2>" + score4.toFixed(2) + "</h2></div>";
		var scorePlace5 = "<div class = 'score center' id = 'score5'><h2>" + score5.toFixed(2) + "</h2></div>";
		
		$('#highscores').append(scorePlace1, scorePlace2, scorePlace3, scorePlace4, scorePlace5, resetButton);
		$('#' + redScore).css('color', 'red');
		$('#highscores').toggle();
		$('.resetbutton').css('cursor', 'pointer').click(resetGame);
		$('.resetbutton').hover(function() {
			$('.resetbutton').css('transform', 'scale(1.2)');
		}, function(){
			$('.resetbutton').css('transform', 'scale(1.0)');
		});
	}
	
	function resetGame() {
		$('#highscores').fadeToggle(100, function() {
			$('.redcircle').remove();
			$('.score').remove();
			$('.resetbutton').remove();
			
			t = 0;
			$('.timer').html(`<h1><div class="center">${t.toFixed(2)}</div></h1>`);
			$('.startbutton').toggle();
		});
	}
})