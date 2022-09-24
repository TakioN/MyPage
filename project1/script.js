var crudAPP = new function() {
	this.myClass = [
		{no:"1", className:"컴퓨터공학개론", Category:"전공선택", point:3},
		{no:"2", className:"C프로그래밍", Category:"전공필수", point:4},
		{no:"3", className:"알프스 요들송", Category:"심화교양", point:2}
	];
	
	this.category = ["전공필수", "전공선택", "기초교양", "심화교양"];
	this.keys = [];
	
	this.makeTable = () => {
		for(var i = 0; i < this.myClass.length; i++) {
			for(var k in this.myClass[i]) {
				if(this.keys.indexOf(k) === -1) this.keys.push(k);
			}
		}
		
		var table = document.createElement('table');
		//tr작성
		var tr = table.insertRow(-1);
		
		//tr안에 th 넣기
		for(var i = 0; i < this.keys.length; i++) {
			var th = document.createElement('th');
			th.innerHTML = this.keys[i];
			tr.appendChild(th);
		}
		
		//tr안에 td넣기
		for(var i = 0; i < this.myClass.length; i++) {
			tr = table.insertRow(-1);
			for(var j = 0; j < this.keys.length; j++) {
				var tableCell = tr.insertCell(-1);
				tableCell.innerHTML = this.myClass[i][this.keys[j]];
			}
			//update button 만들기
			var td = document.createElement('td');
			tr.appendChild(td);
			var updateBt = document.createElement('input');
			updateBt.setAttribute('type', 'button');
			updateBt.setAttribute('value', 'UPDATE');
			updateBt.setAttribute('style', 'background-color: #44CCE8');
			updateBt.setAttribute('id', 'Edit' + i);
			updateBt.setAttribute('onclick', 'crudAPP.update(this)');
			td.appendChild(updateBt);
			
			//save button 만들기
			tr.appendChild(td);
			var saveBt = document.createElement('input');
			saveBt.setAttribute('type', 'button');
			saveBt.setAttribute('value', 'SAVE');
			saveBt.setAttribute('style', 'display: none;');
			saveBt.setAttribute('id', 'Save' + i);
			saveBt.setAttribute('onclick', 'crudAPP.save(this)');
			td.appendChild(saveBt);
			
			//delete button 만들기
			td = document.createElement('td');
			tr.appendChild(td);
			var deleteBt = document.createElement('input');
			deleteBt.setAttribute('type', 'button');
			deleteBt.setAttribute('value', 'DELETE');
			deleteBt.setAttribute('style', 'background-color: #ED5650');
			deleteBt.setAttribute('id', 'DELETE' + i);
			deleteBt.setAttribute('onclick', 'crudAPP.delete(this)');
			td.appendChild(deleteBt);
		}
		
		//입력 행 만들기
		tr = table.insertRow(-1);
		for(var i = 0; i < this.keys.length; i++) {
			var newCell = tr.insertCell(-1);
			if(i >= 1) {
				if(i == 2) {
					var sel = document.createElement('select');
					sel.innerHTML = "<option value = ''></option>"
					for(var j = 0; j < this.category.length; j++) {
						sel.innerHTML += `<option value = "${this.category[j]}">${this.category[j]}</option>`
					}
					newCell.appendChild(sel);
				}
				else {
					var tBox = document.createElement('input');
					tBox.setAttribute('type', 'text');
					tBox.setAttribute('value', '');
					newCell.appendChild(tBox);
				}			
			}
		}
		
		//create button 만들기
		td = document.createElement('td');
		tr.appendChild(td);
		var createBt = document.createElement('input');
		createBt.setAttribute('type', 'button');
		createBt.setAttribute('value', 'CREATE');
		createBt.setAttribute('style', 'background-color: #207DD1');
		createBt.setAttribute('id', 'CREATE' + i);
		createBt.setAttribute('onclick', 'crudAPP.create(this)');
		td.appendChild(createBt);
		
			
		var con = document.getElementById('container');
		con.innerHTML = "수강 관리 앱";
		con.appendChild(table);
	}
	
	//delete 구현
	this.delete = (target) => {
		var targetIdx = target.parentNode.parentNode.rowIndex;
		this.myClass.splice(targetIdx - 1, 1);
		this.makeTable();
	}
	
	//create 구현
	this.create = (target) => {
		var targetRow = target.parentNode.parentNode;
		var obj = {};
		
		for(var i = 1; i < this.keys.length; i++) {
			var td = targetRow.getElementsByTagName('td')[i];
			if(td.childNodes[0].tagName === 'SELECT' || td.childNodes[0].getAttribute('type') === 'text') {
				var tdval = td.childNodes[0].value;
				if(tdval != '') {
					obj[this.keys[i]] = tdval;
				}
				else {
					alert('All fields should be filled!');
					break;
				}
				if(i == this.keys.length - 1) {
					if(isNaN(obj[this.keys[3]])) {
						alert('Point field should be filled with number!');
						break;
					}
					obj[this.keys[0]] = this.myClass.length + 1;
					this.myClass.push(obj);
					this.makeTable();
				}
			}
		}
	}
	
	//update 구현
	this.update = (target) => {
		var targetRow = target.parentNode.parentNode;
		var rowIdx = targetRow.rowIndex;
		for(var i = 1; i < this.keys.length; i++) {
			var td = targetRow.getElementsByTagName('td')[i];
			if(i == 2) {
				var select = document.createElement('select');
				select.innerHTML = `<option value = "${td.innerText}">${td.innerText}</option>`
				for(var j = 0; j < this.category.length; j++) {
					if(td.innerText === this.category[j]) continue;
					select.innerHTML += `<option value = "${this.category[j]}">${this.category[j]}</option>`
				}
				td.innerText = '';
				td.appendChild(select);
			}
			else {
				var tBox = document.createElement('input');
				tBox.setAttribute('type', 'text');
				tBox.setAttribute('value', td.innerText);
				td.innerText = '';
				td.appendChild(tBox);
			}
		}
		
		target.setAttribute('style', 'display: none;');
		var saveBt = document.getElementById('Save' + (rowIdx - 1));
		saveBt.setAttribute('style', 'display: block; background-color: #2DBF64;');
	}
	
	//save 구현
	this.save = (target) => {
		var targetRow = target.parentNode.parentNode;
		var rowIdx = targetRow.rowIndex;
		var obj = {};
		for(var i = 1; i < this.keys.length; i++) {
			var td = targetRow.getElementsByTagName('td')[i];
			if(td.childNodes[0].getAttribute('type') === 'text' || td.childNodes[0].tagName === 'SELECT') {
				var tdval = td.childNodes[0].value;
				if(tdval != '') {
					obj[this.keys[i]] = tdval;
					// this.myClass[rowIdx - 1][this.keys[i]] = tdval;
				}
				else {
					alert('All fields should be filled!');
					break;
				}
				if(i == this.keys.length - 1) {
					if(isNaN(obj[this.keys[3]])) {
						alert('Point field should be filled with number!');
						break;
					}
					obj[this.keys[0]] = rowIdx;
					this.myClass.splice(rowIdx - 1, 1, obj);
					this.makeTable();
				}
				
			}
		}
	}
}

crudAPP.makeTable();