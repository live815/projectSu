/**
* v-restrict-input 限制输入
*/

export default {
  mounted(el) {
    el.addEventListener('input', (event) => {
      let inputValue = event.target.value.trim();

      // 如果输入是 '0'，清除输入
      if (inputValue === '0') {
        event.target.value = '';
      } else if (!/^\d+$/.test(inputValue) || inputValue.includes('-') || inputValue.startsWith('-')) {
        // 移除包含字母、多个连字符和以连字符开头的情况
        event.target.value = inputValue.replace(/[^\d]+|^-*|-*$/g, '');
      }
    });
  },
}
