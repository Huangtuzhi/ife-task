//用数组模拟队列
var queue = [];
var inAnimation = false;

//将队列中的元素显示
function renderQueue() {
  content = ""
  for (var ele in queue) {
    content +="<div class='outer'>";
    content += "<button class='bar' style='height: " + queue[ele] + "px;background-color:#2288" + queue[ele] + "'></button>";
    // content += "<button class='bar' style='height: " + queue[ele] + "px'></button>";
    content +="</div>";
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

  if (parseInt(inputNum) > 100 || parseInt(inputNum) < 10) {
    alert('数字取值范围为 10~100');
    return 1;
  }

  if (queue.length > 60) {
    alert('队列长度不能超过 60');
    return 1;
  }

  return 0;
}

function leftInQueue(num) {
  if (inAnimation) {
    alert('in animation');
    return;
  }
  if (validateInput()) return;

  for (var i = queue.length; i > 0; i--) {
    queue[i] = queue[i-1]
  }
  queue[0] = parseInt(num);

  renderQueue();
}

function rightInQueue(num) {
  if (inAnimation) {
    alert('in animation');
    return;
  }
  if (validateInput()) return;
  queue[queue.length] = parseInt(num);

  renderQueue();
}

function leftOutQueue() {
  if (inAnimation) {
    alert('in animation');
    return;
  }
  if (isQueueEmpty()) return;

  // alert("从左边移出的元素是 " + queue[0]);
  for (var i = 0; i < queue.length - 1; i++) {
    queue[i] = queue[i+1]
  }
  queue.splice(queue.length - 1, 1);

  renderQueue();
}

function rightOutQueue() {
  if (isQueueEmpty()) return;
  if (inAnimation) {
    alert('in animation');
    return;
  }

  // alert("从右边移出的元素是 " + queue[queue.length - 1]);
  queue.splice(queue.length - 1, 1);

  renderQueue();
}

function removeAnyClick(index) {
  if (inAnimation) {
    alert('in animation');
    return;
  }
  queue.splice(index, 1);
  renderQueue();
}

function randomData() {
  if (inAnimation) {
    alert('in animation');
    return;
  }
  var data = []
  for (var i = 0; i < 50; i++) {
    data.push(Math.floor(Math.random() * 90 + 10));
  }
  queue = data;
  renderQueue();
}

function bubbleSort() {
  if (inAnimation) {
    alert('in animation');
    return;
  }

  var i = 0;
  inAnimation = true;
  var sortRet = setInterval(function() {
      if (i >= queue.length) {
        clearInterval(sortRet);
        inAnimation = false;
        return;
      }

      for (var j = 0; j < queue.length - 1 - i; j++) {
        if (queue[j] > queue[j + 1]) {
          var temp = queue[j];
          queue[j] = queue[j + 1];
          queue[j + 1] = temp;
        }
      }
      renderQueue();
      i++;
    }, 100);
}

function selectSort() {
  if (inAnimation) {
    alert('in animation');
    return;
  }

  var i = 0;
  inAnimation = true;
  var sortRet = setInterval(function() {
      if (i >= queue.length) {
        clearInterval(sortRet);
        inAnimation = false;
        return;
      }

      var minNumIndex = i;
      for (var j = i + 1; j < queue.length; j++) {
        if (queue[j] < queue[minNumIndex]) {
          minNumIndex = j;
        }
      }

      if (minNumIndex != i) {
        var temp = queue[i];
        queue[i] = queue[minNumIndex];
        queue[minNumIndex] = temp;
      }

      renderQueue();
      i++;
    }, 100);
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
  document.getElementById('random-num').onclick = randomData;
  document.getElementById('bubble-sort').onclick = bubbleSort;
  document.getElementById('select-sort').onclick = selectSort;

  //事件代理
  document.getElementById('show-box').addEventListener("click", function(e) {
    console.log(e.target);
    if(e.target && e.target.nodeName == "BUTTON") {
      var node = e.target;
      var delIndex = [].indexOf.call(node.parentNode.parentNode.children, node.parentNode);
      removeAnyClick(delIndex);
    }
  })

  randomData();
}

init();