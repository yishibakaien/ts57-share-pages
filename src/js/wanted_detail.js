'use strict';
import '../stylus/common/common';
import '../font/iconfont.styl';
import '../stylus/static/reset/reset';
import '../stylus/static/plugin/swiper-3.4.2.min.css';
import '../stylus/wanted_detail';

import Swiper from 'swiper';
import {
    getQueryString,
    c,
    formateSupplyType,
    formatDate,
    formateUnit,
    makeConfirm
} from './utils/utils';

import {
    // 获取求购详情
    getProductBuy

} from './api/api';

// id 可以有 973 974 975
(function() {
    /* eslint-disable no-new */
    new Swiper('.swiper-container');
    // 求购详情的id
    var id = getQueryString('dataId');

    // 获取页面元素
    // 求购图片
    var buyPic = c('#buyPic');
    // 求购描述
    var buyDesc = c('#buyDesc');
    // 求购类型
    var buyType = c('#buyType');
    // 是否接受开机
    var isStartUp = c('#isStartUp');
    // 求购数量
    var buyNum = c('#buyNum');
    // 发布时间
    var createDate = c('#createDate');
    // 浏览次数
    var viewCount = c('#viewCount');

    // 用户信息
    
    // 用户信息盒子
    var user = c('#user');
    // 用户头像
    var avatarPic = c('#avatarPic');
    // 求购人
    var userName = c('#userName');

    // 我要接单按钮
    var wantedBtn = c('#wantedBtn');

    function formateStartUp(num) {
        if (num === 1) {
            return '接受开机';
        } else if (num === 0) {
            return '不接受开机';
        }
    }

    wantedBtn.onclick = function() {
        makeConfirm([wantedBtn, ]);
    };

    getProductBuy({id}, function(res) {
        console.log('求购详情', res);
        var data = res.data;
        buyPic.style.backgroundImage = 'url(' + data.buyPicUrl + ')';
        buyDesc.innerHTML = data.buyDesc;
        buyType.innerHTML = formateSupplyType(data.buyType);
        isStartUp.innerHTML = formateStartUp(data.isStartUp);
        buyNum.innerHTML = data.buyNum + ' ' + formateUnit(data.buyUnit);
        createDate.innerHTML = formatDate(data.createDate, 'yyyy-MM-dd');
        viewCount.innerHTML = data.viewCount + ' 次浏览';
        user.setAttribute('company-id', data.userId);
        avatarPic.src = data.userHeadIcon;
        userName.innerHTML = '求购人: ' + data.userName;
        user.onclick = function() {
            var companyId = this.getAttribute('company-id');
            location.href = './index.html?companyId=' + companyId;
        };
    });
})();
