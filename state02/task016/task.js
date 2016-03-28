/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value.trim();
	var airIndex = document.getElementById('aqi-value-input').value.trim();
	aqiData[city] = airIndex;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var content = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";

	for(var i in aqiData) {
		content += "<tr><td>" + i + "</td><td>" + aqiData[i] + "</td><td><button>删除</button></td></tr>";
	}

	var aqiTable = document.getElementById('aqi-table');
	aqiTable.innerHTML = content;
}


function validateInput() {
	var city = document.getElementById('aqi-city-input').value.trim();
	var airIndex = document.getElementById('aqi-value-input').value.trim()
	if(city=="" || airIndex=="") {
		alert("输入为空");
		return false;
	}

    if(/[^\u4E00-\u9FA5a-zA-Z\s]/g.test(city)) {
    	alert('城市请输入中英文');
    	return false;	
    }

    if(/[^0-9/.\s]/g.test(airIndex)) {
    	alert('空气质量请输入数字');
    	return false;
    }

	return true;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	if (!validateInput()) return;
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
	delete aqiData[city];
	renderAqiList();
}

function init() {
	//给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById('add-btn').onclick = addBtnHandle;

	//事件代理
	document.getElementById('aqi-table').addEventListener("click", function(e) {
		if(e.target && e.target.nodeName == "BUTTON") {
			var city = e.target.parentNode.parentNode.firstChild.firstChild.nodeValue;
			delBtnHandle(city);
		}
	})

	//失去焦点时验证文本框输入
	// document.getElementById('aqi-city-input').onblur = function() {
	// 	if(/[^\u4E00-\u9FA5a-zA-Z\s]/g.test(this.value))
	// 		alert('请输入中英文');
	// }

	// document.getElementById('aqi-value-input').onblur = function() {
	// 	if(/[^0-9/.\s]/g.test(this.value))
	// 		alert('请输入数字');
	// }

	//给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数


}

init();