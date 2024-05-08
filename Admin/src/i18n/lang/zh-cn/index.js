// 获取全部字典
const getAllDicts = () => {
  const arr = [];
  // import.meta.globEager 是 Vite 提供的一种立即导入多个模块的方式
  const context = import.meta.globEager("./*.js");
  for (const path in context) {
    arr.push(context[path].default);
  }
  const dicts = Object.assign({}, ...arr);
  return dicts;
};
const dicts = getAllDicts();
export default {
  ...dicts,
};
