(function () {
    // 选取省会元素
    var provinceDom = document.querySelector('#province');
    // 构建省会选项
    createOptions(provinceDom, province);
    // 选取城市元素
    var cityDom = document.querySelector('#city');
    // 选取学校元素
    var schoolDom = document.querySelector('#school');

    // 省会绑定 change 方法
    provinceDom.addEventListener('change', function (e) {
        // 构建城市选项
        cityDom.innerHTML = '';
        schoolDom.innerHTML = '';
        createOptions(cityDom, city[e.target.value]);
        createOptions(schoolDom, allschool[cityDom.value]);
    });

    // 城市绑定 change 方法
    cityDom.addEventListener('change', function (e) {
        // 构建学校选项
        schoolDom.innerHTML = '';
        createOptions(schoolDom, allschool[e.target.value]);
    });

    /**
     * 创建选项信息
     * @param {*} dom 
     * @param {*} data 
     */
    function createOptions(dom, data) {
        var htmlStr = '';
        if (dom.name === 'province') {
            htmlStr = '<option value="0000">请选择</option>';
        }
        for (var key in data) {
            htmlStr += '<option value="' + key + '">' + data[key] + '</option>';
        }
        dom.innerHTML = htmlStr;
    }
})();