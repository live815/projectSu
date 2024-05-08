import i18n from "@/i18n";
//校验会员账号长度
export function validateUsername(rule, value, callback) {
  const max = 1000;
  const userNameList = value.split(',');

  if (userNameList.length > max) {
    callback(new Error(i18n.global.t("risk.pleaseInputMaxLengthUsername")));
    return;
  }
  // 所有校验通过
  callback();
}

//校验ip地址长度和格式
export function validateIPv4List(rule, value, callback) {
  const maxIPs = 1000;
  const ipList = value.split(',');

  if (ipList.length > maxIPs) {
    callback(new Error(i18n.global.t("risk.pleaseInputMaxLengthIp")));
    return;
  }

  const ipv4Regex =  /^((25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;

  for (const ip of ipList) {
    if (!ipv4Regex.test(ip)) {
      callback(new Error(i18n.global.t("risk.ipMustBetweenZeroAndTwoHundredFiftyFive")));
      return;
    }

    // const values = ip.split('.').map(Number);

    // if (values.some(value => isNaN(value) || value < 0 || value > 255)) {
    //   callback(new Error('每个参数值必须在0~255之间'));
    //   return;
    // }
  }

  // 所有校验通过
  callback();
}

//校验设备号长度
export function validateDevice(rule, value, callback) {
  const max = 1000;
  const list = value.split(',');

  if (list.length > max) {
    callback(new Error(i18n.global.t("risk.pleaseInputMaxLengthDevice")));
    return;
  }
  // 所有校验通过
  callback();
}

//校验银行卡长度
export function validateBankcard(rule, value, callback) {
  const max = 1000;
  const list = value.split(',');

  if (list.length > max) {
    callback(new Error(i18n.global.t("risk.pleaseInputMaxLengthBankcard")));
    return;
  }
  // 所有校验通过
  callback();
}

//校验虚拟币地址长度
export function validateVirtualAddress(rule, value, callback) {
  const max = 1000;
  const list = value.split(',');

  if (list.length > max) {
    callback(new Error(i18n.global.t("risk.pleaseInputMaxLengthAddress")));
    return;
  }
  // 所有校验通过
  callback();
}

//校验虚拟手机号段长度和号段长度
export function validateVirtualNumber(rule, value, callback) {
  const max = 1000;
  const list = value.split(',');

  if (list.length > max) {
    callback(new Error(i18n.global.t("risk.pleaseInputMaxLengthNumber")));
    return;
  }
  for (const virtual of list) {
    const length = virtual.length

    if (length < 2) {
      callback(new Error(i18n.global.t("risk.pleaseInputAtLeastlengthOfTwo")));
      return;
    }
  }
  // 所有校验通过
  callback();
}

//校验手机号长度
export function validatePhoneNumber(rule, value, callback) {
  const max = 1000;
  const list = value.split(',');

  if (list.length > max) {
    callback(new Error(i18n.global.t("risk.pleaseInputMaxLengthPhoneNumber")));
    return;
  }
  const regex = /^\d+$/;
  for (const phone of list) {
    if (!regex.test(phone)) {
      callback(new Error(i18n.global.t("risk.pleaseInputDigtalOfPhoneNumber")));
      return;
    }
  }
  // 所有校验通过
  callback();
}