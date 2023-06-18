let page = 1;
const lastPage = 12;
let isChecked = [];
let firstOrSecond = [];
let checkCount = 0;
let checkList = [];
let mbti = "";


//문제 체크 여부 + firstOrSecond false & 0 초기화
for(var i = 0; i < qna.length; i++) isChecked[i] = false;


//스타트버튼 클릭 시 contents 표시
$('#stBtn').on('click', () => {
	$('#start').hide();
	$('#content').show();
});

//첫 페이지와 마지막 페이지 버튼 숨기기
$('#prBtn').hide();
$('#rsBtn').hide();

function btnHide() {
	if(page === 1) {
		$('#prBtn').hide();
	}
	else if(page === lastPage) {
		$('#nxBtn').hide();
		if(checkCount === 12) $('#rsBtn').show();
	}
	else {
		$('#prBtn').show();
		$('#nxBtn').show();
		$('#rsBtn').hide();
	}
}

//버튼 클릭 시 페이지 이동
$('#prBtn').on('click', (e) => {
	page--;
	$(`#ball${page + 1}`).removeClass('activeBall');
	btnHide();
	matching();
});
$('#nxBtn').on('click', (e) => {
	page++;
	btnHide();
	matching();
});

//답변 선택 시 
let answerText = "";
$('#answer p').on('click', (e) => {
	isChecked[page - 1] = true;
	if(checkCount < 12)checkCount++;
	answerText = ($(e.target).text()).trim();
	firstOrSecond[page - 1] = $(e.target).index() + 1;
	mbtiMatch(answerText);
	progressUpdate();
	autoPage();
})

//페이지와 qna 매칭
let greenAns;
function matching() {
	$('#question').text(qna[page - 1].q);
	var values = Object.values(qna[page - 1]);
	$('#answer p:nth-child(1)').text(values.at(-2)).css('borderColor', 'red').css('borderWidth', '1px');
	$('#answer p:nth-child(2)').text(values.at(-1)).css('borderColor', 'red').css('borderWidth', '1px');
	
	if(isChecked[page - 1] === true) {
		greenAns = $(`#answer p:nth-child(${firstOrSecond[page - 1]})`);
		greenAns.css('borderColor', 'green').css('borderWidth', '2px');
	}
	$(`#ball${page - 1}`).removeClass('activeBall');
	$(`#ball${page}`).addClass('activeBall');
	
}

//각 문제의 답변 선택 시 성향 판단
let keys;
let answerObj;
let choice;
function mbtiMatch(ans) {
	answerObj = qna[page - 1];
	keys = Object.keys(answerObj);
	choice = keys.find((k) => answerObj[k] === ans);
	checkList[page - 1] = choice;
}

//진행률 업데이트 (노란색 -> 초록색)
let goBall;
function progressUpdate() {
	$(`#ball${page}`).css('backgroundColor', 'green');
}

//답변 선택 시 페이지 이동
function autoPage() {
	if(page !== lastPage) page++;
	btnHide();
	matching();
}


//result 버튼 클릭 시 결과 보이기
$('#rsBtn').on('click', (e) => {
	mbti = yourmbti();
	$('#content').hide();
	makeRltList(mbti);
	$('#result').show();
});

//mbti가 무엇인지 판단하기
function yourmbti() {
	let temp = "";
	let i = 0, s = 0, t = 0, j = 0;
	for(var x of checkList) {
		if(x === 'i') i++;
		else if(x === 's') s++;
		else if(x === 't') t++;
		else if(x === 'j') j++;
	}
	i > 1 ? temp += 'i' : temp += 'e';
	s > 1 ? temp += 's' : temp += 'n';
	t > 1 ? temp += 't' : temp += 'f';
	j > 1 ? temp += 'j' : temp += 'p';
	return temp;
}

//제출페이지 설명 리스트 만들기

function makeRltList(mbti) {
	const color_class = ['border_rd', 'border_gr', 'border_bl', 'border_yl'];
	const title_color = ['red', 'green', 'blue', 'yellow'];
	const rstUl = $('#result-list ul');
	let fonsiz = 0;
	let checked_lst = [];				//리스트 클릭 여부 확인
	let count = 0;
	
	for(var i = 0; i < summary[mbti].length; i++) {
		checked_lst.push(false);
		var $li = $(`<li></li>`);
		var $p = $(`<p>${summary[mbti][i]}</p>`);
		var $rstLs_content = $(`<p class="rstLs_content">${detail[mbti][i]}</p>`);
		
		$li.append($p, $rstLs_content);
		$li.on('click', function(e) {
			let rst_box = $(e.currentTarget).children().eq(1);
			
			if(rst_box.css('color') == 'rgb(0, 0, 0)') {
				rst_box.css('color', 'transparent');
			}
			rst_box.toggle(600, function() {
				rst_box.css('color', 'black');
			});
		})
		$li.addClass(`rstLs ${color_class[i]}`);
		rstUl.append($li);
	}
	
	$('.rstUl li').click(function() {
		let idx = $(this).index();
		checked_lst[idx] = true;
		
		count = 0;
		for(var i = 0; i < checked_lst.length; i++) {
			if(checked_lst[i] === false) break;
			else {
				count++;
				if(count == checked_lst.length) {
					$('#rstImg').attr('src', `img/${mbti}.png`);
					$('#rstImg').on('load', () => {
						$('#img_container p span').text(quote[mbti].name);
						printRest(mbti);
					});
				}
			}
		}
	});
	
	$('.rstLs_content').css('fontSize', '80%');
	
	//결과 바로보기 클릭 시 사진 바로 보여주기
	$('.direct-result').click(function() {
		$('#rstImg').attr('src', `img/${mbti}.png`);
		$('#rstImg').on('load', () => {
			$('#img_container p span').text(quote[mbti].name);
			printRest(mbti);

			$('#rstImg')[0].scrollIntoView();
		});
		
	});
	
}

//명언과 단짝 & 웬수 출력
function printRest(mbti) {
	//명언 출력
	$('#wise_name').text(`>${quote[mbti].who}<`);
	$('#wise_content').text(quote[mbti].q);
	
	//단짝과 웬수 출력
	const best_mbti = quote[mbti].best;
	const worst_mbti = quote[mbti].worst;
	$('#best img').attr('src', `img/${best_mbti}.png`);
	$('#best_content').text(quote[best_mbti].name);
	$('#worst img').attr('src', `img/${worst_mbti}.png`);
	$('#worst_content').text(quote[worst_mbti].name);
	
	
	$('#partner').show();
}


makeRltList('infj');





// 카카오톡 공유 (23.06.16)