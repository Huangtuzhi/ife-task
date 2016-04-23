var boxInfo = {
  xAsis: 4,
  yAsis: 1,
  direction: 0
};

function $(id) {
  return document.querySelector(id);
}

function locateBox(x, y) {
  var yAsis = document.getElementsByTagName('tr')[y+1];
  var position = yAsis.getElementsByTagName('td')[x+1];
  return position;
}

function renderBox() {
  var content = "";
  switch (boxInfo.direction) {
  case 0:
  content = "<div id='box'><div id='front-0'></div><div id='back-0'></div></div>";
  break;
  case 90:
  content = "<div id='box'><div id='front-90'></div><div id='back-90'></div></div>";
  break;
  case 180:
  content = "<div id='box'><div id='front-180'></div><div id='back-180'></div></div>";
  break;
  case 270:
  content = "<div id='box'><div id='front-270'></div><div id='back-270'></div></div>";
  } 
  return content;
}

function moveBox(x, y) {
  var pastBox = document.getElementById('box');
  pastBox.parentNode.removeChild(pastBox);
  var position = locateBox(x, y);
  var html = renderBox();
  position.innerHTML =  html;
}

function buildWall() {
  switch (boxInfo.direction) {
    case 0:
      if (boxInfo.yAsis - 1 >= 0)
        locateBox(boxInfo.xAsis, boxInfo.yAsis - 1).style.backgroundColor="grey";
      else 
        console.log('已到达顶边');
      break;
    case 180:
      if (boxInfo.yAsis + 1 <= 9)
        locateBox(boxInfo.xAsis, boxInfo.yAsis + 1).style.backgroundColor="grey";
      else 
        console.log('已到达底边');
      break;
    case 270:
      if (boxInfo.xAsis - 1 >= 0) 
        locateBox(boxInfo.xAsis - 1, boxInfo.yAsis).style.backgroundColor="grey";
      else 
        console.log('已到达左边');
      break;
    case 90:
      if (boxInfo.xAsis + 1 <= 9)
        locateBox(boxInfo.xAsis + 1, boxInfo.yAsis).style.backgroundColor="grey";
      else 
        console.log('已到达右边');
  }
}

function buildRandomWalls() {
  var xAsis = [], yAsis = [];

  //清除之前的墙
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (i == boxInfo.xAsis && j == boxInfo.yAsis)
        continue; 
      locateBox(i, j).style.backgroundColor = "white";
    }
  }

  //任选 12 个位置建墙
  for (var i = 0; i < 12; i++) {
    xAsis.push(Math.floor(Math.random() * 10));
    yAsis.push(Math.floor(Math.random() * 10));
  }

  for (var i = 0; i < 12; i++) {
    if (xAsis[i] == boxInfo.xAsis && yAsis[i] == boxInfo.yAsis)
      continue;
    locateBox(xAsis[i], yAsis[i]).style.backgroundColor = "grey";
  }
}

function execCommand(command) {
  var commandList = command.split(' ');

  var step;
  var cmd = "";
  if (commandList[0] == "GO" || commandList[0] == "BUILD")
    cmd = commandList[0];
  else 
    cmd = commandList[0] + " " + commandList[1];

  if (cmd == "TURN BACK" || cmd == "TURN LEFT" || cmd == "TURN RIGHT" || cmd == "BUILD")
    step = 0; //这些命令不用步数
  else 
    step = parseInt(commandList[commandList.length - 1]);
  
  if (!/^[0-9]*$/.test(step)) {
    alert('请输入步数');
  }

  switch (cmd) {
    case "GO": 
    {
      switch (boxInfo.direction) {
        case 0: 
        if (boxInfo.yAsis - step >= 0) boxInfo.yAsis -= step;
        moveBox(boxInfo.xAsis, boxInfo.yAsis);
        break;
        case 180:
        if (boxInfo.yAsis + step <= 9) boxInfo.yAsis += step;
        moveBox(boxInfo.xAsis, boxInfo.yAsis);
        break;
        case 270:
        if (boxInfo.xAsis - step >= 0) boxInfo.xAsis -= step;
        moveBox(boxInfo.xAsis, boxInfo.yAsis);
        break;
        case 90:
        if (boxInfo.xAsis + step <= 9) boxInfo.xAsis += step;
        moveBox(boxInfo.xAsis, boxInfo.yAsis);
      }
      break;
    }

    case "TURN LEFT": 
    boxInfo.direction -= 90;
    if (boxInfo.direction == -90) boxInfo.direction = 270;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;

    case "TURN RIGHT": 
    boxInfo.direction += 90;
    if (boxInfo.direction == 360) boxInfo.direction = 0;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;

    case "TURN BACK":
    boxInfo.direction += 180;
    if (boxInfo.direction == 360) boxInfo.direction = 0;
    if (boxInfo.direction == 450) boxInfo.direction = 90;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;

    case "TRA LEF":
    if (boxInfo.xAsis > 0) boxInfo.xAsis--;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;

    case "TRA TOP":
    if (boxInfo.yAsis - step >= 0) boxInfo.yAsis -= step;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;    

    case "TRA RIG":
    if (boxInfo.xAsis + step <= 9) boxInfo.xAsis += step;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;

    case "TRA BOT":
    if (boxInfo.yAsis + step <= 9) boxInfo.yAsis += step;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;

    case "MOV LEF":
    boxInfo.direction = 270;
    if (boxInfo.xAsis >= 0) boxInfo.xAsis--;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;

    case "MOV TOP":
    boxInfo.direction = 0;
    if (boxInfo.yAsis >= 0) boxInfo.yAsis--;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;   

    case "MOV RIG":
    boxInfo.direction = 90;
    if (boxInfo.xAsis <= 9) boxInfo.xAsis++;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;

    case "MOV BOT":
    boxInfo.direction = 180;
    if (boxInfo.yAsis <= 9) boxInfo.yAsis++;
    moveBox(boxInfo.xAsis, boxInfo.yAsis);
    break;

    case "BUILD":
    buildWall();
    break;

    default:
    alert("命令非法");
  }
}

function parseCommand() {
  var cmds = $('#commandField').value;
  var list = cmds.split('\n');

  var i = 0;
  var cmdRet = setInterval(function() {
      if (i >= list.length) {
        clearInterval(cmdRet);
        return;
      }

      execCommand(list[i++]);
    }, 500);
}

window.onload = function() {
  $('#execButton').onclick = function() {
    parseCommand();
  }
  $('#freshButton').onclick = function() {
    $('#commandField').value = "";
  }
  $('#buildButton').onclick = function() {
    buildRandomWalls();
  }
}