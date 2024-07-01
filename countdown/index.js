(function () {
    // 获取所有的 time itme 元素
    var timeList = document.querySelectorAll('.time-item');
    var startIndex = timeList.length - 1;

    // 初始化
    function init() {
        timeStart(timeList[startIndex], 1000);
        timeStart(timeList[startIndex - 1], 10 * 1000);
        timeStart(timeList[startIndex - 2], 60 * 1000);
        timeStart(timeList[startIndex - 3], 10 * 60 * 1000);
        timeStart(timeList[startIndex - 4], 60 * 60 * 1000);
        timeStart(timeList[startIndex - 5], 3 * 60 * 60 * 1000);
    }

    /**
     * 元素运动
     * @param {*} dom // 要运动的元素
     * @param {*} duration // 运动时间
     */
    function timeStart(dom, duration) {
        // 获取 ul 元素
        var ul = dom.querySelector('ul');
        // 获取ul下的所有子元素
        var lis = ul.children;
        // 每隔一段时间，将 ul 滚动到下一个位置
        setInterval(function () {
            ul.style.transition = 'all .5s linear';
            ul.style.top = '-120px'
        }, duration);

        // 监听 ul 动画结束
        ul.addEventListener('transitionend', function () {
            ul.style.transition = 'none .5s linear';
            ul.appendChild(lis[0]);
            ul.style.top = '0';
        });
    }

    init();
})();