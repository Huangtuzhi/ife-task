var boxInfo = {
  xAsis: 4,
  yAsis: 1,
  direction: 0
};

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



function execCommand() {
  var command = document.getElementById("commandField").value;
  switch (command) {
    case "GO": 
    {
      switch (boxInfo.direction) {
        case 0: 
        if (boxInfo.yAsis > 0) boxInfo.yAsis--;
        moveBox(boxInfo.xAsis, boxInfo.yAsis);
        break;
        case 180:
        if (boxInfo.yAsis < 9) boxInfo.yAsis++;
        moveBox(boxInfo.xAsis, boxInfo.yAsis);
        break;
        case 270:
        if (boxInfo.xAsis > 0) boxInfo.xAsis--;
        moveBox(boxInfo.xAsis, boxInfo.yAsis);
        break;
        case 90:
        if (boxInfo.xAsis < 9) boxInfo.xAsis++;
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

    default:
    alert("命令非法");
  }
}

window.onload = function() {
  document.getElementById('execButton').onclick = function() {
    execCommand();
  }
}
