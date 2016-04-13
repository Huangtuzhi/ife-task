window.onload = function() {
  function changeFold(Node) {
    var display = Node.getElementsByTagName('ul')[0].style.display;
    if (display == "none") {
      Node.getElementsByTagName('ul')[0].style.display = "";
    }
    else {
      Node.getElementsByTagName('ul')[0].style.display = "none";
    }
  }

  var wrapper = document.getElementById('wrapper');
  wrapper.onclick = function(e) {
    console.log(e.target);
    console.log(e.target.parentNode);
    if (e.target.tagName == "SPAN") {
      var checkedNodeParent = e.target.parentNode;
      changeFold(checkedNodeParent);
    }
  }

}