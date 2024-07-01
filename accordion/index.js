(function () {
    // 交互
    var titles = document.querySelectorAll('.menu h2'); // 获取所有的 h2
    var itemHeight = 30; // 每项的高度
    var totalMS = 300; // 播放动画的总时常

    for (var i = 0; i < titles.length; i++) {
        titles[i].addEventListener('click', function () {
            // 收起其他所以菜单，利用自定义属性 status opened
            var beforeOpened = document.querySelector('.submenu[status="opened"]');
            if (beforeOpened) {
                closeSubmenu(beforeOpened);
            }
            toggleSubmenu(this.nextElementSibling);
        })
    }

    // 打开子菜单
    function openSubmenu(subMenu) {
        // 子菜单的状态（关闭、打开、正在播放动画）
        // 通过自定义属性 status，判定它的状态
        // 将子菜单的高度从0变到子项*30
        var status = subMenu.getAttribute('status');
        if (status !== 'closed' && status) {
            return; // 不是关闭状态
        }
        subMenu.setAttribute('status', 'playing');
        createAnimation({
            from: 0,
            to: itemHeight * subMenu.children.length,
            totalMS: totalMS,
            onmove: function (n) {
                subMenu.style.height = n + 'px';
            },
            onend: function () {
                subMenu.setAttribute('status', 'opened');
            }
        })
    }

    // 关闭子菜单
    function closeSubmenu(subMenu) {
        var status = subMenu.getAttribute('status');
        if (status !== 'opened') {
            return; // 不是打开状态，啥也不干
        }
        subMenu.setAttribute('status', 'playing');
        createAnimation({
            from: itemHeight * subMenu.children.length,
            to: 0,
            totalMS: totalMS,
            onmove: function (n) {
                subMenu.style.height = n + 'px';
            },
            onend: function () {
                subMenu.setAttribute('status', 'closed');
            }
        })
    }

    // 切换子菜单
    function toggleSubmenu(subMenu) {
        var status = subMenu.getAttribute('status');
        if (status === 'playing') {
            return;
        }
        else if (status === 'opened') {
            closeSubmenu(subMenu);
        }
        else {
            openSubmenu(subMenu);
        }
    }
})();