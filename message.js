(function () {
    // 将message方法挂载到window上
    window.message = function (options) {
        // 处理options
        options = options || {}
        if (typeof options === "string") {
            // 传message直接赋值
            options = {
                message: options
            }
        }

        // 默认状态
        var type = options["type"] || "info"
        var message = options["message"] || "This is a message"
        var closeBtn = options["closeBtn"] || false
        var duration = options["duration"] || "3000"

        // 创建DOM
        var messageDom = document.createElement("div")
        messageDom.classList.add("message")
        messageDom.classList.add(type)
        messageDom.innerHTML = message

        // 自动关闭
        var timer = null
        clearTimeout(timer)
        timer = setTimeout(() => {
            clearTimeout(timer1)
            messageDom.style.opacity = ".2"
            messageDom.style.transform = "translateX(-50%) translateY(0px)"
            var timer1 = setTimeout(() => {
                document.body.removeChild(messageDom)
            }, 500)
        }, duration)

        // 手动关闭
        if (closeBtn) {
            clearTimeout(timer)
            var closeDom = document.createElement("span")
            closeDom.innerHTML = "×"
            closeDom.classList.add("message-close")

            closeDom.onclick = function () {
                document.body.removeChild(messageDom)
            }
            messageDom.appendChild(closeDom)
        }

        // 挂载DOM
        document.body.appendChild(messageDom)

        // 多个消息框(将ODM伪数组转化成数组)
        var messages = Array.prototype.slice.call(document.getElementsByClassName("message"))
        for(let i = 0;i<messages.length;i++){
            clearTimeout(timer3)
            var timer3 = setTimeout(() => {
                messages[i].style.visibility = "visible"
                messages[i].style.transform = "translateX(-50%) translateY(" + 60 * (i + 1) + "px)"
                messages[i].style.opacity = "1"
            },500)
        }
        // 方法二
        // messages.map((v,i) => {
        //     ((v,i) => {
        //         setTimeout(() => {
        //             v.style.visibility = "visible"
        //             v.style.transform = "translateX(-50%) translateY(" + 60 * (i + 1) + "px)"
        //             v.style.opacity = "1"
        //         }，500)
        //     })(v,i)
        // })
    }

    // 实现点语法
    var messageType = ["info", "success", "warning", "error"]
    for (var i = 0; i < messageType.length; i++) {
        // 这里用了闭包，也可以用其他方法
        (function () {
            var type = messageType[i]
            window.message[type] = function (options) {
                if (typeof options === "string") {
                    options = {
                        message: options
                    }
                }
                options.type = type
                return window.message(options)
            }
        })(i)
    }
})(window)