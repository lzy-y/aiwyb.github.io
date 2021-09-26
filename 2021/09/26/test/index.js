var html = document.querySelector('html')

// 获取map对象
var mapDiv = document.querySelector('.map')
    //获取得分
var scoreSpan = document.querySelector('.scoreNum')
    // var snake = [{1,1},{2,1},{3,1}]
var snakeList = []
var startBtn = document.querySelector('.startBtn')
var pauseBtn = document.querySelector('.pauseBtn')
var intervalGameId = 0
var direction = {
    x: -1,
    y: 0
}

//设置得分
var score = 0;


var mapSizeX = 30;;
var mapSizeY = 30

function renderMap(x, y) {
    mapSizeX = x;
    mapSizeY = y;
    var size = 900 / x;
    for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++) {
            var newDiv = document.createElement('div')
            newDiv.className = 'mapItem'
            newDiv.id = 'x' + j + 'y' + i;
            newDiv.style.width = size + 'px'
            newDiv.style.height = size + 'px'
            mapDiv.appendChild(newDiv)
        }
    }
}

function randomSnake(start, end) {
    //随机出蛇头的位置
    x = parseInt(Math.random() * (end - start)) + start;
    y = parseInt(Math.random() * (end - start)) + start;
    snakeList.push({ x: x, y: y })
    snakeList.push({ x: (x + 1), y: y })
    snakeList.push({ x: (x + 2), y: y })
}

//根据蛇的数组，渲染到map对象上
function renderSnake() {
    snakeList.forEach(function(item, index) {
        //通过坐标拼凑出id选择器
        try {
            var selector = '#x' + item.x + 'y' + item.y;
            var snakeDiv = document.querySelector(selector)
            snakeDiv.className = "mapItem snake"
        } catch (e) {
            console.log(e);
        }

    })
}

function renderFood() {
    do {
        x = parseInt(Math.random() * mapSizeX)
        y = parseInt(Math.random() * mapSizeY)
        var selector = '#x' + x + 'y' + y;
        var foodDiv = document.querySelector(selector);
    } while (foodDiv.className != 'mapItem')
    //随机出食物的坐标
    foodDiv.className = 'mapItem food'


}

function isFood(x, y) {
    // x = parseInt(Math.random() * mapSizeX)
    // y = parseInt(Math.random() * mapSizeY)
    var selector = '#x' + x + 'y' + y;
    var foodDiv = document.querySelector(selector);
    if (foodDiv.className == 'mapItem food') {
        return true;
    } else {
        return false;
    }
}


function isSnakeBody(x, y) {
    var selector = '#x' + x + 'y' + y;
    var foodDiv = document.querySelector(selector);
    if (foodDiv.className == 'mapItem snake') {
        return true;
    } else {
        return false;
    }
}






renderMap(30, 20)

randomSnake(10, 20)
renderSnake()

startBtn.onclick = function() {
        renderFood();
        intervalGameId = setInterval(function() {

            var x = snakeList[0].x + direction.x
            if (x > mapSizeX - 1) {
                x = 0;
            }
            if (x < 0) {
                x = mapSizeX - 1
            }
            var y = snakeList[0].y + direction.y
            if (y > mapSizeY - 1) {
                y = 0;
            }
            if (y < 0) {
                y = mapSizeY - 1
            }
            var snakeHeader = { x: x, y: y }

            if (isFood(snakeHeader.x, snakeHeader.y)) {
                var selector = '#x' + snakeHeader.x + 'y' + snakeHeader.y;
                var newDiv = document.querySelector(selector);
                newDiv.className = 'mapItem'
                snakeList.unshift(snakeHeader)
                score++;
                scoreSpan.innerHTML = score
                renderFood()
            } else if (isSnakeBody(snakeHeader.x, snakeHeader.y)) {
                alert("游戏结束")
                clearInterval(intervalGameId)
            } else {
                snakeList.unshift(snakeHeader)
                    //删除蛇尾
                var delsnakeFooter = snakeList.pop()
                    //将蛇尾恢复成正常样子
                var selector = '#x' + delsnakeFooter.x + 'y' + delsnakeFooter.y
                var delDiv = document.querySelector(selector)
                delDiv.className = 'mapItem'
            }



            renderSnake()
        }, 30)
    }
    // setInterval(() => {
    //     renderFood()
    // }, 5000);

html.onkeydown = function(e) {
    if (e.key == 'ArrowRight' && direction.x != -1) {
        direction = { x: 1, y: 0 }
    }
    if (e.key == 'ArrowLeft' && direction.x != 1) {
        direction = { x: -1, y: 0 }
    }
    if (e.key == 'ArrowDown' && direction.y != -1) {
        direction = { x: 0, y: 1 }
    }
    if (e.key == 'ArrowUp' && direction.y != 1) {
        direction = { x: 0, y: -1 }
    }
}

pauseBtn.onclick = function() {
    clearInterval(intervalGameId)
}