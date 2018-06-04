function Point(x, y) {
    this.x = x;
    this.y = y;

    this.toContextCoord = function() {
        var pOut = new Point(0, 0);

        if (this.x < 0) {
            pOut.x = 350 - Math.abs(this.x);
        } else {
            pOut.x = 350 + this.x;
        }

        if (this.y < 0) {
            pOut.y = 350 + Math.abs(this.y);
        } else {
            pOut.y = 350 - this.y;
        }

        return pOut;
    };

    this.fromScreenCoord = function(x, y) {

        if (x > 350) {
            this.x = Math.abs(x - 350);
        } else {
            this.x = x - 350;
        }

        if (y > 350) {
            this.y = -(y - 350);
        } else {
            this.y = Math.abs(y - 350);
        }
    };

    this.lenght = function(p) {
        var xx = (p.x - this.x) * (p.x - this.x);
        var yy = (p.y - this.y) * (p.y - this.y);
        return Math.sqrt(xx + yy);
    };
}

var pointA = new Point(0, 0);
var pointB = new Point(100, 100);
var pointC = new Point(0, 0);
var alpha = new Point(1, 2);
var R = 20;
var currPoint;

function drawLine(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke(); // *22
    ctx.closePath();
}

function drawPoint(p) {
    ctx.fillRect(p.x, p.y, 4, 4);
}

function drawCircle(p, r){
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.stroke();
}

function drawGrid(xBorder, yBorder) {
    var oldColor = ctx.strokeStyle;
    var dx = 10;
    var dy = 10;
    ctx.strokeStyle = "#BDBDBD";
    for (var i = 0; i < xBorder; i += dx) {
        var a = { x: i, y: 0 };
        var b = { x: i, y: yBorder };
        drawLine(a, b);
    }
    for (var j = 0; j < yBorder; j += dy) {
        var a = { x: 0, y: j };
        var b = { x: yBorder, y: j };
        drawLine(a, b);
    }
    ctx.strokeStyle = "#FF0000";
    drawLine({ x: (xBorder / 2.0), y: 0 }, { x: (xBorder / 2.0), y: yBorder });
    drawLine({ x: 0, y: (yBorder / 2.0) }, { x: xBorder, y: (yBorder / 2.0) });
    ctx.strokeStyle = oldColor;
}

function mouseDownEvent(event) {
    var x = event.pageX - elemLeft - 3,
        y = event.pageY - elemTop - 3;

    var downPoint = new Point(0, 0);
    downPoint.fromScreenCoord(x, y);

    if (downPoint.lenght(pointA) < 7) {
        currPoint = pointA;
    } else if (downPoint.lenght(pointB) < 7) {
        currPoint = pointB;
    } else {
        currPoint = undefined;
    }
}

function mouseMoveEvent(event) {
    var x = event.pageX - elemLeft - 3,
        y = event.pageY - elemTop - 3;

    if (currPoint != undefined) {
        var point = new Point(0, 0);
        point.fromScreenCoord(x, y);
        currPoint.x = point.x;
        currPoint.y = point.y;
    }

    var xFieldA = document.getElementById("xFieldA");
    var yFieldA = document.getElementById("yFieldA");

    xFieldA.value = pointA.x;
    yFieldA.value = pointA.y;

    var xFieldB = document.getElementById("xFieldB");
    var yFieldB = document.getElementById("yFieldB");

    xFieldB.value = pointB.x;
    yFieldB.value = pointB.y;

    var R = document.getElementById("R");
    R.value = R;
}

function mouseUpEvent(event) {
    currPoint = undefined;
}

function render() {
    ctx.clearRect(0, 0, example.width, example.height);
    drawGrid(700, 700);
    drawLine(pointA.toContextCoord(), pointB.toContextCoord());
    drawPoint(pointA.toContextCoord());
    drawPoint(pointB.toContextCoord());
    drawPoint(pointA.toContextCoord());
    drawCircle(pointA.toContextCoord(), R)
}