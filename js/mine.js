window.onload = function() {
	init();
	var addButton = document.getElementById("add_button");
	addButton.onclick = createSticky;
	var form_time = document.getElementById("form_time");
//	form_time.value = "2016/05/13";
//	var clearButton = document.getElementById("clear_button");
//	clearButton.onclick = clearAll;
//	document.getElementById("note_text").focus();
}

//在页面打开时，读取已有便签，并显示在页面上
function init() {
	var stickyObj = getStickiesObj();
	for(i in stickyObj){
//		alert(stickyObj[i]);
		addStickyToDom(i, stickyObj[i]);
	}
}

//将一个便签显示在页面上
function addStickyToDom(key, value){
	var stickiesNode = document.getElementById("stickies");
	var newStikeyNode = document.createElement("li");
	newStikeyNode.setAttribute("id", key);
	newStikeyNode.setAttribute("title", "双击删除此便签");
	var html = "";
//	html +=    "<img class=\"mui-media-object mui-pull-left\" src=\"\">";
	html +=    "<div class=\"mui-media-body\">";
	html += 		value.obj;
	html += 		"<p class=\"mui-ellipsis\">";
	html += 		"<span class=\"mine-li-buy-time\">购买时间：" + value.time + "</span>";
	html += 		"<span class=\"mine-li-buy-where\">购买网址：" + value.where + "</span>";
	html += 		"<span class=\"mine-li-price\">价钱：" + value.price + "</span>";
	html += 		"</p>";
	html += 	"</div>";
	newStikeyNode.innerHTML = html;
	newStikeyNode.ondblclick = delSticky;
	stickiesNode.appendChild(newStikeyNode);
}

//新增加便签
function createSticky() {
//	var noteNode = document.getElementById("note_text");
//	var noteText = noteNode.value;
//	if (noteText == "") {
//		alert("请输入内容后再添加。");
//	}
//	noteNode.value = "";
//	noteNode.focus();
	
	var noteText = {
			obj:"拉杆箱",
			time:"2016-5-13",
			where:"京东",
			price:399
	};
	var date = new Date();
	var timeNow = date.getTime();
	var key = "sticky_"+timeNow;
	var stickyObj = getStickiesObj();
	stickyObj[key] = noteText;
	setStickiesObj(stickyObj);
	addStickyToDom(key, noteText);
}

//在localStorage中读取出来所有的便签数据
function getStickiesObj() {
	var stickyObj = localStorage.getItem("buyObjs");
	if (!stickyObj) {
		stickyObj = {};
		localStorage.setItem("buyObjs", JSON.stringify(stickyObj));
		return stickyObj;
	}
	else {
		return JSON.parse(stickyObj);
	}
}

//把全部便签对象存储进localstorage
function setStickiesObj(obj){
	localStorage.setItem("buyObjs", JSON.stringify(obj));
}

//清除全部便签
function clearAll(){
	if(window.confirm("确认要全部清除吗？") ==false){
		return false;
	}
	localStorage.clear();
	delAllStickiesFromDom();
}

//删除全部便签元素
function delAllStickiesFromDom(){
	document.getElementById("stickies").innerHTML = "";
}

//删除指定的便签
function delSticky(){
	var id = this.id;
	var stickies = getStickiesObj();
	delete stickies[id];
	setStickiesObj(stickies);
	this.parentNode.removeChild(this);	
}

function newDate(){
	return new Date();
}
