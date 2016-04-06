// 存放遍历出来的 DOM 树节点
var orderQueue = [];
var inAnimation = false;

//先序遍历
function preOrder(root) {
  orderQueue.push(root);
  if (root.firstElementChild != null) 
    preOrder(root.firstElementChild);
  if (root.lastElementChild != null)
    preOrder(root.lastElementChild);
}

//中序遍历
function inOrder(root) {
  if (root.firstElementChild != null)
    inOrder(root.firstElementChild);
  orderQueue.push(root);
  if (root.lastElementChild != null)
    inOrder(root.lastElementChild);
}

//后续遍历
function postOrder(root) {
  if (root.firstElementChild != null)
    postOrder(root.firstElementChild);
  if (root.lastElementChild !== null)
    postOrder(root.lastElementChild);
  orderQueue.push(root);
}

function render() {
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
      inAnimation = false;
      return;
    }
    orderQueue[i - 1].style.backgroundColor = '#fff';
    orderQueue[i].style.backgroundColor = 'blue';
  }, 500);
}

var rootNode = document.getElementById('wrapper');
window.onload = function() {
  //按钮绑定事件
  document.getElementById('preorder').onclick = function() {
    preOrder(rootNode);
    render();
  }

  document.getElementById('inorder').onclick = function() {
    inOrder(rootNode);
    render();
  }

  document.getElementById('postorder').onclick = function() {
    postOrder(rootNode);
    render();
  }  
}