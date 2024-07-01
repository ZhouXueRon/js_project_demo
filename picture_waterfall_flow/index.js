(function () {
    var imgWidth = 220; // 每张图片的宽度
    var divContainer = document.querySelector('.container');

    // 程序主函数
    function main() {
        // 1. 加入图片元素进行初始化操作
        createImgs();
    }

    // 计算图片列数
    function cal() {
        var containerWidth = divContainer.clientWidth;
        // 列数 = 容器宽度 / 图片宽度
        var columns = Math.floor(containerWidth / imgWidth);
        // 还需要计算间隙
        // 总间隙 = 容器宽度 - 列数 * 图片宽度
        var spaceNumber = columns + 1; // 间隙的数量
        var leftSpace = containerWidth - columns * imgWidth;
        var space = leftSpace / spaceNumber; // 每个间隙的空间
        return {
            space: space,
            columns: columns
        }
    }

    // 获取数组中的最小值的索引
    function getMinIndex(arr) {
        var minIndex = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < arr[minIndex]) {
                minIndex = i;
            }
        }
        return minIndex;
    }

    // 获取数组中的最大值的索引
    function getMaxIndex(arr) {
        var maxIndex = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > arr[maxIndex]) {
                maxIndex = i;
            }
        }
        return maxIndex;
    }


    // 设置每张图片的位置
    function setPositions() {
        // 在设置每张图片位置之前，要先知道几列
        // 通过该方法获取列数和间隙
        var info = cal();

        // 接下来创建数组，保存每一列的高度
        var arr = new Array(info.columns);
        arr.fill(0); // 填充数组

        for (var i = 0; i < divContainer.children.length; i++) {
            // 获取当前图片
            var img = divContainer.children[i];
            // 获取数组中的最小值
            var minIndex = getMinIndex(arr);
            img.style.top = arr[minIndex] + 'px';
            // 设置图片数组的新高度
            arr[minIndex] += img.height + info.space;
            // 设置图片的 left 值
            var left = (minIndex + 1) * info.space + imgWidth * minIndex;
            img.style.left = left + 'px';
        }

        // 图片为绝对定位，脱离了文档流，无法撑开盒子需要手动设置
        var max = arr[getMaxIndex(arr)];
        container.style.height = max + 'px';
    }

    // 创建图片，并且对图片的位置进行归为
    function createImgs() {
        for (var i = 0; i <= 40; i++) {
            var src = './img/' + i + '.jpg'; // 生成图片路径
            var img = document.createElement('img'); // 创建 img 元素
            img.src = src; // 设置 img 元素的 src 属性
            img.style.width = imgWidth; // 设置图片的宽度
            divContainer.appendChild(img); // 将图片添加到容器中

            // 接下来，我们要做的工作，就是排列每一张图片
            // 当每张图片加载完毕后，都要进行重新排列
            img.addEventListener("load", setPositions);
        }
    }

    // 浏览器尺寸发生改变，重新排列图片
    var timer = null;
    window.addEventListener('resize', function () {
        if (timer) clearInterval(timer);
        timer = setTimeout(function () {
            setPositions();
        }, 300);
    });

    main();

})();