(function () {
    // 获取缩略图元素
    var imgList = document.querySelector('.img-list');
    // 获取左侧原图元素
    var leftImg = document.querySelector('.left-img');
    // 获取遮罩层
    var mask = document.querySelector('.mask');
    // 获取右侧放大元素
    var rightImg = document.querySelector('.right-img');

    // 往缩略图中插入三张图片
    var imgSrc = ['A', 'B', 'C'];
    for (var i = 0; i < imgSrc.length; i++) {
        var li = document.createElement('li');
        li.style.backgroundImage = 'url(./images/img' + imgSrc[i] + '_1.jpg)';
        // li 绑定点击事件，点击后将图放到左侧容器中
        (function (i) {
            li.addEventListener('click', function (e) {
                leftImg.style.backgroundImage = 'url(./images/img' + imgSrc[i] + '_2.jpg)';
                rightImg.style.backgroundImage = 'url(./images/img' + imgSrc[i] + '_3.jpg)';
            });
        })(i);
        imgList.appendChild(li);
    };

    // 鼠标移入左侧原图，显示遮罩层，右侧放大的图。并进行拖动
    leftImg.addEventListener('mousemove', function (event) {
        mask.style.opacity = 1;
        rightImg.style.opacity = 1;
        // 根据鼠标位置，计算遮罩层的位置
        var left = event.clientX - leftImg.offsetLeft - mask.offsetWidth / 2;
        var top = event.clientY - leftImg.offsetTop - mask.offsetHeight / 2;
        // 边界条件
        if (left <= 0) left = 0;
        if (left >= leftImg.offsetWidth - mask.offsetWidth) {
            left = leftImg.offsetWidth - mask.offsetWidth;
        }
        if (top <= 0) top = 0;
        if (top >= leftImg.offsetHeight - mask.offsetHeight) {
            top = leftImg.offsetHeight - mask.offsetHeight;
        }
        mask.style.left = left + "px";
        mask.style.top = top + "px";
        rightImg.style.backgroundPositionX = -left + "px";
        rightImg.style.backgroundPositionY = -top + "px";
    });
    // 鼠标移出左侧原图，隐藏遮罩层
    leftImg.addEventListener('mouseleave', function () {
        mask.style.opacity = 0;
        rightImg.style.opacity = 0;
    });
})();