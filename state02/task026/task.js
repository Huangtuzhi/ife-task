//存放星轨坐标
var xAxis = [];
var yAxis = [];

//飞行器模块
function spaceshipModule(shipID) {
  //动力系统
  var flyRet, index = 0;

  //html 中新建一个飞船
  var newDIV = document.createElement('div');
  newDIV.className = 'spaceship';
  newDIV.innerHTML = '100%';
  document.body.appendChild(newDIV);

  this.fly = function() {
    flyRet = setInterval(function() {
      index++;
      if (index >= xAxis.length) {
        index = 0; //重新灰
      }

      var spaceship = document.getElementsByClassName('spaceship')
      spaceship[shipID].style.left = xAxis[index];
      spaceship[shipID].style.top = yAxis[index];
    }, 100);
  }

  this.stop = function() {
    clearInterval(flyRet);
  }
}

//行星模块
function planetModule() {
  var shipID = 1;
  var content = "";

  //这里每点击一次，实例化一个飞行器
  document.getElementById('buildButton').onclick = function() {
    if (shipID > 3) {
      alert('建造飞船数已达上限');
      return;
    }

    var newShip = new spaceshipModule(shipID - 1);

    //这里需要使用 append 的方式添加 div，不能用 innerHTML 全部替换。事件绑定了。
    var newDIV = document.createElement('div');
    newDIV.className = 'ship-pad';
    newDIV.innerHTML = "飞船 " + shipID + "<input type='button' class='fly-button' value='飞行'><input type='button' class='stop-button' value='停止'>";
    document.getElementById('ship-list').appendChild(newDIV);
    var shipList = document.getElementById('ship-list');
    document.getElementById('ship-list').getElementsByClassName('fly-button')[shipID - 1].onclick = newShip.fly;
    document.getElementById('ship-list').getElementsByClassName('stop-button')[shipID - 1].onclick = newShip.stop;
    shipID++;
  }

  //计算飞船的坐标
  this.caculateAxis = function() {
    for (var x = 461; x <= 961; x += 10) {
      xAxis.push(x);
    }
    for (var x = 961; x >= 461; x -= 10) {
      xAxis.push(x);
    }

    for (var i = 0; i < xAxis.length / 2; i++) {
      var temp = Math.round(300 - Math.sqrt(62500 - (xAxis[i] - 711) * (xAxis[i] - 711)));
      yAxis.push(temp);
    }

    for (var i = xAxis.length / 2; i < xAxis.length; i++) {
      var temp = Math.round(300 + Math.sqrt(62500 - (xAxis[i] - 711) * (xAxis[i] - 711)));
      yAxis.push(temp);
    }
  }
}

var planet = new planetModule();
planet.caculateAxis();