import vue from 'vue';
import toastComponent from './toast.vue'; // 这里就是我们刚刚创建的那个静态组件
const ToastConstructor = vue.extend(toastComponent); // 返回一个 扩展实例构造器

import confirmComponent from './confirm.vue';
const ConfirmConstructor = vue.extend(confirmComponent);

//tost
class Toast {
    constructor() {
        this.toastDom = null;
    }
    init(text, status, duration) {
        if (!this.toastDom) {
            this.toastDom = new ToastConstructor({
                el: document.createElement('div'),
                data() {
                    return {
                        text,
                        status,
                        showFlag: true,
                    };
                }
            });
            document.body.appendChild(this.toastDom.$el);
        } else {
            this.toastDom.text = text;
            this.toastDom.status = status;
            this.toastDom.showFlag = true;
        }

        setTimeout(() => {
            this.toastDom.showFlag = false;
        }, duration);
    }
    success(text = '', duration = 1500) {
        this.init(text, 'success', duration);
    }
    fail(text = '', duration = 1500) {
        this.init(text, 'fail', duration);
    }
    warning(text = '', duration = 1500) {
        this.init(text, 'warning', duration);
    }
}
export const toast = new Toast();

//confirm
class Confirm {
    constructor() {
        this.confirmDom = null;
    }
    init({ text = '', cancelBtnText = '取消', confirmBtnText = '确定', confirm, cancel }) {
        if (!this.confirmDom) {
            this.confirmDom = new ConfirmConstructor({
                el: document.createElement('div'),
                data() {
                    return {
                        text,
                        cancelBtnText,
                        confirmBtnText,
                        showFlag: true
                    };
                },
                methods: {
                    show() {
                        this.showFlag = true;
                    },
                    hide() {
                        this.showFlag = false;
                    },
                    confirm() {
                        typeof confirm === 'function' && confirm();
                        this.hide();
                    },
                    cancel() {
                        typeof cancel === 'function' && cancel();
                        this.hide();
                    }
                }
            });
            document.body.appendChild(this.confirmDom.$el);
        } else {
            const confirmDom = this.confirmDom;
            confirmDom.text = text;
            confirmDom.cancelBtnText = cancelBtnText;
            confirmDom.confirmBtnText = confirmBtnText;
            confirmDom.showFlag = true;

            this.confirmDom.confirm = function () {
                typeof confirm === 'function' && confirm();
                confirmDom.hide();
            };
            this.confirmDom.cancel = function () {
                typeof cancel === 'function' && cancel();
                confirmDom.hide();
            };;
        }
    }

}
const confirmClass = new Confirm();
export function confirm(params) {
    confirmClass.init(params);
}
