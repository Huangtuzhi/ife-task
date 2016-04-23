function Point(x, y)
{
    this.x = x;
    this.y = y;
    this.G = 0;
    this.H = 0;
    this.F = 0;
    this.parent = null;


    this.updateF = function() {
        this.F = this.G + this.H;
    };
}

var openList = [];
var closeList = [];

var pointA = new Point(4, 1);
var pointB = new Point(0, 0);

//计算从 a 到终点 B 的估算成本
function calculateH(a) {
    var len = 10 * (Math.abs(pointB.x - a.x) + Math.abs(pointB.y - a.y));
    return len;
}

//计算 a b 之间不走斜边的距离
function calculateAB(a, b) {
    var len = 10 * (Math.abs(a.x - b.x) + Math.abs(a.y - b.y));
    return len;
}

function isPointAccessable(a) {
    //移到 Box 外了
    if (a.x < 0 || a.x > 9 || a.y < 0 || a.y > 9)
        return false;
    //这个点有墙
    if (locateBox(a.x, a.y).style.backgroundColor == "grey")
        return false;
    return true;
}

function isPointInCloseList(a) {
    for (var i in closeList) {
        if (a.x == closeList[i].x && a.y == closeList[i].y) { 
            return true;     
        }
    }
    return false;
}

function isPointInOpenList(a) {
    for (var i in openList) {
        if (a.x == openList[i].x && a.y == openList[i].y) {
            return true;  
        }
    }
    return false;
}


//遍历 openList 找出 F 值最小的节点
function pickMinPointInOpenList() {
    if (openList.length == 0) 
        return null;

    var minPoint = openList[0];
    for (var i in openList) {
        if (openList[i].F < minPoint.F)
            minPoint = openList[i];
    }
    return minPoint;
}

//移除 openList 中某个指定元素
function removePointInOpenList(a) {
    for (var i in openList) {
        if (openList[i] == a)
            openList.splice(i, 1);
    }
}

//移除 和 a 点 F 值相同的点。这个函数也可以不加进去。
function removeSamePoint(a) {
    for (var i in openList) {
        if (openList[i].F == a.F) {
            openList.splice(i, 1);
        }
    }
}

function renderRoute(a) {
    locateBox(a.x, a.y).style.backgroundColor = "yellow";
}

//处理 a 点周围的元素
function processAroundPoints(a) {
    var leftup    = new Point(a.x - 1, a.y - 1);
    var up        = new Point(a.x, a.y -1);
    var rightup   = new Point(a.x + 1, a.y - 1);
    var left      = new Point(a.x - 1, a.y);
    var right     = new Point(a.x + 1, a.y);
    var leftdown  = new Point(a.x - 1, a.y + 1);
    var down      = new Point(a.x, a.y + 1);
    var rightdown = new Point(a.x + 1, a.y + 1);

    var aroundPoint = [leftup, up, rightup, left, right, leftdown, down, rightdown];
    for (i in aroundPoint) {
        if (isPointAccessable(aroundPoint[i]) && !isPointInCloseList(aroundPoint[i]))  {
            if (!isPointInOpenList(aroundPoint[i])) {
                //如果该点不在 openlist 中，则加入 openlist，并计算它的 F G H 值
                var len = Math.floor(Math.sqrt((aroundPoint[i].x - a.x) * (aroundPoint[i].x - a.x) + (aroundPoint[i].y - a.y) * (aroundPoint[i].y - a.y)) * 10);
                aroundPoint[i].G = len + a.G;
                aroundPoint[i].H = calculateH(aroundPoint[i]);
                aroundPoint[i].updateF();
                aroundPoint[i].parent = a;
                openList.push(aroundPoint[i]);
            }
            //应该是这里的计算过程有问题
            //如果该点在 openlist 中
            else {
                //如果经过 a 点到达周围点的距离比直接到要小
                if (a.G + calculateAB(a, aroundPoint[i]) < aroundPoint[i].G) {
                    aroundPoint[i].G = a.G + calculateAB(a, aroundPoint[i]);
                    aroundPoint[i].updateF();
                    aroundPoint[i].parent = a;
                }
            }
        }
    }

}

function findProcess(startPoint, endPoint) {
    openList.push(startPoint);
    var flag = 0;
    while (true) {
        var currrent = pickMinPointInOpenList();
        //处理周围的点
        processAroundPoints(currrent);

        //从 openList 移到 closeList
        removePointInOpenList(currrent);
        // removeSamePoint(currrent);
        closeList.push(currrent); 

        //如果终点加入到了 openList 中，则路径已找到
        if (currrent.H == 0 && flag) 
        {
            for (var i = currrent; i != null; i = i.parent) {
                renderRoute(i);
            }
            break;
        }

        //初始点的 H 值也为 0
        flag++;

        //未找到路径
        if (openList.length == 0) {
            alert("四环太堵，找不到路。")
            break;
        }
    }
}

//确定起点和终点
function getStartEndPoint() {
    $('#grid').onclick = function(e) {
        if (e.target && e.target.nodeName == "TD") {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (locateBox(i, j).style.backgroundColor == "red") {
                        locateBox(i, j).style.backgroundColor = "white";
                        locateBox(i, j).innerHTML = "";
                    }
                }
            }

            var pos = e.target;
            var x = parseInt([].indexOf.call(pos.parentNode.children, pos)) - 1;
            var y = parseInt([].indexOf.call(pos.parentNode.parentNode.children, pos.parentNode)) - 1;
            pointB.x = x;
            pointB.y = y;
            console.log(x);
            console.log(y);
            console.log(pos.parentNode);
            pos.style.backgroundColor = "red";
            pos.innerHTML = "终";
        }
    }

    $('#findButton').onclick = function(e) {
        //已经设定终点
        if (locateBox(pointB.x, pointB.y).innerHTML == "终") {
            findProcess(pointA, pointB);
        }
        else
            alert("请单击设定终点");
    }

    $('#execButton').onchange = function(e) {
        console.log("change");
    }
}

getStartEndPoint();