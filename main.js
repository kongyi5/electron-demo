var yyy = document.getElementById("xxx");
var ctx = yyy.getContext("2d");
var lineWidth = 3;

autoSetCanvasSize(yyy);
listenToUser(yyy);

var eraserEnabled = false;
pen.onclick = () => {
  eraserEnabled = false;
  pen.classList.add("active");
  eraser.classList.remove("active");
  clear.classList.remove("active");
};
eraser.onclick = () => {
  eraserEnabled = true;
  eraser.classList.add("active");
  pen.classList.remove("active");
  clear.classList.remove("active");
};
clear.onclick = () => {
  clear.classList.add("active");
  eraser.classList.remove("active");
  pen.classList.remove("active");
  ctx.clearRect(0, 0, yyy.width, yyy.height);
};
download.onclick = () => {
  var url = yyy.toDataURL("image/png");
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.href = url;
  a.download = "我的画";
  a.target = "_blank";
  a.click();
};

black.onclick = () => {
  ctx.strokeStyle = "black";
  black.classList.add("active");
  red.classList.remove("active");
  green.classList.remove("active");
  blue.classList.remove("active");
};
red.onclick = () => {
  ctx.strokeStyle = "red";
  red.classList.add("active");
  black.classList.remove("active");
  green.classList.remove("active");
  blue.classList.remove("active");
};
yellow.onclick = () => {
  ctx.strokeStyle = "yellow";
  yellow.classList.add("active");
  red.classList.remove("active");
  black.classList.remove("active");
  green.classList.remove("active");
  blue.classList.remove("active");
};
green.onclick = () => {
  ctx.strokeStyle = "green";
  green.classList.add("active");
  black.classList.remove("active");
  red.classList.remove("active");
  blue.classList.remove("active");
};
blue.onclick = () => {
  ctx.strokeStyle = "blue";
  blue.classList.add("active");
  black.classList.remove("active");
  red.classList.remove("active");
  green.classList.remove("active");
};

thin.onclick = () => {
  lineWidth = 3;
};
thick.onclick = () => {
  lineWidth = 6;
};

/** 函数库 **/
function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x1, y1); // 起点
  ctx.lineTo(x2, y2); // 终点
  ctx.stroke();
  ctx.closePath();
}

function autoSetCanvasSize(canvas) {
  setCanvasSize();
  window.onresize = () => {
    setCanvasSize();
  };
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

function listenToUser(canvas) {
  var using = false;
  var lastPoint = {
    x: undefined,
    y: undefined,
  };
  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = (a) => {
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;
      // 相对于视口的位置
      using = true;
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y,
        };
      }
    };
    canvas.ontouchmove = (a) => {
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;
      // 相对于视口的位置
      if (!using) {
        return;
      }
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = {
          x: x,
          y: y,
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.ontouchend = () => {
      using = false;
    };
  } else {
    // 非触屏设备
    canvas.onmousedown = (a) => {
      var x = a.clientX;
      var y = a.clientY;
      // 相对于视口的位置
      using = true;
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y,
        };
      }
    };
    canvas.onmousemove = (a) => {
      var x = a.clientX;
      var y = a.clientY;
      // 相对于视口的位置
      if (!using) {
        return;
      }
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = {
          x: x,
          y: y,
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.onmouseup = (a) => {
      using = false;
    };
  }
}
