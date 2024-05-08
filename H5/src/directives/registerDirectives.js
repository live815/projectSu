export default function (app) {

  app.directive('number', {
    mounted: function (el) {
      let input = getInput(el)
      input.onkeyup = function () {
        input.value = input.value.replace(/[^\d]/g, '')
      }
      input.onblur = function () {
        input.value = input.value.replace(/[^\d]/g, '')
      }
    }
  })

  app.directive('float', {
    mounted: function (el) {
      let input = getInput(el)
      input.onkeyup = function () {
        input.value = input.value.replace(/[^\d.]/g, '')
      }
      input.onblur = function () {
        input.value = input.value.replace(/[^\d.]/g, '')
      }
    }
  })

  app.directive('focus', {
    mounted(el) {
      el.focus()
    }
  })

}
const getInput = (el) => {
  let input = null
  // 如果是原生html元素
  if (el instanceof HTMLInputElement) {
    input = el
  } else {
    // vue组件 则向下继续查找
    input = el.getElementsByTagName('input')[0]
  }
  return input
}
