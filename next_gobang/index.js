(function () {
    /** 获取单个元素 */
    function $(selecter) {
        return document.querySelector(selecter);
    }
    /** 获取一组元素 */
    function $$(selecter) {
        return document.querySelectorAll(selecter);
    }

    var chessboard = $('.chessboard'); // 获取棋盘的 table
    var chessLength = 14;
    var isGameOver = false; // 游戏是否结束
    var whichOne = 'white'; // 开始落子为白色
    var chessArr = []; // 存储所有的棋子信息

    // 初始化游戏棋盘
    function initChessBoard() {
        // 绘制一个 chessLength * chessLength 的棋盘格子，并且把下标放入到每一个格子
        var tableContatent = '';
        for (var i = 0; i < chessLength; i++) {
            // 生产行
            var row = '<tr>';
            // 循环生产列
            for (var j = 0; j < chessLength; j++) {
                row += `<td data-row='${i}' data-line='${j}'></td>`
            }
            row += '</tr>';
            tableContatent += row;
        }
        chessboard.innerHTML = tableContatent;
    }

    // 绑定点击事件
    function bindEvent() {
        chessboard.addEventListener('click', function (e) {
            if (!isGameOver) {
                // 游戏没有结束，落子
                if (e.target.nodeName === 'TD') {
                    var temp = Object.assign({}, e.target.dataset);
                    // 计算格子的边长
                    var tdW = chessboard.clientWidth * 0.92 / chessLength;
                    // 确定落子的坐标
                    var positionX = e.offsetX > tdW / 2;
                    var positionY = e.offsetY > tdW / 2;
                    // 构建棋子信息
                    var chessPoint = {
                        x: positionX ? parseInt(temp.line) + 1 : parseInt(temp.line),
                        y: positionY ? parseInt(temp.row) + 1 : parseInt(temp.row),
                        c: whichOne
                    }

                    // 绘制棋子
                    chessMove(chessPoint)
                }
            } else {
                // 游戏已经结束，询问是否重新来一局
                if (window.confirm("是否重新开始一局")) {
                    // 重新开始游戏
                    initChessBoard();
                    chessArr = [];
                    isGameOver = false;
                    whichOne = 'white';
                }
            }
        })
    }

    // 绘制棋子
    function chessMove(chessPoint) {
        // 绘制之前判断该位置有没有棋子，如果有不做任何处理
        if (exist(chessPoint) && !isGameOver) {
            // 能够绘制将棋子信息推入数组
            chessArr.push(chessPoint);
            // 生成一个棋子（一个 div），推入 table 的 td 中
            var newChess = `<div class="chess ${chessPoint.c}" data-row="${chessPoint.y}" data-line="${chessPoint.x}"></div>`
            if (chessPoint.x < chessLength && chessPoint.y < chessLength) {
                var tdPos = $(`td[data-row="${chessPoint.y}"][data-line="${chessPoint.x}"]`);
                tdPos.innerHTML += newChess;
            }
            if (chessPoint.x === chessLength && chessPoint.y < chessLength) {
                var tdPos = $(`td[data-row="${chessPoint.y}"][data-line="${chessLength - 1}"]`);
                tdPos.innerHTML += newChess;
                tdPos.lastChild.style.left = '50%';
            }
            if (chessPoint.x === chessLength && chessPoint.y === chessLength) {
                var tdPos = $(`td[data-row="${chessLength - 1}"][data-line="${chessLength - 1}"]`);
                tdPos.innerHTML += newChess;
                tdPos.lastChild.style.left = '50%';
                tdPos.lastChild.style.top = '50%';
            }
            if (chessPoint.x < chessLength && chessPoint.y === chessLength) {
                var tdPos = $(`td[data-row="${chessLength - 1}"][data-line="${chessPoint.x}"]`);
                tdPos.innerHTML += newChess;
                tdPos.lastChild.style.top = '50%';
            }
            // 切换棋子颜色
            whichOne = whichOne === 'white' ? 'black' : 'white';
        }

        // 核对游戏是否结束
        check();
    }

    // 检查游戏是否结束
    function check() {
        // 遍历棋子数组
        // 4 种情况：横着、竖着、斜着（2种）
        for (var i = 0; i < chessArr.length; i++) {
            var curChess = chessArr[i];
            var chess2, chess3, chess4, chess5;

            // 检查有没有横向5个连着的棋子
            chess2 = chessArr.find(item => {
                return curChess.x === item.x + 1 && curChess.y === item.y && curChess.c === item.c;
            });
            chess3 = chessArr.find(item => {
                return curChess.x === item.x + 2 && curChess.y === item.y && curChess.c === item.c;
            });
            chess4 = chessArr.find(item => {
                return curChess.x === item.x + 3 && curChess.y === item.y && curChess.c === item.c;
            });
            chess5 = chessArr.find(item => {
                return curChess.x === item.x + 4 && curChess.y === item.y && curChess.c === item.c;
            });
            if (chess2 && chess3 && chess4 && chess5) {
                // 横向五连 游戏结束
                end(curChess, chess2, chess3, chess4, chess5);
            }

            // 检查有没有纵向5个连着的棋子
            chess2 = chessArr.find(item => {
                return curChess.x === item.x && curChess.y === item.y + 1 && curChess.c === item.c;
            });
            chess3 = chessArr.find(item => {
                return curChess.x === item.x && curChess.y === item.y + 2 && curChess.c === item.c;
            });
            chess4 = chessArr.find(item => {
                return curChess.x === item.x && curChess.y === item.y + 3 && curChess.c === item.c;
            });
            chess5 = chessArr.find(item => {
                return curChess.x === item.x && curChess.y === item.y + 4 && curChess.c === item.c;
            });
            if (chess2 && chess3 && chess4 && chess5) {
                // 横向五连 游戏结束
                end(curChess, chess2, chess3, chess4, chess5);
            }

            // 检查有没有从左上到右下斜着5个连着的棋子
            chess2 = chessArr.find(item => {
                return curChess.x === item.x + 1 && curChess.y === item.y + 1 && curChess.c === item.c;
            });
            chess3 = chessArr.find(item => {
                return curChess.x === item.x + 2 && curChess.y === item.y + 2 && curChess.c === item.c;
            });
            chess4 = chessArr.find(item => {
                return curChess.x === item.x + 3 && curChess.y === item.y + 3 && curChess.c === item.c;
            });
            chess5 = chessArr.find(item => {
                return curChess.x === item.x + 4 && curChess.y === item.y + 4 && curChess.c === item.c;
            });
            if (chess2 && chess3 && chess4 && chess5) {
                // 纵向五连 游戏结束
                end(curChess, chess2, chess3, chess4, chess5);
            }

            // 检查有没有从左下到右上斜着5个连着的棋子
            chess2 = chessArr.find(item => {
                return curChess.x === item.x - 1 && curChess.y === item.y + 1 && curChess.c === item.c;
            });
            chess3 = chessArr.find(item => {
                return curChess.x === item.x - 2 && curChess.y === item.y + 2 && curChess.c === item.c;
            });
            chess4 = chessArr.find(item => {
                return curChess.x === item.x - 3 && curChess.y === item.y + 3 && curChess.c === item.c;
            });
            chess5 = chessArr.find(item => {
                return curChess.x === item.x - 4 && curChess.y === item.y + 4 && curChess.c === item.c;
            });
            if (chess2 && chess3 && chess4 && chess5) {
                // 纵向五连 游戏结束
                end(curChess, chess2, chess3, chess4, chess5);
            }
        }
    }

    // 游戏结束
    function end() {
        if (!isGameOver) {
            isGameOver = true;
            // 标记所有的棋子
            for (var i = 0; i < chessArr.length; i++) {
                $(`div[data-row='${chessArr[i].y}'][data-line='${chessArr[i].x}']`).innerHTML = i + 1;
            }
            // 获胜棋子添加红色阴影
            for (var i = 0; i < arguments.length; i++) {
                $(`div[data-row='${arguments[i].y}'][data-line='${arguments[i].x}']`).classList.add('win');
            }
        }
    }

    // 判断该位置有没有棋子
    function exist(chessPoint) {
        var result = chessArr.find(item => {
            return item.x === chessPoint.x && item.y === chessPoint.y;
        });
        return !result;
    }

    // 游戏的主方法，相当于程序的入口
    function main() {
        // 初始化棋盘
        initChessBoard();
        // 绑定事件
        bindEvent();
    }

    main();

})();