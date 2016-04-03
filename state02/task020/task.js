//用数组模拟队列
var queue = ["林黛玉", "贾宝玉", "刑岫烟", "史湘云"];

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

  return 0;
}

function leftInQueue(num) {
  if (validateInput()) return;

  for (var i = queue.length; i > 0; i--) {
    queue[i] = queue[i-1]
  }
  queue[0] = num;

  renderQueue();
}

function rightInQueue(num) {
  if (validateInput()) return;
  queue[queue.length] = num;

  renderQueue();
}

function leftOutQueue() {
  if (isQueueEmpty()) return;

  for (var i = 0; i < queue.length - 1; i++) {
    queue[i] = queue[i+1]
  }
  queue.splice(queue.length - 1, 1);

  renderQueue();
}

function rightOutQueue() {
  if (isQueueEmpty()) return;

  queue.splice(queue.length - 1, 1);
  renderQueue();
}

function removeAnyClick(index) {
  queue.splice(index, 1);
  renderQueue();
}

function processInput() {
  var input = document.getElementsByName('queue-input')[0].value;
  var regexedInput = input.replace(/[,，、;；\s]/g, "|");
  var parts = regexedInput.split("|");
  return parts;
}

function highlightQuery(index) {
  var cursor = document.getElementById("show-box").children[index];
  cursor.style.backgroundColor = '#338900';
}

function queryWord() {
  for (var i in queue) {
    document.getElementById("show-box").children[i].style.backgroundColor = '#ff0000';
  }

  var queryInput = document.getElementsByName('query-input')[0].value;
  for (var i in queue) {
    if (queue[i].search(queryInput) != -1) {
      highlightQuery(i);
    }
  }
}

function init() {
  document.getElementById('left-in').onclick = function() {
    var input = processInput();
    for (var i in input) {
      leftInQueue(input[i]);
    }
  }

  document.getElementById('right-in').onclick = function() {
    var input = processInput();
    for (var i in input) {
      rightInQueue(input[i]);
    }
  }

  document.getElementById('left-out').onclick = leftOutQueue;
  document.getElementById('right-out').onclick = rightOutQueue;

  document.getElementById('query').onclick = queryWord;

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