import i18n from "@/i18n";
// 玩法展示分类
export const SPORT_GAMEPLAY = [
  { key: "p", value: i18n.global.t("common.popular") },
  { key: "h", value: i18n.global.t("common.handicapScoreBigSmall") },
  { key: "c", value: i18n.global.t("common.cornerKick") },
  { key: "cs", value: i18n.global.t("common.waveBile") },
  { key: "s", value: i18n.global.t("common.goal") },
  { key: "f", value: i18n.global.t("common.halfTime") },
  { key: "i", value: i18n.global.t("common.specialBet") },
  { key: "b", value: i18n.global.t("common.penaltyCrad") },
  { key: "q", value: i18n.global.t("common.festival") },
  { key: "t", value: i18n.global.t("common.fifteenMin") },
  { key: "j", value: i18n.global.t("common.game") },
  { key: "set", value: i18n.global.t("common.set") },
  { key: "qu", value: i18n.global.t("common.topTwoCombinations") },
  { key: "z", value: i18n.global.t("common.accurateTopTwo") },
  { key: "ps", value: i18n.global.t("common.peneltyShootout") },
  { key: "pro", value: i18n.global.t("common.promotedTeam") },
  { key: "1st", value: i18n.global.t("common.winChampionship") },
  { key: "3rd", value: i18n.global.t("common.winThirdPlace") },
  { key: "o", value: i18n.global.t("common.other") },
];
export function getOddFormat(odd, oddsFormat) {
  switch (oddsFormat) {
    case 1:
      return odd;
    case 2:
      return formatNumber(Number(odd) - 1);
    default:
      return odd;
  }
}
// 正常开售状态
export function isSolding(ss, od) {
  return ss === 1 && od > 0;
}
