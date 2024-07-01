(function () {
    var datas = [
        './img/Wallpaper1.jpg',
        './img/Wallpaper2.jpg',
        './img/Wallpaper3.jpg',
        './img/Wallpaper4.jpg',
        './img/Wallpaper5.jpg',
    ]; // 图片数组
    // 获取外部容器
    var container = document.querySelector('.carousel-container');
    var moveDis = container.offsetWidth; // 每次移动的距离
    // 获取图片容器
    var carouselList = document.querySelector('.carousel-list');
    // 获取指示器容器
    var indicator = document.querySelector('.indicator');
    // 获取左箭头
    var arrowLeft = document.querySelector('.arrow-left');
    // 绑定点击事件
    arrowLeft.addEventListener('click', prev);
    // 获取右箭头
    var arrowRight = document.querySelector('.arrow-right');
    // 绑定点击事件
    arrowRight.addEventListener('click', next);
    var curIndex = 0; // 当前展示图片索引
    // 初始化
    function init() {
        for (var i = 0; i < datas.length; i++) {
            // 创建图片和指示器添加到容器中
            var img = document.createElement('img');
            img.src = datas[i];
            img.className = 'carousel-item';
            var indicatorDiv = document.createElement('div');
            if (i === 0) {

            }
            indicatorDiv.className = (i === curIndex) ? 'indicator-item active' : 'indicator-item';
            // 为指示器绑定点击事件
            (function (i) {
                indicatorDiv.addEventListener('click', function () {
                    moveTo(i);
                });
            })(i);
            carouselList.appendChild(img);
            indicator.appendChild(indicatorDiv);
        }
        // 克隆一张图片添加到末尾
        var cloneNode = carouselList.childNodes[0].cloneNode();
        carouselList.appendChild(cloneNode);
        carouselList.style.width = carouselList.childNodes.length * 100 + '%';
    }

    /**
     * 移动图片
     * @param {number} newIndex 要移动到图片的索引
     */
    function moveTo(newIndex) {
        // 开始滚动动画
        createAnimation({
            from: parseInt(getComputedStyle(carouselList).left),
            to: -newIndex * moveDis,
            totalMS: 500,
            onmove: function (n) {
                carouselList.style.left = n + 'px';
            },
            onend: function () {
                console.log(newIndex, datas.length)
                // 移动到最后一张时，将图片移动到第一张
                if (newIndex === datas.length) {
                    carouselList.style.left = '0px';
                    curIndex = 0;
                }
                if (newIndex === -1) {
                    carouselList.style.left = -datas.length * moveDis;
                    curIndex = 5;
                }
            }
        })
        // 更改指示器状态
        indicator.childNodes[curIndex].className = 'indicator-item';
        indicator.childNodes[newIndex > 4 ? 0 : newIndex].className = 'indicator-item active';
        curIndex = newIndex;
    }

    /**
     * 切换至下一张
     */
    function next() {
        var index = curIndex + 1;
        if (index > datas.length) {
            index = 0;
        }
        moveTo(index);
    }

    /**
     * 切换至上一张
     */
    function prev() {
        var index = curIndex - 1;
        if (index < 0) {
            index = datas.length;
        }
        moveTo(index);
    }

    init();

})();