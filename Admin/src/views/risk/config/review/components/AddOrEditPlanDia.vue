<template>
  <div class="add-or-edit-plan-dia">
    <!-- 新增/编辑方案 -->
    <el-dialog
      v-model="dialogVisible"
      width="80%"
      :title="type === 'add' ? $t('risk.addPlanName') : $t('risk.editPlanName')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="right"
        label-width="98px"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('risk.planName')" prop="planName">
              <el-input
                v-model="queryParams.planName"
                :placeholder="$t('risk.pleaseInput')"
                clearable
                maxlength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.riskControlTier')" prop="riskLayerIds">
              <el-select
                v-model="queryParams.riskLayerIds"
                multiple
                :placeholder="$t('risk.pleaseSelect')"
                clearable
                class="full-width"
              >
                <el-option
                  v-for="dict in riskList"
                  :key="dict.id"
                  :label="dict.layerName"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.priority')" prop="priority">
              <el-input
                v-model="queryParams.priority"
                :placeholder="$t('risk.pleaseInput')"
                clearable
                maxlength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.remark')" prop="remark">
              <el-input
                type="textarea"
                v-model="queryParams.remark"
                maxlength="50"
                :placeholder="$t('risk.pleaseInput')"
                show-word-limit
                :rows="5"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('risk.ruleSetting')" prop="ruleSettingList">
              <el-table :data="queryParams.ruleSettingList" max-height="500">
                <el-table-column
                  :label="$t('risk.ruleName')"
                  prop="ruleName"
                  align="center"
                  width="200"
                >
                  <template #default="{ row }">
                    <span>{{ row.ruleName || "-" }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('risk.ruleContent')"
                  prop="content"
                  align="center"
                  width="600"
                >
                  <template #default="{ row }">
                    <template v-if="row.ruleName === $t('risk.specialUpperPartType')">
                      <span class="mr-4"
                        >{{ $t('risk.lastWithdrawalUntilNow') }}</span
                      >
                      <el-checkbox
                        v-model="row.ruleJson.fundAdjust"
                        disabled
                      >
                      </el-checkbox>
                      <span class="ml-4">{{ $t('risk.fundsAdjustAndAmountBeyond') }}</span>
                      <span>【{{ row.ruleJson.amount }}】{{ $t('risk.Yuan') }}</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.previousWithdraw')">
                      <span class="mr-4">{{ $t('risk.memberRank') }}</span>
                      <span>【{{ row.ruleJson.withdrawTimes }}】</span>
                      <span class="mr-4 ml-4">{{ $t('risk.severalTimesWithdrawal') }}</span>
                      <span>【{{ row.ruleJson.withdrawAmount }}】{{ $t('risk.Yuan') }}</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.newMemberLargeWithdrawal')">
                      <span class="mr-4">{{ $t('risk.withdrawAmount') }}</span>
                      <span>【{{ row.ruleJson.withdrawAmount }}】</span>
                      <span class="mr-4 ml-4">{{ $t('risk.vipLevelAbove') }}</span>
                      <span>【{{ row.ruleJson.memberLevel }}】</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.highWinTimes')">
                      <span class="mr-4">{{ $t('risk.withdrawAmountBeyondLastDeposit') }}</span>
                      <span>【{{ row.ruleJson.recentlyDepositMultiple }}】{{ $t('risk.times') }},</span>
                      <span class="mr-4 ml-4">{{ $t('risk.withdrawAmountBeyond') }}</span>
                      <span>【{{ row.ruleJson.withdrawAmount }}】</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.changeNameWithdraw')">
                      <span class="mr-4">{{ $t('risk.updateRealNameWithdraw') }}</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.secondSettlementWithdraw')">
                      <span class="mr-4"
                        >{{ $t('risk.memberLstWithdrawSuccess') }}</span
                      >
                    </template>
                    <template v-if="row.ruleName === $t('risk.virtualWithdrawRisk')">
                      <span class="mr-4"
                        >{{ $t('risk.recently') }}【{{
                          row.ruleJson.failDays
                        }}】{{ $t('risk.noBankCardWithdrawSuccess') }}【{{
                          row.ruleJson.frequency
                        }}】{{ $t('risk.timesBankCardWithdrawAmountLess') }}</span
                      >
                      <span>【{{ row.ruleJson.withdrawSuccessAmount }}】{{ $t('risk.Yuan') }}</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.overseasLogin')">
                      <span class="mr-4"
                        >{{ $t('risk.beforeNowWithdraw') }}【{{row.ruleJson.foreignLoginDays}}】{{ $t('risk.daysLoginOverseaIP') }}</span
                      >
                    </template>
                    <template v-if="row.ruleName === $t('risk.autoReviewPass')">
                      <span>{{ $t('risk.memberAutoWithdrawSuccess') }}</span>
                      <span>【{{ row.ruleJson.dispensingTimes }}】{{ $t('risk.timesShootThisPolicy') }}</span>
                    </template>
                    <!-- <template v-if="row.ruleName === $t('risk.changePhoneNumberWithdraw')">
                      <span class="mr-4">{{ $t('risk.changePhoneNumberFirstWithdraw') }}</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.changeFirstNameWithdraw')">
                      <span class="mr-4">{{ $t('risk.changeNameFirstWithdraw') }}</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.oneTimesWithdrawAmount')">
                      <span class="mr-4">{{ $t('risk.oneTimesWithdrawAmountBeyond') }}</span>
                      <span>【{{ row.ruleJson.withdrawAmount }}】</span>
                    </template> -->
                    <template v-if="row.ruleName === $t('risk.todayWithdrawAmount')">
                      <span class="mr-4">{{ $t('risk.todayWithdrawAmountBeyond') }}</span>
                      <span>【{{ row.ruleJson.withdrawAmount }}】</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.todayFirstWithdrawAmount')">
                      <span class="mr-4">{{ $t('risk.todayFirstWithdrawAmountBeyond') }}</span>
                      <span>【{{ row.ruleJson.withdrawAmount }}】</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.todayWinAmount')">
                      <span class="mr-4">{{ $t('risk.todayWinAmountBeyond') }}</span>
                      <span>【{{ row.ruleJson.profitAmount }}】</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.sevenDaysWinAmount')">
                      <span class="mr-4">{{ $t('risk.sevenDaysWinAmountBeyond') }}</span>
                      <span>【{{ row.ruleJson.profitAmount }}】</span>
                    </template>
                    <!-- <template v-if="row.ruleName === $t('risk.firstTimeWithdrawAmount')">
                      <span class="mr-4">{{ $t('risk.firstTimeWithdrawAmountBeyond') }}</span>
                      <span>【{{ row.ruleJson.withdrawAmount }}】</span>
                    </template> -->
                    <template v-if="row.ruleName === $t('risk.onlineTimeLess')">
                      <span class="mr-4">{{ $t('risk.memberOnlineTimeLess') }}</span>
                      <span>【{{ row.ruleJson.firstWithdraw }}】</span>
                      <span class="ml-4">{{ $t('risk.hours') }}</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.lowRecharge')">
                      <span class="mr-4">{{ $t('risk.memberHistoryRechargeAmount') }}</span>
                      <span>【{{ row.ruleJson.historyDepositAmount }}】</span>
                    </template>
                    <!-- <template v-if="row.ruleName === $t('risk.sameNameManyAccount')">
                      <span class="mr-4">{{ $t('risk.sameRealName') }}</span>
                      <span>【{{ row.ruleJson.count }}】</span>
                    </template> -->
                    <template v-if="row.ruleName === $t('risk.sameDeviceManyAccount')">
                      <span class="mr-4">{{ $t('risk.sameLoginDevice') }}</span>
                      <span>【{{ row.ruleJson.count }}】</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.sameRegisterIPManyAccount')">
                      <span class="mr-4">{{ $t('risk.sameIPBeyond') }}</span>
                      <span>【{{ row.ruleJson.count }}】</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.sameLoginIPManyAccount')">
                      <span class="mr-4">{{ $t('risk.sameLastLoginIPBeyond') }}</span>
                      <span>【{{ row.ruleJson.amount }}】</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.recentlyWithdrawFrequency')">
                      <span>【{{ row.ruleJson.hours }}】</span>
                      <span class="mr-4 ml-4">{{ $t('risk.hoursWithdrawSuccess') }}</span>
                      <span>【{{ row.ruleJson.successTimes }}】</span>
                      <span class="ml-4">{{ $t('risk.frequency') }}</span>
                    </template>
                    <template v-if="row.ruleName === $t('risk.rechargeWithdrawTimeTooShort')">
                      <span>{{ $t('risk.rechargeWithdrawTimeDeviationLess') }}</span>
                      <span class="mr-4 ml-4"
                        >【{{ row.ruleJson.hours }}】</span
                      >
                      <span>{{ $t('risk.minutes') }}</span>
                    </template>
                    <!-- <template v-if="row.ruleName === $t('risk.bonusAfterFirstWithdraw')">
                      <span class="mr-4"
                        >{{ $t('risk.lastTimeWithdrawSuccessAndGetBonus') }}</span
                      >
                      <span>【{{ row.ruleJson.amount }}】</span>
                    </template> -->
                    <template v-if="row.ruleName === $t('risk.walletLessZero')">
                      <span class="mr-4">{{ $t('risk.everyTablesWalletsAmountLessZero') }}</span>
                    </template>
                    <template
                      v-if="row.ruleName === $t('risk.lastOneRechargeAmountBeyondAverage')"
                    >
                      <span class="mr-4">【{{ row.ruleJson.hours }}】</span>
                      <span>{{ $t('risk.hoursLastOneRechargeAmountBeyond') }}</span>
                      <span class="mr-4 ml-4"
                        >【{{ row.ruleJson.recentlyDays }}】</span
                      >
                      <span>{{ $t('risk.dayAverageOneTimeRechargeAmount') }}</span>
                      <span class="mr-4 ml-4"
                        >【{{ row.ruleJson.averageDepositAmount }}】</span
                      >
                      <span>%</span>
                    </template>
                    <!-- <template
                      v-if="row.ruleName === '最后一笔充值金额大于最大'"
                    >
                      <span class="mr-4">【{{ row.ruleJson.hours }}】</span>
                      <span>小时内的最后一笔充值金额＞近</span>
                      <span class="mr-4 ml-4"
                        >【{{ row.ruleJson.recentlyDays }}】</span
                      >
                      <span>日平均单笔充值金额</span>
                      <span class="mr-4 ml-4"
                        >【{{ row.ruleJson.largestDepositAmount }}】</span
                      >
                    </template>
                    <template v-if="row.ruleName === '投注占比变化过大'">
                      <span class="mr-4">【{{ row.ruleJson.hours }}】</span>
                      <span
                        >小时内的最后一笔充值后，任一游戏投注占比＞充值前</span
                      >
                      <span class="mr-4 ml-4"
                        >【{{ row.ruleJson.days }}】</span
                      >
                      <span>日该游戏占比</span>
                      <span class="mr-4 ml-4"
                        >【{{ row.ruleJson.rates }}】</span
                      >
                      <span>%</span>
                    </template>
                    <template v-if="row.ruleName === '存提现行为异常'">
                      <span>当前提现为USDT且最近一笔存款为</span>
                    </template>
                    <template v-if="row.ruleName === 'C2C-存提间隔过短'">
                      <span
                        >上一笔存款为C2C存款并且本次提款距离最后一次存款时间间隔小于</span
                      >
                      <span class="mr-4 ml-4"
                        >【{{ row.ruleJson.minutes }}】</span
                      >
                      <span>分钟</span>
                    </template>
                    <template v-if="row.ruleName === 'C2C-投注倍率过低'">
                      <span
                        >上一笔存款为C2C存款并且提款距离最后一次存款之间的所有有效投注的平均倍率小于</span
                      >
                      <span class="mr-4 ml-4"
                        >【{{ row.ruleJson.rates }}】</span
                      >
                      <span>分钟</span>
                    </template>
                    <template v-if="row.ruleName === 'C2C-提/存占比异常'">
                      <div>
                        上一笔存款为C2C存款并且本次提款金额占比存款金额为:
                      </div>
                      <div>1.存款1~500,提款占比:70%~120%</div>
                      <div>
                        2.存款【{{ row.ruleJson.minDepositAmount }}】~【{{
                          row.ruleJson.maxDepositAmount
                        }}】， 提款占比：【{{ row.ruleJson.minTransactionRate }}】%~【{{
                          row.ruleJson.maxTransactionRate
                        }}】%
                      </div>
                    </template> -->
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('risk.priority')"
                  prop="priority"
                  align="center"
                ></el-table-column>
                <el-table-column
                  :label="$t('risk.attendAutoAudit')"
                  prop="autoAudit"
                  align="center"
                >
                  <template #default="{ row }">
                    <span v-if="row.autoAudit === 1" style="color: #1890ff"
                      >{{ $t('risk.yes') }}</span
                    >
                    <span v-else-if="row.autoAudit === 0">{{ $t('risk.no') }}</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('risk.remarkNoQuote')" prop="remark" align="center">
                  <template #default="{ row }">
                    <span>{{ row.remark || "-" }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('risk.status')" prop="status" align="center">
                  <template #default="{ row }">
                    <el-switch
                      v-model="row.status"
                      :active-value="1"
                      :inactive-value="0"
                      @change="changeStatus"
                    ></el-switch>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('risk.handle')" align="center">
                  <template #default="{ row,$index }">
                    <el-button
                      type="primary"
                      size="small"
                      @click="editRules(row,$index)"
                      >{{ $t('risk.edit') }}</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('risk.cancel') }}</el-button>
          <el-button type="primary" @click="submit">{{ $t('risk.submit') }}</el-button>
        </span>
      </template>
      <EditRuleDialog
        v-model:open="openRules"
        :secondTitle="secondTitle"
        :cloneRow="cloneRow"
        @onrefresh="saveEditData"
        v-if="openRules"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { getRiskPlanInfo,addRiskPlan,editRiskPlan,getValidLevel} from "@/api/risk/config/index";
import EditRuleDialog from "./EditRuleDialog.vue";

const props = defineProps(["open", "type","id"]);
const emit = defineEmits(["update:open", "onrefreshlist"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  id: null,
  planName: null,
  planType:2,
  riskLayerIds: [],
  priority:null,
  remark: null,
  ruleSettingList: [
    {
      ruleName: i18n.global.t("risk.specialUpperPartType"),
      status: 1,
      priority: 2,
      autoAudit: 0,
      remark:null,
      ruleJson: {
        fundAdjust: null,
        amount: null
      },
      ruleCode:1
    },
    {
      ruleName: i18n.global.t("risk.previousWithdraw"),
      status: 1,
      priority: 3,
      autoAudit: 0,
      remark:null,
      ruleJson: {
        withdrawTimes: null,
        withdrawAmount: null
      },
      ruleCode:2
    },
    {
      ruleName: i18n.global.t("risk.newMemberLargeWithdrawal"),
      status: 1,
      priority: 4,
      autoAudit: 0,
      remark:null,
      ruleJson: {
        withdrawAmount: null,
        memberLevel: null
      },
      ruleCode:3
    },
    {
      ruleName: i18n.global.t("risk.highWinTimes"),
      status: 0,
      priority: 5,
      autoAudit: 0,
      remark:null,
      ruleJson: {
        recentlyDepositMultiple: null,
        withdrawAmount: null
      },
      ruleCode:4
    },
    {
      ruleName: i18n.global.t("risk.changeNameWithdraw"),
      status: 0,
      priority: 6,
      autoAudit: 0,
      remark:null,
      ruleCode:5
    },
    {
      ruleName: i18n.global.t("risk.secondSettlementWithdraw"),
      status: 0,
      priority: 7,
      autoAudit: 0,
      remark:null,
      ruleCode:6
    },
    {
      ruleName: i18n.global.t("risk.virtualWithdrawRisk"),
      status: 0,
      priority: 8,
      autoAudit: 0,
      remark:null,
      ruleJson: {
        failDays: null,
        frequency: null,
        withdrawSuccessAmount:null
      },
      ruleCode:7
    },
    {
      ruleName: i18n.global.t("risk.overseasLogin"),
      status: 0,
      priority: 9,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        foreignLoginDays: null
      },
      ruleCode:8
    },
    {
      ruleName: i18n.global.t("risk.autoReviewPass"),
      status: 0,
      priority: 10,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        dispensingTimes: null
      },
      ruleCode:9
    },
    // {
    //   ruleName: "修改手机号提现",
    //   status: 0,
    //   priority: 11,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //   },
    //   ruleCode:10
    // },
    // {
    //   ruleName: "修改姓名提现",
    //   status: 0,
    //   priority: 12,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleCode:11
    // },
    // {
    //   ruleName: "单次提现金额",
    //   status: 0,
    //   priority: 13,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //     withdrawAmount: null
    //   },
    //   ruleCode:12
    // },
    {
      ruleName: i18n.global.t("risk.todayWithdrawAmount"),
      status: 0,
      priority: 13,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        withdrawAmount: null
      },
      ruleCode:13
    },
    {
      ruleName: i18n.global.t("risk.todayFirstWithdrawAmount"),
      status: 0,
      priority: 14,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        withdrawAmount: null
      },
      ruleCode:14
    },
    {
      ruleName: i18n.global.t("risk.todayWinAmount"),
      status: 0,
      priority: 15,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        profitAmount: null
      },
      ruleCode:15
    },
    {
      ruleName: i18n.global.t("risk.sevenDaysWinAmount"),
      status: 0,
      priority: 16,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        profitAmount: null
      },
      ruleCode:16
    },
    // {
    //   ruleName: "首次提现金额",
    //   status: 0,
    //   priority: 18,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //     withdrawAmount: null
    //   },
    //   ruleCode:17
    // },
    {
      ruleName: i18n.global.t("risk.onlineTimeLess"),
      status: 0,
      priority: 18,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        firstWithdraw: null
      },
      ruleCode:18
    },
    {
      ruleName: i18n.global.t("risk.lowRecharge"),
      status: 0,
      priority: 19,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        historyDepositAmount: null
      },
      ruleCode:19
    },
    // {
    //   ruleName: "同姓名多账号",
    //   status: 0,
    //   priority: 21,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //     count: null
    //   },
    //   ruleCode:20
    // },
    {
      ruleName: i18n.global.t("risk.sameDeviceManyAccount"),
      status: 0,
      priority: 21,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        count: null
      },
      ruleCode:21
    },
    {
      ruleName: i18n.global.t("risk.sameRegisterIPManyAccount"),
      status: 0,
      priority: 22,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        count: null
      },
      ruleCode:22
    },
    {
      ruleName: i18n.global.t("risk.sameLoginIPManyAccount"),
      status: 0,
      priority: 23,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        amount: null
      },
      ruleCode:23
    },
    {
      ruleName: i18n.global.t("risk.recentlyWithdrawFrequency"),
      status: 0,
      priority: 24,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        hours: null,
        successTimes:null
      },
      ruleCode:24
    },
    {
      ruleName: i18n.global.t("risk.rechargeWithdrawTimeTooShort"),
      status: 0,
      priority: 25,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        hours: null
      },
      ruleCode:25
    },
    // {
    //   ruleName: i18n.global.t("risk.bonusAfterFirstWithdraw"),
    //   status: 0,
    //   priority: 26,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //     amount: null
    //   },
    //   ruleCode:26
    // },
    {
      ruleName: i18n.global.t("risk.walletLessZero"),
      status: 0,
      priority: 28,
      autoAudit: 1,
      remark: null,
      ruleCode:27
    },
    {
      ruleName: i18n.global.t("risk.lastOneRechargeAmountBeyondAverage"),
      status: 0,
      priority: 30,
      autoAudit: 1,
      remark: null,
      ruleJson: {
        hours: null,
        recentlyDays: null,
        averageDepositAmount: null
      },
      ruleCode:28
    },
    // {
    //   ruleName: "最后一笔充值金额大于最大",
    //   status: 0,
    //   priority: 30,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //     hours: null,
    //     recentlyDays: null,
    //     largestDepositAmount: null
    //   },
    //   ruleCode:29
    // },
    // {
    //   ruleName: "投注占比变化过大",
    //   status: 0,
    //   priority: 31,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //     hours: null,
    //     days: null,
    //     rates: null
    //   },
    //   ruleCode:30
    // },
    // {
    //   ruleName: "存提现行为异常",
    //   status: 0,
    //   priority: 32,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleCode:31
    // },
    // {
    //   ruleName: "C2C-存提间隔过短",
    //   status: 0,
    //   priority: 33,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //     minutes: null
    //   },
    //   ruleCode:32
    // },
    // {
    //   ruleName: "C2C-投注倍率过低",
    //   status: 0,
    //   priority: 34,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //     rates: null
    //   },
    //   ruleCode:33
    // },
    // {
    //   ruleName: "C2C-提/存占比异常",
    //   status: 0,
    //   priority: 35,
    //   autoAudit: 1,
    //   remark: null,
    //   ruleJson: {
    //     minDepositAmount: null,
    //     maxDepositAmount: null,
    //     minTransactionRate: null,
    //     maxTransactionRate: null,
    //   },
    //   ruleCode:34
    // },
  ],
});
const queryRef = ref(null);
const rules = ref({
  planName: [
    { required: true, message: i18n.global.t("risk.pleaseInputPlanName"), trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5.]+$/,
      message: i18n.global.t("risk.onlyChineseNumberEnglish"),
      trigger: "blur",
    },
  ],
  riskLayerIds: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("risk.pleaseSelectRiskControlTier"),
      trigger: "change",
    },
  ],
  priority: [
    {
      pattern: /^\d{1,5}$/,
      message: i18n.global.t("risk.fivePositiveInteger"),
      trigger: "blur",
    },
    { required: true, message: i18n.global.t("risk.pleaseInputPriority"), trigger: "blur" },
  ],
});
const riskList = ref([]);

const secondTitle = ref(null);
const openRules = ref(false);
const cloneRow = ref(null);
const currentIndex  = ref(null); //规则设置表格的当前选中项

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(async () => {
  (props.type === 'edit') && await queryInfo();
  await queryRiskList();
});
//查询方案名称去过滤风控层级下拉
function queryName() {}
//查询可用的风控层级
function queryRiskList() {
  const id = props.type === 'edit'?props.id:null
  return getValidLevel({
    planId:id
  }).then((res) => {
    riskList.value = res || [];
  });
}
function queryInfo(){
  return getRiskPlanInfo(props.id).then(res=>{
    queryParams.value = res || {};
    // queryParams.value.riskLayerIds = queryParams.value.riskLayerIds ?queryParams.value.riskLayerIds.split(',').map(item=>Number(item)):[];
  })
}
function changeStatus() {}
function editRules(row,index) {
  secondTitle.value = row.ruleName;
  openRules.value = true;
  cloneRow.value = JSON.parse(JSON.stringify(row));
  currentIndex.value = index
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      if(props.type === 'add'){
        addRiskPlan(queryParams.value).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("risk.addSuccessfully"));
          emit("onrefreshlist");
          cancel();
        })
      }else{
        editRiskPlan(queryParams.value).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"));
          emit("onrefreshlist");
          cancel();
        })
      }
    } else {
      return;
    }
  });
}
function saveEditData(val){
  queryParams.value.ruleSettingList[currentIndex.value] = val
}
</script>

<style lang="scss" scoped>
.add-or-edit-plan-dia {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
</style>
