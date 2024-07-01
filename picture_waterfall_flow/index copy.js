(function () {
    // 获取容器
    var container = document.querySelector('.container');
    var imgWidth = 220; // 每张图片宽度为220px
    var heights = []; // 用于存储每列图片高度的数组
    var timer = null; // 记录创建的防抖计时器 id
    var imgCount = 30; // 渲染图片的数量

    // 初始化
    function init() {
        // 清空元素
        container.innerHTML = '';
        // 重置高度数组
        heights = [];
        // 获取容器内容宽度
        var cWidth = container.clientWidth;
        // 计算总共可以展示多少列图片
        var cols = Math.floor(cWidth / imgWidth);
        // 计算图片的左右间隙
        var gaps = (cWidth - cols * imgWidth) / cols;
        for (i = 0; i < cols; i++) {
            heights.push(0);
        }
        // 创建图片并渲染
        renderImg(heights, gaps / 2);
    }

    init();

    // 创建图片并渲染
    function renderImg(heights, gaps) {
        for (var i = 0; i < imgCount; i++) {
            // 获取当前最小项高度和索引
            var minIndex = getMinIndex(heights);
            var left = minIndex * (imgWidth + 2 * gaps);
            var top = heights[minIndex] + 10;
            // 创建图片元素
            var img = document.createElement('img');
            img.src = './img/' + i + '.jpg';
            img.style.width = imgWidth + 'px';
            img.style.marginLeft = gaps + 'px';
            img.style.marginRight = gaps + 'px';
            img.style.marginTop = '10px';
            img.style.position = 'absolute';
            img.style.left = left + 'px';
            img.style.top = top + 'px';
            container.appendChild(img);
            heights[minIndex] += img.clientHeight + 10;
            container.style.height = heights[minIndex] + 'px';
        }
    }

    function getMinIndex(arr) {
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            index = arr[index] > arr[i] ? i : index;
        }
        return index;
    }


    // 监听浏览器窗口尺寸改变
    window.addEventListener('resize', function () {
        if (timer) {
            clearTimeout(timer);
        };
        timer = setTimeout(function () {
            init();
        }, 300);
    });

})();