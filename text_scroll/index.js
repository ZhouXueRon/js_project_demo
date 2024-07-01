(function () {
    // 初始化：一开始要做什么？
    var list = document.querySelector('.list');
    // 1. 将列表中的第一个元素，克隆到列表的最后一个
    function cloneFirstItem() {
        var firstItem = list.children[0];
        var lastItem = firstItem.cloneNode(true);
        list.appendChild(lastItem);
    }
    cloneFirstItem();

    // 2. 滚动：每隔一段时间，将列表滚动到下一个位置
    var duration = 2000; // 滚动的间隔时间
    setInterval(moveNext, duration);
    var itemHeight = 30; // 每一项的高度
    var curIndex = 0;

    // 将列表滚动到下一个位置
    function moveNext() {
        var from = curIndex * itemHeight;
        curIndex++;
        var to = curIndex * itemHeight // 下一项的滚动高度
        // 让 list 的 scrollTop, 从 from 慢慢变为 to
        var totalDuration = 300; // 变化的总时间
        var duration = 10; // 变化的间隔时间
        var times = totalDuration / duration; // 变化的次数
        var dis = (to - from) / times; // 每次变化的量
        var timerId = setInterval(function () {
            from += dis;
            if (from >= to) {
                clearInterval(timerId);
                // 滚动完成后如果是最后一项
                if (curIndex === list.children.length - 1) {
                    curIndex = 0;
                }
            }
            list.scrollTop = from;
        }, 10);
    }
})();