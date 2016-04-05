function TagBase(divContainer) {
  //构造函数，存放私有变量和方法
  this.queue = [];

  this.render = function() {
    var content = "";
    for (var i in this.queue) {
      content += "<button class='tag'>" + this.queue[i] + "</button>";
    }
    divContainer.getElementsByClassName('shower')[0].innerHTML = content;
  }

  this.del = function(index) {
    this.queue.splice(index, 1);
  }

  this.addTag = function(str) {
    trimStr = str.trim();
    for (var i in this.queue) {
      if (this.queue[i] == trimStr) return;
    }

    if (this.queue.length >= 10) {
      this.del(0);
    }
    this.queue.push(trimStr);
  }.bind(this)

  // this.test = function() {
  //   alert("from base");
  // }

  this.init = function() {
    divContainer.getElementsByTagName('textarea')[0].onchange = function() {
      var input = divContainer.getElementsByTagName('textarea')[0].value;
      this.addTag(input);
      this.render();
    }.bind(this)
  }
}

function TagChild(divContainer) {
  //TagChild 为 TagBase 的子类，这里调用 TagBase 的构造函数
  TagBase.call(this, divContainer);

  //这里是子类独有的方法
  //绑定 button 事件
  this.tagView = function() {
    var shower = divContainer.getElementsByClassName('shower')[0];

    shower.addEventListener("click", function(e) {
      if(e.target && e.target.nodeName == "BUTTON") {
        var node = e.target;
        var delIndex = [].indexOf.call(node.parentNode.children, node);
        this.del(delIndex);
        this.render();
      }
    }.bind(this))
  }
}

function HobbyChild(divContainer) {
  TagBase.call(this, divContainer);

  this.processInput = function() {
    var input = divContainer.getElementsByTagName('textarea')[0].value;
    var regexedInput = input.replace(/[,，、;；\s]/g, "|");
    var parts = regexedInput.split("|");
    return parts;
  }

  //重载 init 方法
  this.init = function() {
    document.getElementById('assure-button').onclick = function() {
      var input = this.processInput();
      for (var i in input) {
        this.addTag(input[i]);
      }
      this.render();
    }.bind(this);
  }
}


var tagInput = document.getElementById('first-box');
var firstBox = new TagChild(tagInput);
firstBox.init();
firstBox.tagView();

var hobbyInput = document.getElementById('second-box');
var secondBox = new HobbyChild(hobbyInput);
secondBox.init();