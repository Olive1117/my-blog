/**
 * 格式化时间戳或 Date 对象为指定的日期字符串。
 * @param {number | Date} timestampOrDate - Unix 时间戳 (毫秒) 或 Date 对象。
 * @param {string} formatStr - 格式字符串，例如 'YYYY-MM-DD' 或 'YYYY年M月D日 HH:mm:ss'。
 * @returns {string} 格式化后的日期字符串。
 */
export function formatDate(timestampOrDate, formatStr = 'YYYY-MM-DD') {
    const date = new Date(timestampOrDate);

    // 基础替换映射
    const map = {
        YYYY: date.getFullYear(),
        MM: String(date.getMonth() + 1).padStart(2, '0'),
        M: date.getMonth() + 1,
        DD: String(date.getDate()).padStart(2, '0'),
        D: date.getDate(),
        HH: String(date.getHours()).padStart(2, '0'),
        mm: String(date.getMinutes()).padStart(2, '0'),
        ss: String(date.getSeconds()).padStart(2, '0'),
    };

    let result = formatStr;
    for (const key in map) {
        // 使用正则全局替换确保所有匹配项都被替换
        result = result.replace(new RegExp(key, 'g'), map[key]);
    }
    return result;
}