//시그너스 기사단 설명 팝업
var soul = document.getElementById('cygnus-soul');
soul.addEventListener('click', () => makeProfile('soul'));
var flame = document.getElementById('cygnus-flame');
flame.addEventListener('click', () => makeProfile('flame'));
var wind = document.getElementById('cygnus-wind');
wind.addEventListener('click', () => makeProfile('wind'));
var night = document.getElementById('cygnus-night');
night.addEventListener('click', () => makeProfile('night'));
var striker = document.getElementById('cygnus-striker');
striker.addEventListener('click', () => makeProfile('striker'));

function makeProfile(char_name) {
	var p = document.querySelector('#popup p');
	p.innerText = "";
	var str = document.createTextNode(characters[char_name]);
	p.appendChild(str);
	var profile = document.getElementById('profile');
	profile.style.display = "flex";
}

document.getElementById('exit-btn').addEventListener('click', () => {
	profile.style.display = "none";
});

//nav 클릭 간 페이지 이동
var cPage = document.getElementById('cygnus-page');
var pPage = document.getElementById('play-page');
document.getElementById('play').addEventListener('click', () => {
	pPage.style.display = "block";
	cPage.style.display = "none";
	//타운 페이지 끄기
	//보스 페이지 끄기
});
document.getElementById('cygnus').addEventListener('click', () => {
	pPage.style.display = "none";
	cPage.style.display = "block";
	//타운 페이지 끄기
	//보스 페이지 끄기
});

//플레이 페이지 => 슬라임 클릭 시 메이플스토리 홈페이지 이동
document.getElementById('banner').addEventListener('click', () => {
	pPage.style.display = "none";
	cPage.style.display = "block";
	//타운 페이지 끄기
	//보스 페이지 끄기
});