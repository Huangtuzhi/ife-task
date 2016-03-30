//用数组模拟队列
var queue = [2333, 6666];

//将队列中的元素显示
function renderQueue() {
  content = ""
  for (var ele in queue) {
    content += "<button class='queue-ele'>" + queue[ele] + "</button>";
  }
  document.getElementById('show-box').innerHTML = content;
}

function isQueueEmpty() {
  if (queue.length == 0) {    
    alert("队列为空");
    return 1; 
  }
  return 0;
}

function validateInput() {
  var inputNum = document.getElementsByName('queue-input')[0].value;
  if (inputNum == "") {
    alert("输入为空");
    return 1;
  }
  
  if (/[^0-9/.\s]/g.test(inputNum)) {
    alert('请输入数字');
    return 1;
  }

  return 0;
}

function leftInQueue(num) {
  if (validateInput()) return;

  for (var i = queue.length; i > 0; i--) {
    queue[i] = queue[i-1]
  }
  queue[0] = parseInt(num);

  renderQueue();
}

function rightInQueue(num) {
  if (validateInput()) return;
  queue[queue.length] = parseInt(num);

  renderQueue();
}

function leftOutQueue() {
  if (isQueueEmpty()) return;

  alert("从左边移出的元素是 " + queue[0]);
  for (var i = 0; i < queue.length - 1; i++) {
    queue[i] = queue[i+1]
  }
  queue.splice(queue.length - 1, 1);

  renderQueue();
}

function rightOutQueue() {
  if (isQueueEmpty()) return;

  alert("从右边移出的元素是 " + queue[queue.length - 1]);
  queue.splice(queue.length - 1, 1);

  renderQueue();
}

function removeAnyClick(index) {
  queue.splice(index, 1);
  renderQueue();
}

function init() {
  inputNum = document.getElementsByName('queue-input')[0].value;
  document.getElementById('left-in').onclick = function() {
    var inputNum = document.getElementsByName('queue-input')[0].value;
    leftInQueue(inputNum);
  }

  document.getElementById('right-in').onclick = function() {
    var inputNum = document.getElementsByName('queue-input')[0].value;
    rightInQueue(inputNum);
  }

  document.getElementById('left-out').onclick = leftOutQueue;
  document.getElementById('right-out').onclick = rightOutQueue;

  //事件代理
  document.getElementById('show-box').addEventListener("click", function(e) {
    if(e.target && e.target.nodeName == "BUTTON") {
      var node = e.target;
      var delIndex = [].indexOf.call(node.parentNode.children, node);
      removeAnyClick(delIndex);
    }
  })

  renderQueue();
}

init();