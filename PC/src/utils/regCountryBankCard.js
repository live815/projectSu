
// 银行卡进行校验
export function validateBankCard(value, site, i18n) {
  if (!value) {
    return i18n.global.t('GeneralUserCenter.BankCardNumberCannotBeEmpty');
  } else if (site === 'en') {
    // 英语银行卡号校验正则表达式
    const regEx = /^\d{12,19}$/;
    if (!regEx.test(value) || !luhnCheck(value)) {
      return i18n.global.t('GeneralUserCenter.bankCardNumberCheck');
    }
  } else if (site === 'cn') {
    // 中文银行卡号校验正则表达式
    const regEx = /^\d{16,19}$/;
    if (!regEx.test(value) || !luhnCheck(value)) {
      return i18n.global.t('GeneralUserCenter.bankCardNumberCheck');
    }
  } else if (site === 'vietnam') {
    // 越南银行卡号校验正则表达式
    // const regEx = /^[0-9]{4,19}$/;
    // if (!regEx.test(value) || !luhnCheck(value)) {
    //   return i18n.global.t('GeneralUserCenter.bankCardNumberCheck');
    // }
    if(value.length < 4 || value.length > 19) {
      return i18n.global.t('GeneralUserCenter.bankCardNumberCheck');
    }
  }
}
// 使用Luhn算法进行校验
function luhnCheck(value) {
  let sum = 0;
  let numDigits = value.length;
  let parity = numDigits % 2;
  for (let i = 0; i < numDigits; i++) {
    let digit = parseInt(value.charAt(i));
    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}