(function () {
    function $(selecter) {
        return document.querySelector(selecter);
    }

    function $$(selecter) {
        return document.querySelectorAll(selecter);
    }

    // 初始化
    var curIndex = 0; // 当前显示的是第几张图片
    var doms = {
        container: $('.carousel-container'),
        carouselList: $('.carousel-list'),
        indicator: $('.indicator'),
        arrowLeft: $('.arrow-left'),
        arrowRight: $('.arrow-right')
    }
    var containerWidth = doms.container.clientWidth; // 可见区容器的宽度
    var urls = [
        './img/Wallpaper1.jpg',
        './img/Wallpaper2.jpg',
        './img/Wallpaper3.jpg',
        './img/Wallpaper4.jpg',
        './img/Wallpaper5.jpg'
    ]; // 记录了要显示的所有图片轮播图路径

    function init() {
        function _createImg(url) {
            var img = document.createElement('img');
            img.src = url;
            img.className = 'carousel-item';
            doms.carouselList.appendChild(img);
        }
        for (var i = 0; i < urls.length; i++) {
            _createImg(urls[i]);
            // 创建指示器
            var div = document.createElement('div');
            div.className = 'indicator-item';
            // 指示器绑定点击事件
            (function (i) {
                div.addEventListener('click', function () {
                    moveTo(i);
                });
            })(i);
            doms.indicator.appendChild(div);
        }
        // 多加一张额外的图片
        _createImg([urls[0]]);
        // 设置容器宽度
        doms.carouselList.style.width = doms.carouselList.children.length + '00%';
        // 设置指示器激活状态
        setIndicatorStatus();
    }

    /**
     * 根据 curIndex 设置指示器的状态
     */
    function setIndicatorStatus() {
        // 获取当前激活的指示器取消激活
        var active = $('.indicator-item.active');
        if (active) {
            active.className = 'indicator-item';
        }
        // 激活当前的指示器
        var index = curIndex % urls.length;
        doms.indicator.children[index].className = 'indicator-item active';

    }

    init();

    // 交互
    var totalMS = 500;
    var isPlaying = false; // 是否有正在进行的动画
    /**
     * 将轮播图从当前位置，切换到 newIndex 的位置
     * @param {number} newIndex 新的位置的图片索引
     */
    function moveTo(newIndex, onend) {
        if (isPlaying || newIndex === curIndex) {
            return; // 有动画进行不做任何处理 或 切换目标与当前一致
        }
        var from = parseFloat(getComputedStyle(doms.carouselList).left) || 0;
        var to = -newIndex * containerWidth;
        createAnimation({
            from: from,
            to: to,
            totalMS: totalMS,
            onmove: function (n) {
                doms.carouselList.style.left = n + 'px';
            },
            onend: function () {
                // 动画结束
                isPlaying = false;
                onend && onend();
            }
        })
        curIndex = newIndex;
        setIndicatorStatus();
    }

    function next() {
        var newIndex = curIndex + 1;
        var onend;
        if (newIndex === urls.length) {
            // 目前在最后一张图片
            // 等动画完成后切换到第一张图片
            onend = function () {
                doms.carouselList.style.left = '0px';
                curIndex = 0;
            }
        }
        moveTo(newIndex, onend);
    }

    function prev() {
        var newIndex = curIndex - 1;
        if (newIndex < 0) {
            // 目前在第一张图片
            // 等动画完成后切换到最后一张图片
            doms.carouselList.style.left = -urls.length * containerWidth + 'px';
            newIndex = urls.length - 1;
        }
        moveTo(newIndex);
    }

    doms.arrowLeft.addEventListener('click', prev);
    doms.arrowRight.addEventListener('click', next);

    // 自动开始轮播
    var timer;
    var duration = 3000; // 自动切换的间隔
    function autoStart() {
        if (timer) return;
        timer = setInterval(next, duration);
    }

    // 停止轮播
    function stop() {
        clearInterval(timer);
        timer = null;
    }
    autoStart();
    // 鼠标移入停止轮播
    doms.container.addEventListener('mouseenter', stop);
    doms.container.addEventListener('mouseleave', autoStart);

})();