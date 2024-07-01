(function () {
    function $(selecter) {
        return document.querySelector(selecter);
    }
    function $$(selecter) {
        return document.querySelectorAll(selecter);
    }

    // 获取图片容器
    var imgBox = $('.imgBox');
    var curImgId; // 当前渲染的图片id
    // 获取用于切换图片的元素
    var changeImg = $('.changeImg');
    // 获取随机方块位置
    var squareBox = $('.imgGap');
    // 获取可拖动图片块
    var imgBlock = $('.imgBlock');
    // 获取滑块元素
    var slider = $('.slider');
    // 获取可拖动控件元素
    var sliderBtn = $('#btn');
    // 获取标题
    var title = $('.imgContainer h3');

    // 初始化
    function init() {
        renderBgImg();
        // 绑定切换图片事件
        changeImg.addEventListener('click', renderBgImg);
        sliderMove();
    }

    /**
     * 滑块拖动
     */
    function sliderMove() {
        // 鼠标按下
        sliderBtn.addEventListener('mousedown', function (e) {
            title.innerText = '拖动图片完成验证';
            imgBlock.style.opacity = 1;
            // 移出过渡效果
            imgBlock.style.transition = 'none .5s';
            sliderBtn.style.transition = 'none .5s';
            // 鼠标移动
            this.addEventListener('mousemove', move);
            // 鼠标抬起
            this.addEventListener('mouseup', up);
        });
        // 鼠标移出sliderBar
        slider.addEventListener('mouseleave', up);
    }

    /**
     * 鼠标按下事件
     */
    function move(e) {
        // 获取鼠标当前位置
        var x = e.clientX - slider.offsetLeft - sliderBtn.offsetWidth / 2;
        var max = imgBox.clientWidth - imgBlock.clientWidth;
        // 最小值
        if (x < 0) {
            x = 0;
        }
        // 最大值
        if (x > max) {
            x = max;
        }

        // 滑块移动
        sliderBtn.style.left = x + 'px';
        // 图片移动
        imgBlock.style.left = x + 'px';
    }

    /**
     * 鼠标抬起
     */
    function up(e) {
        // 获取鼠标当前位置
        var x = e.clientX - slider.offsetLeft - sliderBtn.offsetWidth / 2;
        // 计算白方块最大值
        var maxX = squareBox.offsetLeft;
        // 最大值为白方块位置
        if (x >= maxX - 3 && x <= maxX + 3) {
            x = maxX;
            title.innerText = '验证成功'
            title.style.color = 'red';
            // 滑块移动
            sliderBtn.style.left = x + 'px';
            // 图片移动
            imgBlock.style.left = x + 'px';
            // 隐藏图块
            imgBlock.style.opacity = 0;
            squareBox.style.opacity = 0;
            slider.removeEventListener('mouseleave', up);
        } else {
            title.innerText = '验证失败'
            // 添加过渡效果
            imgBlock.style.transition = 'all .5s';
            sliderBtn.style.transition = 'all .5s';
            // 滑块移动
            sliderBtn.style.left = 0 + 'px';
            // 图片移动
            imgBlock.style.left = 0 + 'px';
        }
        this.removeEventListener('mousemove', move);
        this.removeEventListener('mouseup', up);
    }

    /**
     * 渲染图片背景
     */
    function renderBgImg() {
        // 产生一个 1 - 5 的随机数
        var random = randomNumber(1, 5);
        if (random === curImgId) {
            renderBgImg();
            return;
        }
        // 设置容器的背景图片
        imgBox.style.backgroundImage = 'url(./img/t' + random + '.png)';
        // 设置可拖动图片块背景
        imgBlock.style.backgroundImage = 'url(./img/t' + random + '.png)';
        curImgId = random;
        // 调用生成一个随机位置方块的元素
        renderSquare();
    }

    /**
     * 生成一个随机位置方块的元素
     */
    function renderSquare() {
        // 计算最大位置长度
        var maxLeft = imgBox.clientWidth - squareBox.clientWidth;
        var maxTop = imgBox.clientHeight - squareBox.clientHeight;
        // 随机生成宽度的位置
        var left = randomNumber(0, maxLeft);
        var top = randomNumber(0, maxTop);
        // 设置方块的位置
        squareBox.style.left = left + 'px';
        squareBox.style.top = top + 'px';
        // 设置可拖动图片块位置
        imgBlock.style.top = top + 'px';
        imgBlock.style.left = 0 + 'px';
        sliderBtn.style.left = 0 + 'px';
        // 调整可拖拽图片块背景的位置
        imgBlock.style.backgroundPositionX = -left + 'px';
        imgBlock.style.backgroundPositionY = -top + 'px';
        // 文字复原
        title.innerText = '图片验证';
        title.style.color = 'black';
        squareBox.style.opacity = 1;
    }

    /**
     * 创建随机数
     * @param {*} min 最小值
     * @param {*} max 最大值
     */
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    init();

})()