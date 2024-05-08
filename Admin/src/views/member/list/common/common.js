import i18n from "@/i18n";
export function statusSwitchToLabel(type){
  switch (type) {
    case '0':
      return i18n.global.t("member.regular");
    case '1':
      return i18n.global.t("member.loginLock");
    case '2':
      return i18n.global.t("member.rechargeWithdrawLock");
    case '3':
      return i18n.global.t("member.abandonWithdrawLock");
    case '4':
      return i18n.global.t("member.offerLock");
    case '5':
      return i18n.global.t("member.rebateLock");
    case '6':
      return i18n.global.t("member.gameLock");
    default:
      return "-";
  }
}
export function colorSwitch(type){
  switch (type) {
    case '0':
      return "success";
    case '1':
      return "info";
    case '2':
      return "info";
    case '3':
      return "warning";
    case '4':
      return "danger";
    case '5':
      return "";
    case '6':
      return "danger";
    default:
      return "-";
  }
}