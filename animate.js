function createAnimation(options) {
    var from = options.from;
    var to = options.to;
    var totalMS = options.totalMS || 1000;
    var duration = options.duration || 10; // 每多少时间变化一次
    var times = Math.floor(totalMS / duration); // 变化的次数
    var dis = (to - from) / times; // 每次变化的量
    var curTimes = 0; // 当前变化的次数
    var timerId = setInterval(function () {
        from += dis;
        curTimes++;
        if (curTimes >= times) {
            // 次数达到了
            from = to;
            curTimes = 0;
            clearInterval(timerId); // 不在变化
            options.onmove && options.onmove(from);
            options.onend && options.onend();
            return;
        }
        options.onmove && options.onmove(from);
    }, duration)
}