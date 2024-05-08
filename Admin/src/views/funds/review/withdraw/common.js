import i18n from "@/i18n";
export const dataStatus = [
  {
    label: i18n.global.t("funds.forceSuccessWaitReview"),
    value: "8",
  },
  {
    label: i18n.global.t("funds.paymentReturnWaiReview"),
    value: "11",
  }
]

export const dataStatusAll = [
  {
    label: i18n.global.t("funds.forceSuccessPass"),
    value: "9",
  },
  {
    label: i18n.global.t("funds.forceSuccessInject"),
    value: "10",
  },
  {
    label:  i18n.global.t("funds.paymentReturnPass"),
    value: "12",
  },
  {
    label: i18n.global.t("funds.paymentReturnRefuse"),
    value: "13",
  }
]

export const unAuditedData = [
  {
    label: i18n.global.t("funds.recieveMoneyTime"),
    value: 1,
  },
  // {
  //   label: "出款时间",
  //   value: 2,
  // },
  // {
  //   label: "风控审核时间",
  //   value: 3,
  // },
  {
    label: i18n.global.t("funds.financialOperateApplyTime"),
    value: 4,
  }
]

export const auditedData = [
  {
    label: i18n.global.t("funds.recieveMoneyTime"),
    value: 1,
  },
  {
    label: i18n.global.t("funds.paymentTime"),
    value: 2,
  },
  // {
  //   label: "风控审核时间",
  //   value: 3,
  // },
  {
    label: i18n.global.t("funds.financialOperateApplyTime"),
    value: 4,
  },
  {
    label: i18n.global.t("funds.financialreviewTime"),
    value: 5,
  }
]
export const unAuditedTypeData = [
  {
    label: i18n.global.t("funds.userNameNoQuote"),
    value: 1,
  },
  {
    label: i18n.global.t("funds.orderNo"),
    value: 2,
  },
  // {
  //   label: "风控审核人",
  //   value: 3,
  // },
  {
    label: i18n.global.t("funds.financialOperateApplyPerson"),
    value: 4,
  }
]

export const auditedTypeData = [
  {
    label: i18n.global.t("funds.userNameNoQuote"),
    value: 1,
  },
  {
    label: i18n.global.t("funds.orderNo"),
    value: 2,
  },
  // {
  //   label: "风控审核人",
  //   value: 3,
  // },
  {
    label: i18n.global.t("funds.financialOperateApplyPerson"),
    value: 4,
  },
  {
    label: i18n.global.t("funds.financialOperateReviewPerson"),
    value: 5,
  }
]

export function  switchWdTypeStatus(filterList,status){
  const item = filterList.find(item=>item.value === status)
  if(item) return item.label
  return '-'
}

export function  switchWdWayTypeStatus(filterList,status){
  const item = filterList.find(item=>item.value === status)
  if(item) return item.label
  return '-'
}

export function  switchpaymentMethodStatus(filterList,status){
  const item = filterList.find(item=>item.value === status)
  if(item) return item.label
  return '-'
}