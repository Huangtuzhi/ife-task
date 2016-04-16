//存放星轨坐标
var xAxis = [];
var yAxis = [];

//飞行器模块
function spaceshipModule(shipID) {
  //动力系统
  this.flyState = false;
  this.callCostEnergeFunction = false;
  this.energy = 100;
  var flyRet, index = 0;

  //html 中新建一个飞船
  var newDIV = document.createElement('div');
  newDIV.className = 'spaceship';
  newDIV.innerHTML = shipID + 1 + "号 " + this.energy  + "%";
  document.body.appendChild(newDIV);

  this.costEnerge = function() {
    var costEnergeRet = setInterval(function() {
      if (this.energy <= 0) {
        this.stop();
        return;
      }

      //飞行过程中才消耗能源
      if (this.flyState) {
        this.energy -= 1;
        document.getElementsByClassName('spaceship')[shipID].innerHTML = shipID + 1 + "号 " + this.energy + "%";
      }  
    }.bind(this), 200)
  };

  //一直在补充太阳能
  this.addEnerge = function() {
    var addEnergeRet = setInterval(function() {
      if (this.energy >= 100) {
        return;
      }

      this.energy += 1;
      document.getElementsByClassName('spaceship')[shipID].innerHTML = shipID + 1 + "号 " + this.energy + "%";  
    }.bind(this), 500)
  }

  this.fly = function() {
    if (!this.callCostEnergeFunction) {
      this.costEnerge();
      this.addEnerge();
    }
    this.callCostEnergeFunction = true;

    if (this.flyState) {
      return;
    }

    this.flyState = true;
    flyRet = setInterval(function() {
      index++;
      if (index >= xAxis.length) {
        index = 0; //重新灰
      }

      var spaceship = document.getElementsByClassName('spaceship')
      spaceship[shipID].style.left = xAxis[index];
      spaceship[shipID].style.top = yAxis[index];
    }, 300)
  }.bind(this);

  this.stop = function() {
    this.flyState = false;
    clearInterval(flyRet);
  }.bind(this);;
}

//行星模块
function planetModule() {
  //这里绑定按钮事件和 Mediator 命令
  var shipID = 0;

  //应用 Mediator 设计模式
  document.getElementById('buildButton').onclick = function() {
    shipID++;
    if (shipID > 3) {
      alert('建造飞船数已达上限');
      return;
    }

    //绑定事件传参数
    mediator.executeCommand({id: shipID, content: "build"});
    renderConsole("发送命令：架设飞船" + shipID + "号");
  }

  //事件代理绑定事件
  document.getElementById('ship-list').addEventListener("click", function(e) {
    if (e.target && e.target.nodeName == "INPUT") {
      var line = e.target.parentNode;
      var lineIndex = [].indexOf.call(line.parentNode.children, line);
      var col = e.target;
      var colIndex = [].indexOf.call(col.parentNode.children, col);

      switch (colIndex) {
        case 0:
        mediator.executeCommand({id: lineIndex + 1, content: "start"});
        renderConsole("发送命令：飞船" + (lineIndex + 1) + "号启动");
        break;
        case 1:
        mediator.executeCommand({id: lineIndex + 1, content: "stop"});
        renderConsole("发送命令：飞船" + (lineIndex + 1) + "号停止");
        break;
      }
    }
  })

  //计算飞船的坐标
  var caculateAxis = function() {
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
  }();
}

//控制终端显示
function renderConsole(content) {
  var newP = document.createElement('p');
  newP.className = 'command-log';
  newP.innerHTML = Date().substr(4, 21) + content;
  document.getElementById('console-board').appendChild(newP);
}

//中介者模式
var mediator = (function() {
  var shipQueue = [];
  return {
    executeCommand: function(command) {
      var excute = function() {
        if (command.content == "build") {
          var shipID = command.id;
          var newShip = new spaceshipModule(shipID - 1);
          shipQueue.push(newShip);
          var newDIV = document.createElement('div');
          newDIV.className = 'ship-pad';
          newDIV.innerHTML = "飞船" + shipID + "号 <input type='button' class='fly-button butt' value='飞行'><input type='button' class='stop-button butt' value='停止'>";
          document.getElementById('ship-list').appendChild(newDIV);
          return;
        }

        //模拟丢包，build 命令全部可以执行
        var randomNum = Math.floor(Math.random() * 91 + 9);
        if (randomNum < 30) {
          renderConsole("<font color='red'>发送命令丢包！！！</font>");
          return;
        }

        if (command.content == "start") {
          shipQueue[command.id - 1].fly();
          return;
        }

        if (command.content == "stop") {
          shipQueue[command.id - 1].stop();
        }
      }

      //模拟 1s 的传输延时
      setTimeout(excute ,1000);

    }
  }
})();


var planet = new planetModule();