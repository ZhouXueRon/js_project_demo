(function () {
    // 获取 imgs 元素
    var imgs = document.querySelector('#imgs');
    // 获取导航区域
    var sideBar = document.querySelector('#side-bar');
    var timer = null;
    var curIndex = 0; // 记录当前展示图片的索引
    createElement();
    // 获取所有的 img a 元素
    var imgAList = imgs.querySelectorAll('a');
    // 获取所有的 nav a 元素
    var navAList = sideBar.querySelectorAll('a.nav');

    start();

    // 鼠标经过图片区域，停止切换图片
    imgs.addEventListener('mouseenter', stop);
    sideBar.addEventListener('mouseenter', stop);
    // 鼠标离开图片区域，继续切换图片
    imgs.addEventListener('mouseleave', start);
    sideBar.addEventListener('mouseleave', start);

    // 点击导航，切换图片
    for (var i = 0; i < navAList.length; i++) {
        (function (i) {
            navAList[i].addEventListener('click', function () {
                for (var j = 0; j < navAList.length; j++) {
                    imgAList[j].className = '';
                    navAList[j].className = 'nav';
                }
                imgAList[i].className = 'active';
                navAList[i].className = 'active nav';
                curIndex = i;
            });
        })(i);
    }

    // 切换图片
    /**
     * 创建元素信息
     */
    function createElement() {
        // 根据数据创建图片和导航展示元素
        for (var i = 0; i < data.length; i++) {
            // 创建 img a 元素
            var imgA = document.createElement('a');
            imgA.href = '#';
            imgA.style.backgroundImage = 'url(' + data[i].img + ')';
            imgA.style.backgroundColor = data[i].bg;
            // 创建 nav a 元素
            var navA = document.createElement('a');
            navA.href = '#';
            navA.innerHTML = '<span>' + data[i].title + '</span>  ' + data[i].desc;
            navA.title = data[i].title;
            navA.className = 'nav';
            // 为创建的 nav a 绑定鼠标移入事件
            (function (i) {
                navA.addEventListener('mouseenter', function () {
                    curIndex = i;
                    tagglers(i)
                });
            })(i);
            // 初始化图片展示状态
            if (i === 0) {
                imgA.className = 'active';
                navA.className = 'active nav';
            }
            imgs.appendChild(imgA);
            sideBar.appendChild(navA);
        }
    };

    /**
     * 开启一个计时器，让图片和文字变化
     */
    function start() {
        if (timer) return;
        timer = setInterval(function () {
            curIndex = (curIndex + 1) % data.length;
            tagglers(curIndex);
        }, 3000)
    }

    /**
     * 切换图片和文字
     * @param {Number} index 索引
     */
    function tagglers(index) {
        for (var i = 0; i < data.length; i++) {
            imgAList[i].className = '';
            navAList[i].className = 'nav';
        }
        imgAList[index].className = 'active';
        navAList[index].className = 'active nav';
    }

    /**
     * 停止运动
     */
    function stop() {
        clearInterval(timer);
        timer = null;
    }
})();