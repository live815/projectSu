import i18n from "@/i18n";
export const actionUsername = [
  {
    label:i18n.global.t("risk.loginLock"),
    value:"loginLock"
  },
  {
    label:i18n.global.t("risk.rechargeWithdrawLock"),
    value:"depositWithdrawLock"
  },
  {
    label:i18n.global.t("risk.abandonWithdrawLock"),
    value:"disableWithdrawLock"
  },
  {
    label:i18n.global.t("risk.discountsLock"),
    value:"discountLock"
  },
  {
    label:i18n.global.t("risk.rebateLock"),
    value:"refundWaterLock"
  },
  {
    label:i18n.global.t("risk.gameLock"),
    value:"gameLock"
  }
]
export const actionIp = [
  {
    label:i18n.global.t("risk.registerNotAllowed"),
    value:"registerLock"
  },
  {
    label:i18n.global.t("risk.loginNotAllowed"),
    value:"loginLock"
  },
  {
    label:i18n.global.t("risk.withdrawalNotAllowed"),
    value:"disableWithdrawLock"
  },
  {
    label:i18n.global.t("risk.rebateNotAllowed"),
    value:"refundWaterLock"
  }
]
export const actionDeviceNo = [
  {
    label:i18n.global.t("risk.registerNotAllowed"),
    value:"registerLock"
  },
  {
    label:i18n.global.t("risk.loginNotAllowed"),
    value:"loginLock"
  },
  {
    label:i18n.global.t("risk.withdrawalNotAllowed"),
    value:"disableWithdrawLock"
  },
  {
    label:i18n.global.t("risk.rebateNotAllowed"),
    value:"refundWaterLock"
  }
]
export const actionBankcard = [
  {
    label:i18n.global.t("risk.withdrawalNotAllowed"),
    value:"disableWithdrawLock"
  },
  {
    label:i18n.global.t("risk.abandonBinding"),
    value:"disableBind"
  }
]
export const actionVirtuakAddress = [
  {
    label:i18n.global.t("risk.withdrawalNotAllowed"),
    value:"disableWithdrawLock"
  },
  {
    label:i18n.global.t("risk.abandonBinding"),
    value:"disableBind"
  }
]
export const actionVirtuakNumber = [
  {
    label:i18n.global.t("risk.loginNotAllowed"),
    value:"loginLock"
  },
  {
    label:i18n.global.t("risk.registerNotAllowed"),
    value:"registerLock"
  }
]
export const actionPhoneNumber = [
  // {
  //   label:i18n.global.t("risk.registerNotAllowed"),
  //   value:"registerLock"
  // },
  {
    label:i18n.global.t("risk.loginNotAllowed"),
    value:"loginLock"
  },
  {
    label:i18n.global.t("risk.abandonBinding"),
    value:"disableBind"
  }
]