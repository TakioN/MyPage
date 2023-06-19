window.onload = function() {

	//<이미지 슬라이드 구현>

	//요소 선택
	let countImg = 0;
	let slideInterval;
	let slide_ul = document.getElementById('slide_list');
	let img = document.getElementsByClassName('slide_img');
	let slide_li = document.querySelectorAll('#slide_list li');
	let popTimeOut;     //팝업 재생 시 1초 timeout
	let stop = false;    //인터벌 즉시정지
	let playBtn = document.getElementById('pbtn');    //슬라이드 재생버튼

	//속성 선택
	const img_height = img[0].height;
	const li_margin = parseInt(getComputedStyle(slide_li[0]).marginBottom);

	function slide() {
		if(countImg !== 2) {
			slide_ul.style.top = '-' + ((countImg + 1) * (li_margin + img_height)) + 'px';
			countImg++;
			slideTitleEqualize(countImg);
		}
		else {
			slide_ul.style.top = 0;
			countImg = 0;
			slideTitleEqualize(countImg);
		}
	}

	//countImg 맞게 .slide_title_item, popup 변경 
	let slide_title = document.getElementsByClassName('slide_title_item');
	function slideTitleEqualize(idx) {
		for(var i = 0; i < slide_title.length; i++) {
			if(i == idx) {
				slide_title[i].style.backgroundColor = 'rgb(0, 171, 229)';
				slide_title[i].style.color = 'white';
			}
			else {
				slide_title[i].style.backgroundColor = 'white';
				slide_title[i].style.color = '#666666';
			}
			clearPopup();
			popTimeOut = setTimeout(()=>{
				if(stop === false) popupBox(idx);
			}, 1000);
		}
	}

	//.slide_title_item 클릭 시 slide 변경
	function clickTitle(target) {
		for(var i = 0; i < slide_title.length; i++) {
			slide_title[i].style.backgroundColor = 'white';
			slide_title[i].style.color = '#666666';
		}
		target.style.backgroundColor = 'rgb(0, 171, 229)';
		target.style.color = 'white';
		for(var i = 0; i < target.parentNode.children.length; i++) {
			if(target.parentNode.children[i] === target) countImg = i;
		}
		if(countImg === 0) {
			slide_ul.style.top = 0;
		} 
		else {
			slide_ul.style.top = '-' + (countImg * (li_margin + img_height)) + 'px';
		}
		clearPopup();
		popTimeOut = setTimeout(()=>{
			stop = false;
			popupBox(countImg);
		}, 1000);

		//test 5초수정
		slideInterval = setInterval(slide, 3000);
	}

	for(var i = 0; i < slide_title.length; i++) {
		slide_title[i].addEventListener('click', (e) => {
			stop = true;
			clearInterval(slideInterval);
			clearTimeout(popTimeOut);
			if(playBtn.getAttribute('src') === 'img/play.png') playBtn.src = 'img/pause.png';
			clickTitle(e.target);
		});
	}

	//slide_popup 구현

	let popup = document.querySelector('#slide_popup img');	
	let popupDiv = document.querySelector('#slide_popup');	
	function popupBox(idx) {
		clearTimeout(popTimeOut);
		popup.src = `img/popup${idx + 1}.png`;
		popupDiv.animate([
			{
				top: '280px'
			},
			{
				top: '110px'
			}
		], {
			duration: 1000,
			easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
		});
		if(idx == 0) {
			popupDiv.style.right = '-10px';
			popupDiv.style.left = 'auto';
		}
		else {
			popupDiv.style.left= '-10px';
			popupDiv.style.right = 'auto';
		} 
	}
	function clearPopup() {
		popup.src="";
	}


	//<pbtn hover시에 색상 변경>

	playBtn.addEventListener('mouseover', function(e) {
		if(this.getAttribute('src') === 'img/pause.png') {
			this.src="img/pause_hover.png";
		}
		else {
			this.src="img/play_hover.png";
		}
		this.style.border = '1px solid skyblue';
		this.style.width = '27px';
	});
	playBtn.addEventListener('mouseout', function(e) {
		if(this.getAttribute('src') === 'img/pause_hover.png') {
			this.src="img/pause.png";
		}
		else {
			this.src="img/play.png";
		}
		this.style.border = 'none';
		this.style.width = '27px';
	});
	playBtn.addEventListener('click', function(e) {
		if(this.getAttribute('src') === 'img/pause_hover.png') {
			clearInterval(slideInterval);
			this.src="img/play_hover.png";
		}
		else {
			//test 5초 수정
			slideInterval = setInterval(slide, 3000);
			this.src="img/pause_hover.png";
		}
	});
	
	
	
	//<이동버튼 누르면 계열사 이동 구현>
	
	let aff = document.querySelector('footer select');    //계열사 선택
	let goBtn = document.querySelector('footer button');    //이동 버튼
	
	goBtn.addEventListener('click', (e) => {
		if(aff.value === 'ens') open('https://www.daeryunens.com/');
		else if(aff.value === 'solmoro') open('http://www.solmoro.com/');
		else if(aff.value === 'devel') open('https://www.daeryunpower.com/daeryunpower/index.asp?mtype=power');
		else if(aff.value === 'energy') open('https://www.star-energy.co.kr/starenergy/index.asp?mtype=energy');
	});
	
	
	//<navItem hover시 밑에 나오게 하기>

	const navHvr = [
		{
			"인사말" : "http://www.hhic-holdings.com/html/01_company/01_company.asp",
			"그룹비전" : "http://www.hhic-holdings.com/html/01_company/02_company.asp",
			"경영전략" : "http://www.hhic-holdings.com/html/01_company/03_company.asp",
			"연혁" : "http://www.hhic-holdings.com/html/01_company/04_company.asp",
			"CI소개" : "http://www.hhic-holdings.com/html/01_company/05_company.asp",
			"연락처 및 위치안내" : "http://www.hhic-holdings.com/html/06_company/02_company.asp",
			"내부고발제도 안내" : "http://www.hhic-holdings.com/html/07_company/02_company.asp"
		},
		{
			"대륜E&S": "http://www.hhic-holdings.com/html/02_family/02_family.asp",
			"한일레저": "http://www.hhic-holdings.com/html/02_family/04_family.asp",
			"대륜발전": "http://www.hhic-holdings.com/html/02_family/06_family.asp",
			"별내에너지": "http://www.hhic-holdings.com/html/02_family/07_family.asp"
		},
		{
			"뉴스": "http://www.hhic-holdings.com/html/03_investor/01_news_list.asp?type_ctrl=list",
			"공지사항": "http://www.hhic-holdings.com/html/03_investor/02_public_list.asp?type_ctrl=list",
			"IR CONTACT": "http://www.hhic-holdings.com/html/03_investor/05_investor.asp"
		},
		{
			"인재상" : "http://www.hhic-holdings.com/html/05_recruit/01_recruit.asp",
			"복리후생제도" : "http://www.hhic-holdings.com/html/05_recruit/02_recruit.asp",
			"인사제도" : "http://www.hhic-holdings.com/html/05_recruit/03_recruit.asp",
			"채용정보" : "http://www.hhic-holdings.com/html/05_recruit/04_recruit_list.asp?type_ctrl=list",
			"채용문의" : "http://www.hhic-holdings.com/html/05_recruit/05_recruit_list.asp?type_ctrl=list"
		},
		{
			"作協通": "http://www.hhic-holdings.com/html/06_social/01_social.asp",
			"복지사업": "http://www.hhic-holdings.com/html/06_social/02_social.asp",
			"기부활동": "http://www.hhic-holdings.com/html/06_social/03_social.asp",
			"환경보호활동": "http://www.hhic-holdings.com/html/06_social/04_social.asp"
		}
	];
	
	let nis = document.getElementsByClassName('nav_item');
	let childCount, navUlChild;
	
	let navPop = document.getElementById('navPop');
	let navPop_ul = document.querySelector('#navPop ul');
	let navPop_li, navPop_a;
	
	for(var i = 0; i < nis.length; i++) {
		nis[i].addEventListener('mouseover', (e) => {
			
			navPop_ul.innerText = "";
			
			//nav_item의 몇번째 자식인지 구하기
			navUlChild = e.composedPath()[2].children;
			for(var j = 0; j < navUlChild.length; j++) {
				if(navUlChild[j] === e.composedPath()[1]) {
					childCount = j;
					break;
				}
			}
			
			//순번에 맞는 div창 띄우기
			for(var j in navHvr[childCount]) {
				navPop_li = document.createElement('li');
				navPop_a = document.createElement('a');
				navPop_a.textContent = j;
				navPop_a.href = navHvr[childCount][j];
				navPop_li.appendChild(navPop_a);
				navPop_ul.appendChild(navPop_li);
			}
			
			//navpop 위치조정
			let clientRect = 0;
			if(childCount === 0 || childCount === 1){
				clientRect = nis[0].getBoundingClientRect();
				navPop.style.left = clientRect.left + 'px';
			}
			else if(childCount === 2 || childCount === 3){
				clientRect = nis[1].getBoundingClientRect();
				navPop.style.left = (clientRect.left + 10) + 'px';
			}
			else{
				clientRect = nis[2].getBoundingClientRect();
				navPop.style.left = (clientRect.left - 10) + 'px';
			}
			
			navPop.style.display = 'block';
			
		});
		
		
		nis[i].addEventListener('mouseout', (e) => {
			let navPop_pos = navPop.getBoundingClientRect();
			let nis_pos = e.target.getBoundingClientRect();
			if(e.clientX <= navPop_pos.left || e.clientX >= navPop_pos.right || e.clientY <= nis_pos.bottom || e.clientY >= navPop_pos.bottom) {
				navPop_ul.innerText = "";
				navPop.style.display = 'none';
			}
		});
	} 
	navPop.addEventListener('mouseleave', (e) => {
		navPop_ul.innerText = "";
		navPop.style.display = 'none';
	})
	
	
	
	//<함수실행>

	slideTitleEqualize(countImg);

	slideInterval = setInterval(slide, 5000);
	
}