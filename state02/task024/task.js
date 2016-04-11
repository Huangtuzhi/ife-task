// 存放遍历出来的 DOM 树节点
var orderQueue = [];
var inAnimation = false;
var selectedDiv = [];

//先序遍历查找
function preOrder(root) {
  orderQueue.push(root);
  for (var i = 0; i < root.childElementCount; i++)
  {
    if (root.children[i] != null)
      preOrder(root.children[i]);
  }
}

//后序遍历
function postOrder(root) {
  for (var i = 0; i < root.childElementCount; i++)
  {
    if (root.children[i] != null)
      postOrder(root.children[i]);
  }
  orderQueue.push(root);
}

//多叉树遍历的结果存放在 orderQueue 中，在这个队列中寻找 queryWord
function render(queryWord) {
  if (inAnimation) {
    alert('in animation');
    return;
  }

  inAnimation = true;
  var i = 0;
  orderQueue[i].style.backgroundColor = 'blue';
  var showRet = setInterval(function() {
    i++;
    if (i >= orderQueue.length) {
      clearInterval(showRet);
      orderQueue[orderQueue.length - 1].style.backgroundColor = '#fff';
      alert("未找到查询内容");
      inAnimation = false;
      return;
    }
    orderQueue[i - 1].style.backgroundColor = '#fff';
    orderQueue[i].style.backgroundColor = 'blue';

    //找到查询词
    if (orderQueue[i].childNodes[0].nodeValue.search(queryWord) != -1) {
      alert("找到查询内容");
      clearInterval(showRet);
      inAnimation = false;
      return;
    }

  }, 500);
}

function resetBackgroundColor() {
  for(var i = 0; i < orderQueue.length; i++)
  {
    orderQueue[i].style.backgroundColor = '#fff';
  }
}

function validateInput() {
  var input = document.getElementById('queryInput').value;
  if (input == "") {
    alert("输入为空");
    return 1;
  }
  return 0;
}

function clearSelectedDiv() {
  var allDiv = document.getElementsByTagName('div');
  for (var i = 0; i < allDiv.length; i++) {
    allDiv[i].style.backgroundColor = '#fff';
  }
  selectedDiv = [];
}

//给点击事件绑定回调函数，点击时 box 背景颜色改变
//这里不用按钮包在内容上
function addDivEvent() {
  var divList = document.getElementById('wrapper').getElementsByTagName('div');
  for (i in divList) {
    divList[i].onclick = function(e) {
      clearSelectedDiv();
      this.style.backgroundColor = '#ab1238';
      e.stopPropagation(); //阻止事件冒泡
      selectedDiv.push(this);
      // console.log(selectedDiv);
    }
  }
}

var rootNode = document.getElementById('wrapper');
window.onload = function() {
  document.getElementById('queryButton').onclick = function() {
    var input = document.getElementById('queryInput').value;
    // 将上次查询高亮消除
    resetBackgroundColor();

    // 验证输入是否合法
    if (validateInput())
      return;

    // 遍历多叉树
    preOrder(rootNode);
    
    render(input);
  }

  //给所有 div 绑定点击事件
  addDivEvent();

  //给增加按钮绑定点击事件
  document.getElementById('addButton').onclick = function() {
    if (selectedDiv.length == 0) {
      alert("请选定元素");
    }
    var newDiv = document.createElement('div');
    newDiv.innerText = document.getElementById('addElement').value;
    newDiv.className = 'new_layer';
    selectedDiv[0].appendChild(newDiv);
    //给新增 div 绑定点击事件
    addDivEvent();
  }

  //给删除按钮绑定点击事件
  document.getElementById('delButton').onclick = function() {
    if (selectedDiv.length == 0) {
      alert("请选定元素");
    }
    selectedDiv[0].parentNode.removeChild(selectedDiv[0]);
  }

}  