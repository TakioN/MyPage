//클릭 시 해당 URl을 새 탭에서 열어주기
function onAnchorClick(event) {
	//chrome.tabs.create(createProperties : object, callback ; function)
	chrome.tabs.create({
		selected : true,
		url : event.srcElement.href
	});
	return false;
}

//top URl들로 리스트 만들어 popup에 넣기
function buildPopupDom(divID, data) {
	var popupDiv = document.getElementById(divID);
	var ul = document.createElement('ul');
	popupDiv.appendChild(ul);
	for(var i = 0; i < data.length; i++) {
		var a = document.createElement('a');
		a.href = data[i];
		a.appendChild(document.createTextNode(data[i]));
		a.addEventListener('click', onAnchorClick);
		
		var li = document.createElement('li');
		li.appendChild(a);
		ul.appendChild(li);
	}
}

var numRequestsOutstanding = 0;

//url 리스트 만들기
function buildTypedUrlList(divID) {
	var now = new Date().getTime();
	var week_in_ms = 1000 * 60 * 60 * 24 * 7;
	var pastedTime = now - week_in_ms;
	
	chrome.history.search({
		startTime : pastedTime,
		text : ""
	}, function(historyItem) {
		for(var i = 0; i < historyItem.length; i++) {
			var url = historyItem[i].url;
			var processVisitWithUrl = function(url) {
				//url 중 유저가 직접 입력하여 들어간 url 검출
				return function(visitItem) {
					processVisits(url, visitItem);
				}
			}
			chrome.history.getVisits({ url : url }, processVisitWithUrl(url));
			numRequestsOutstanding++;
		}
		
		if(!numRequestsOutstanding){
			onAllVisitsProceed();
		}
	});
	
	//최종 배열에 넣기
	var onAllVisitsProceed = function() {
		var urlArray = [];
		for(var url in urlCount) {
			urlArray.push(url);
		}
		urlArray.sort(function(a, b) {
			return urlCount[b] - urlCount[a];
		});
		
		buildPopupDom(divID, urlArray.slice(0, 10));
	}
	
	//url 방문 횟수 {url : 방문횟수}
	var urlCount = {};
	
	//url 직접 타이핑으로 방문한 횟수 종합
	var processVisits = function(url, visitItem) {
		for(var i = 0; i < visitItem.length; i++) {
			if(visitItem[i].transition != 'typed') continue;
			if(!urlCount[url]) urlCount[url] = 0;
			urlCount[url]++;
		}
		
		if(!--numRequestsOutstanding) onAllVisitsProceed();
	}
	
	//최종 배열에 넣기
	var onAllVisitsProceed = function() {
		var urlArray = [];
		for(var url in urlCount) {
			urlArray.push(url);
		}
		urlArray.sort(function(a, b) {
			return urlCount[b] - urlCount[a];
		});
		
		buildPopupDom(divID, urlArray.slice(0, 10));
	}
}

//문서 실행시 url list 만드는 함수 실행
document.addEventListener('DOMContentLoaded', function() {
	buildTypedUrlList('typedUrl_div');
});