/**
 * 防抖函数  
 * 时间停止之前不会触发
 * @param {*} fn 
 * @param {*} timeout 
 * @returns 
 */
export function debounce(fn, timeout = 100) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(this, ...args)
        }, timeout);
    }
};

/**
 * 节流函数  
 * 只能按时间间隔触发
 * @param {*} fn 
 * @param {*} timeout 
 * @returns 
 */
export function throttle(fn, timeout = 100) {
    let timer = null;
    let isProcessing = false;
    return function (...args) {
        if (!isProcessing) {
            isProcessing = true;
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(this, ...args)
                isProcessing = false;
            }, timeout);
        }
    }
};