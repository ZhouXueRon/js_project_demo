(function () {
    // 初始化抽奖次数
    var numberTimes = 5;
    // 选取抽奖次数元素
    var prizeNumber = $('.prize-number');
    // 获取所有的抽奖项元素
    var prizeList = $$('.prize-list');
    // 获取开始抽奖元素
    var startBtn = $('.handler-container-btn');
    // 获取抽奖结果页面
    var dialog = $('.dialog-container');
    // 获取结果页面内容元素
    var dialogContent = $('.dialog-container .content');
    // 获取抽奖结果页面关闭按钮
    var dialogCloseBtn = $('.dialog-container .close');
    dialogCloseBtn.addEventListener('click', closeDialog);
    // 获取再来一次按钮
    var againBtn = $('.dialog-main-footer .button');
    // 产生一个 0 - 抽奖数量的随机整数
    var initIndex = getRandom(0, prizeList.length);

    /**
     * 初始化要做的事
     */
    function init() {
        // 渲染抽奖次数
        prizeNumber.innerHTML = numberTimes;
        // 绑定开始抽奖
        startBtn.addEventListener('click', function () {
            if (numberTimes > 0) {
                startPrize();
            }
        });
        // 绑定再来一次
        againBtn.addEventListener('click', function () {
            closeDialog();
            startPrize();
        });
    }

    /**
     * 开始抽奖
     */
    var timer = null;
    var duration = 300; // 多久转完一圈
    function startPrize() {
        if (timer) return;
        var totalTM = getRandom(2000, 5000);
        numberTimes--;
        // 渲染抽奖次数
        prizeNumber.innerHTML = numberTimes;
        timer = setInterval(() => {
            initIndex = (initIndex + 1) % prizeList.length;
            // 清楚前面选中的 active 样式
            for (var i = 0; i < prizeList.length; i++) {
                prizeList[i].className = 'prize-list';
            }
            prizeList[initIndex].className = 'prize-list active';
        }, duration / prizeList.length);
        stopPrize(totalTM);
    }

    /**
     * 停止抽奖
     */
    function stopPrize(totalTM) {
        var stopTimer = setTimeout(function () {
            clearInterval(timer);
            clearTimeout(stopTimer);
            if (numberTimes <= 0) {
                againBtn.style.display = 'none';
            }
            // 打开抽奖结果页面
            dialog.style.display = 'block';
            // 渲染抽奖结果
            dialogContent.innerText = prizeList[initIndex].querySelector('span').innerText;
            timer = null;
        }, totalTM);
    }

    /**
     * 关闭抽奖结果
     */
    function closeDialog() {
        dialog.style.display = 'none';
    }


    /**
     * 产生一个随机数
     * @param {*} max 
     * @param {*} min 
     */
    function getRandom(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    }



    // 选取单个元素
    function $(seleter) {
        return document.querySelector(seleter);
    }

    // 选取多个元素
    function $$(seleter) {
        return document.querySelectorAll(seleter);
    }

    init();

})();