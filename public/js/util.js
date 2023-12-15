/**
 * 用原生 JS 封装一个 Toast 组件
 */
var Toast = {
    // 隐藏的 setTimeOut 引用
    hideTimeOut: null,
    /**
     * 初始化
     */
    init: function () {
        var domToastWaka = document.getElementById('toastWaka');
        if (!domToastWaka) {
            var toastNode = document.createElement('section');
            toastNode.innerHTML = '<i class="iconfont icon-success"></i><i class="iconfont icon-error"></i><span class="text">111</span>';
            toastNode.id = 'toastWaka'; // 设置id，一个页面有且仅有一个Toast
            toastNode.setAttribute('style', 'position:fixed;display:none;left:50%;top:50%;z-index:99999;margin:0 auto;-webkit-transform:translate(-50%);min-height:40px;min-width:200px;line-height:40px;border-radius:5px;text-align:center;color:#fff;background-color:rgba(000,000,000,.5)');   // 设置样式
            toastNode.setAttribute('class', 'toast');   // 设置类名
            toastNode.style.display = 'none';   // 设置隐藏
            document.body.appendChild(toastNode);
            domToastWaka = toastNode
        }
        return domToastWaka;
    },
    /**
     * 显示Toast
     * @param text 文本内容
     * @param options 其他参数 { duration, type } 
     * duration 持续时间(毫秒) 默认 2000
     * type 类型 success error (暂无)
     */
    show: function (text, options) {
        const { duration, type } = options ?? {};
        var that = this;
        // 确保上一次的 TimeOut 已被清空
        if (that.hideTimeOut) {
            clearTimeout(that.hideTimeOut);
            that.hideTimeOut = null;
            // console.error('上一次的 TimeOut 还未走完!');
            // return;
        }
        if (!text) {
            console.error('text 不能为空!');
            return;
        }
        var domToastWaka = document.getElementById('toastWaka');
        // console.log('domToastWaka', domToastWaka);
        if (!domToastWaka) {
            domToastWaka = that.init();
            // console.error('toastWaka DOM 不存在!');
            // return;
        }
        var domIconSuccess = domToastWaka.querySelector('.icon-success');   // 成功图标
        var domIconError = domToastWaka.querySelector('.icon-error');   // 错误图标
        var domToastText = domToastWaka.querySelector('.text');   // 文字
        domToastText.setAttribute('style', 'color:#fff;display:inline-block;font-size:14px;position:absolute;top:0;bottom:0;right:0;left:0');   // 设置文字样式
        domToastText.innerHTML = text || ' ';
        switch (type) {
            case 'success':
                domIconSuccess.style.display = 'inline-block';
                domIconError.style.display = 'none';
                break;
            case 'error':
                domIconSuccess.style.display = 'none';
                domIconError.style.display = 'inline-block';
                break;
            default:
                domIconSuccess.style.display = 'none';
                domIconError.style.display = 'none';
                break;
        }
        domToastWaka.style.display = 'block';
        // 不传的话默认2s
        that.hideTimeOut = setTimeout(function () {
            that.hide();    // 隐藏 Toast
        }, duration || 2000);
    },
    /**
     * 隐藏 Toast
     */
    hide: function () {
        var domToastWaka = document.getElementById('toastWaka');
        if (domToastWaka) {
            domToastWaka.style.display = 'none';
        }
        var that = this;
        // 如果 TimeOut 存在
        if (that.hideTimeOut) {
            // 清空 TimeOut 引用
            clearTimeout(that.hideTimeOut);
            that.hideTimeOut = null;
        }
    },
    /**
     * 删除 Toast
     */
    remove: function () {
        var domToastWaka = document.getElementById('toastWaka');
        if (domToastWaka) {
            document.body.removeChild(domToastWaka);
        }
    }
};

function showToast(text, ...args) {
    // Toast.init();
    const options = { duration: args[0], type: args[1] ?? '' };
    Toast.show(text, options);
}

const loading = (() => {
    let loadingEle = null
    return (status) => {
        if (!loadingEle) {
            const divEle = document.createElement('div')
            const styleEle = document.createElement('style')
            // 底部遮罩样式
            const loadignStyle = '.loading{position: fixed;z-index: 1000;left: 0;top:0;width: 100%;height: 100%;background-color: rgba(0,0,0, .6)}'
            // loading动画样式
            const loadignChildStyle = '.loading div{position: absolute;width: 30px;height: 30px;top: 50%;left: 50%;margin: -15px 0 0 -15px;border: 1px solid #fff;border-right: 1px solid transparent;border-radius: 50%;animation: loading 1s linear infinite;}'
            divEle.setAttribute('class', 'loading')
            divEle.innerHTML = '<div></div>';
            styleEle.innerHTML = `${loadignStyle} ${loadignChildStyle} @keyframes loading {to {transform: rotate(360deg)}}`
            document.querySelector('head').append(styleEle)
            document.querySelector('body').append(divEle)
            loadingEle = divEle
        } else {
            // 控制loading的显示与隐藏
            const dispalyStatus = status ? 'block' : 'none';
            loadingEle.setAttribute('style', `display:${dispalyStatus}`)
        }
    }
})()

const toast = (() => {
    let once = null
    let clearTime
    return (text, time) => {
        if (!time || time < 500) time = 2000
        const updata = () => {
            once.innerHTML = text || ''
            once.setAttribute('style', 'position: absolute;left: 50%;top:50%;z-index: 9000;max-width: 300px;padding: 5px 12px;-webkit-transform: translateX(-50%);-webkit-transform: translateY(-50%);text-align: center;border-radius: 4px;font-size: 14px;color: #fff;background-color: rgba(0,0,0,0.6);')
            clearTime = setTimeout(() => {
                once.setAttribute('style', 'display:none')
                clearTimeout(clearTime)
            }, time);
        }
        if (!once) {
            const bodyEle = document.querySelector('body')
            const div = document.createElement('div');
            bodyEle.appendChild(div)
            once = div
            updata()
        } else {
            updata()
        }
    }
})()