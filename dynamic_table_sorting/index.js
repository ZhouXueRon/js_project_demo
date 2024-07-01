/**
 * 1. 复选框的关联操作
 *      1-1 全选按钮事件绑定
 *      1-2 获取它的选中状态
 *      1-3 将这个选中的状态复制给下面tbody里面复选框 checked = 全选状态
 *      1-4 处理 tbody 中的复选框
 *      1-5 通过事件委托的形式为每一个复选框进行事件绑定（有可能是未来元素）
 * 2. 表格排序的实现
 *      2-1 事件的绑定
 *      2-2 在事件绑定里面获取一个指定的index值
 */
(function () {
    var checkAll = document.querySelector('.checkAll');
    var tbody = document.querySelector('tbody');
    var checkOneList = document.querySelectorAll('tbody > tr > td > input');
    var ths = document.querySelectorAll('thead > tr > th');
    var rows = tbody.querySelectorAll('tr');

    // 程序入口定义
    function init() {
        initEvents();
    }

    // 绑定事件的函数，所有的事件函数都在这里面执行
    function initEvents() {
        checkAll.addEventListener('click', onCheckAllClick);
        tbody.addEventListener('click', onCheckOneListClick);
        for (var i = 0; i < ths.length; i++) {
            // 使用一个闭包的形式进行每一项的索引值的获取
            handleThsClick(ths[i], i);
        }
    };

    // 全选按钮事件绑定函数
    function onCheckAllClick() {
        var checkStatus = this.checked;
        for (var i = 0; i < checkOneList.length; i++) {
            checkOneList[i].checked = checkStatus;
        }
    }

    // 定义 tbody 里面复选框（单选）事件绑定函数
    function onCheckOneListClick(e) {
        // 事件目标获取，并准确的找到复选框进行事件的触发
        if (e.target.tagName !== 'INPUT') return;
        // 定义一个当前已经选中的复选框的数字
        var checkedCount = 0;
        for (var i = 0; i < checkOneList.length; i++) {
            if (checkOneList[i].checked) {
                checkedCount++;
            }
        }
        checkAll.checked = checkedCount === checkOneList.length;
    }

    // 定义 th 点击事件
    function handleThsClick(th, index) {
        if (index === 0) return;
        th.addEventListener('click', function () {
            var arr = Array.prototype.slice.call(rows);
            arr.sort(function (a, b) {
                var td = a.querySelectorAll('td')[index].innerText;
                var td2 = b.querySelectorAll('td')[index].innerText;
                if (index === 2 || index === 4) {
                    // 使用中文字符集的形式进行比较
                    return td.localeCompare(td2, 'zh'); // zh 代表中文
                } else {
                    return td - td2;
                }
            });
            for (var i = 0; i < arr.length; i++) {
                tbody.appendChild(arr[i]);
            }
        });
    }

    init();
})();