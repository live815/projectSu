export function getRegByPhoneCode(phoneCode) {
  phoneCode = phoneCode?.replace(/\+/gi, '')
  const phoneRules = {
    1: /^(\+1\s?)?\d{10}$/, // 美国
    86: /^(\+86\s?)?1[3456789]\d{9}$/, // 中国
    91: /^(\+91\s?)?[6789]\d{9}$/, // 印度
    44: /^(\+44\s?)?\d{10,12}$/, // 英国
    81: /^(\+81\s?)?0\d{9}$/, // 日本
    33: /^(\+33\s?)?[67]\d{8}$/, // 法国
    61: /^(\+61\s?)?4\d{8,9}$/, // 澳大利亚
    49: /^(\+49\s?)?\d{11,12}$/, // 德国
    7: /^(\+7\s?)?\d{10,11}$/, // 俄罗斯
    82: /^(\+82\s?)?0\d{9,10}$/, // 韩国
    65: /^(\+65\s?)?\d{8,9}$/, // 新加坡
    55: /^(\+55\s?)?[1-9]\d{9,10}$/, // 巴西
    52: /^(\+52\s?)?\d{10}$/, // 墨西哥
    54: /^(\+54\s?)?\d{10}$/, // 阿根廷
    234: /^(\+234\s?)?\d{10}$/, // 尼日利亚
    358: /^(\+358\s?)?\d{10}$/, // 芬兰
    46: /^(\+46\s?)?[1-9]\d{7,9}$/, // 瑞典
    45: /^(\+45\s?)?\d{8}$/, // 丹麦
    30: /^(\+30\s?)?\d{10}$/, // 希腊
    852: /^(\+852\s?)?\d{8}$/, // 香港
    230: /^(\+230\s?)?\d{7}$/, // 毛里求斯
    84: /^(\+84\s?)?[1-9]\d{8,9}$/, // 越南
    63: /^(\+63\s?)?[1-9]\d{9}$/ // 菲律宾
  }
  return phoneRules[phoneCode] || false
}

// 银行卡进行校验
export function validateBankCard(value, site, i18n) {
  if (!value) {
    return i18n.global.t('GeneralUserCenter.BankCardNumberCannotBeEmpty')
  } else if (site === 'en') {
    // 英语银行卡号校验正则表达式
    const regEx = /^\d{12,19}$/
    if (!regEx.test(value) || !luhnCheck(value)) {
      return i18n.global.t('GeneralUserCenter.bankCardNumberCheck')
    }
  } else if (site === 'cn') {
    // 中文银行卡号校验正则表达式
    const regEx = /^\d{16,19}$/
    if (!regEx.test(value) || !luhnCheck(value)) {
      return i18n.global.t('GeneralUserCenter.bankCardNumberCheck')
    }
  } else if (site === 'vietnam') {
    // 越南银行卡号校验正则表达式
    const regEx = /^[1-9][0-9]{4,19}$/
    if (!regEx.test(value) || !luhnCheck(value)) {
      return i18n.global.t('GeneralUserCenter.bankCardNumberCheck')
    }
  }
}
// 使用Luhn算法进行校验
function luhnCheck(value) {
  let sum = 0
  let numDigits = value.length
  let parity = numDigits % 2
  for (let i = 0; i < numDigits; i++) {
    let digit = parseInt(value.charAt(i))
    if (i % 2 === parity) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
  }
  return sum % 10 === 0
}
