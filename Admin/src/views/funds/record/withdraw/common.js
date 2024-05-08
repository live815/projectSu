import i18n from "@/i18n";
export function  switchStatus(filterList,status){
  const item = filterList.find(item=>item.value === status)
  if(item) return item.label
  return '-'
}

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

export function  colorChange(status){
  switch (status) {
        case '3':
          return 'status-withdraw-3'; // 如果状态为0，应用红色字体的class
        case '4':
          return 'status-withdraw-4'; // 如果状态为1，应用红色字体的class
        case '5':
          return 'status-withdraw-5'; // 如果状态为2，应用蓝色字体的class
        case '6':
          return 'status-withdraw-6'; // 如果状态为3，应用绿色字体的class
        case '7':
          return 'status-withdraw-7'; // 如果状态为4，应用橙色字体的class
        case '8':
          return 'status-withdraw-8'; // 如果状态为5，应用橙色字体的class
        case '9':
          return 'status-withdraw-8'; // 如果状态为6，应用橙色字体的class
        case '10':
          return 'status-withdraw-8'; // 如果状态为7，应用红色字体的class
        case '11':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        case '12':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        case '13':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        case '14':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        case '15':
          return 'status-withdraw-8'; // 如果状态为8，应用红色字体的class
        default:
          return 'status-withdraw-8'; // 默认情况下，应用黑色字体的class
      }
}

export const dataStatus = [
  // {
  //   label: "风控待审核",
  //   value: "0",
  // },
  // {
  //   label: "风控搁置 ",
  //   value: "1",
  // },
  // {
  //   label: "风控审核拒绝",
  //   value: "2",
  // },
  {
    label: i18n.global.t("funds.riskReviewSuccessWaitPayment"),
    value: "3",
  },
  {
    label: i18n.global.t("funds.paymentSuccess"),
    value: "4",
  },
  {
    label: i18n.global.t("funds.threePartyPaymenting"),
    value: "5",
  },
  {
    label: i18n.global.t("funds.threePartyPaymenFailure"),
    value: "6",
  },
  {
    label: i18n.global.t("funds.refuseOutMoney"),
    value: "7",
  },
  {
    label: i18n.global.t("funds.forceSuccessWaitReview"),
    value: "8",
  },
  {
    label: i18n.global.t("funds.forceSuccessPass"),
    value: "9",
  },
  {
    label: i18n.global.t("funds.forceSuccessInject"),
    value: "10",
  },
  {
    label: i18n.global.t("funds.paymentReturnWaiReview"),
    value: "11",
  },
  {
    label: i18n.global.t("funds.paymentReturnPass"),
    value: "12",
  },
  {
    label: i18n.global.t("funds.paymentReturnRefuse"),
    value: "13",
  },
  {
    label: i18n.global.t("funds.waitEnsureArrival"),
    value: "14",
  },
  {
    label: i18n.global.t("funds.overTimeWaitEnsureArrival"),
    value: "15",
  },
  // {
  //   label: "风控审核通过(预约中)",
  //   value: "16",
  // }
]

export const dataStatusAll = [
  {
    label: i18n.global.t("funds.C2CWithdrawalOnHold"),
    value: "18",
  },
  {
    label: i18n.global.t("funds.waitRiskControlHandle"),
    value: "17",
  },
  {
    label: i18n.global.t("funds.riskWaitReview"),
    value: "0",
  },
  {
    label: i18n.global.t("funds.riskControlHoldOn"),
    value: "1",
  },
  {
    label: i18n.global.t("funds.riskControlReviewRefuse"),
    value: "2",
  },
  {
    label: i18n.global.t("funds.riskReviewSuccessWaitPayment"),
    value: "3",
  },
  {
    label: i18n.global.t("funds.riskConttrolReviewPass"),
    value: "16",
  },
  {
    label: i18n.global.t("funds.paymentSuccess"),
    value: "4",
  },
  {
    label: i18n.global.t("funds.threePartyPaymenting"),
    value: "5",
  },
  {
    label: i18n.global.t("funds.threePartyPaymenFailure"),
    value: "6",
  },
  {
    label: i18n.global.t("funds.refuseOutMoney"),
    value: "7",
  },
  {
    label: i18n.global.t("funds.forceSuccessWaitReview"),
    value: "8",
  },
  {
    label: i18n.global.t("funds.forceSuccessPass"),
    value: "9",
  },
  {
    label: i18n.global.t("funds.forceSuccessInject"),
    value: "10",
  },
  {
    label: i18n.global.t("funds.paymentReturnWaiReview"),
    value: "11",
  },
  {
    label: i18n.global.t("funds.paymentReturnPass"),
    value: "12",
  },
  {
    label: i18n.global.t("funds.paymentReturnRefuse"),
    value: "13",
  },
  {
    label: i18n.global.t("funds.waitEnsureArrival"),
    value: "14",
  },
  {
    label: i18n.global.t("funds.overTimeWaitEnsureArrival"),
    value: "15",
  },
]