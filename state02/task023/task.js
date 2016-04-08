// 存放遍历出来的 DOM 树节点
var orderQueue = [];
var inAnimation = false;

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
}