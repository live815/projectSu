<template>
  <div class="edit-rules-dialog">
    <!-- 新增/编辑方案 -->
    <el-dialog
      v-model="dialogVisible"
      width="50%"
      :title="secondTitle"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="top"
        label-width="108px"
        ref="queryRef"
        :rules="rules"
      >
        <el-row>
          <el-col :span="24" v-if="secondTitle === $t('risk.specialUpperPartType')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <div class="full-width">{{ $t('risk.lastWithdrawalUntilNow') }}</div>
              <el-checkbox v-model="queryParams.ruleJson.fundAdjust">
                {{ $t('risk.fundsAdjustAndAmountBeyond') }}
              </el-checkbox>
              <el-form-item prop="ruleJson.amount">
                  <el-input v-model="queryParams.ruleJson.amount" :placeholder="$t('risk.pleaseInput')" clearable style="width:100%;">
                    <template #append>
                      <span>{{ $t('risk.Yuan') }}</span>
                    </template>
                  </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.previousWithdraw')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.memberRank') }}</span>
              <el-form-item prop="ruleJson.withdrawTimes">
                <el-input v-model="queryParams.ruleJson.withdrawTimes" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.frequency') }}</span>
                  </template>
                </el-input>
              </el-form-item>
              <span class="mr-4 ml-4">{{ $t('risk.withdrawAmount') }}</span>
              <el-form-item prop="ruleJson.withdrawAmount">
                <el-input v-model="queryParams.ruleJson.withdrawAmount" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.Yuan') }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.newMemberLargeWithdrawal')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.withdrawAmount') }}</span>
              <el-form-item prop="ruleJson.withdrawAmount">
                <el-input v-model="queryParams.ruleJson.withdrawAmount" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.Yuan') }}</span>
                  </template>
                </el-input>
              </el-form-item>
              <span class="ml-8 mr-8">{{ $t('risk.vipLevelAboveWithoutVIP') }}</span>
              <el-select v-model="queryParams.ruleJson.memberLevel" :placeholder="$t('risk.pleaseSelect')" clearable style="width:30%;">
                <el-option v-for="item in vipLevelList" :key="item.vipLevel" :label="item.vipName" :value="item.vipLevel" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.highWinTimes')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.withdrawAmountBeyondLastDeposit') }}</span>
              <el-form-item prop="ruleJson.recentlyDepositMultiple">
                <el-input v-model="queryParams.ruleJson.recentlyDepositMultiple" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{$t('risk.times')}}</span>
                  </template>
                </el-input>
              </el-form-item>
              <span class="mr-4 ml-4">{{$t('risk.withdrawAmountBeyond')}}</span>
              <el-form-item prop="ruleJson.withdrawAmount">
                <el-input v-model="queryParams.ruleJson.withdrawAmount" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.Yuan') }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.changeNameWithdraw')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="ruleJson">
              <!-- <el-input
                v-model="queryParams.ruleJson.firstWithdraw"
                :placeholder="$t('risk.pleaseInput')"
                clearable
                disabled
              /> -->
              <span>{{ $t('risk.updateRealNameWithdraw') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.secondSettlementWithdraw')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="ruleJson">
              <!-- <el-input
                v-model="queryParams.ruleJson.secondWithdraw"
                :placeholder="$t('risk.pleaseInput')"
                clearable
                disabled
              /> -->
              <span>{{ $t('risk.memberLstWithdrawSuccess') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.virtualWithdrawRisk')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson">
              <el-col class="mb-20" style="display: flex;align-items: center;">
                <span class="mr-8">{{ $t('risk.recently') }}</span>
                <el-form-item prop="ruleJson.failDays">
                  <el-input v-model="queryParams.ruleJson.failDays" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                    <template #append>
                      <span>{{ $t('risk.days') }}</span>
                    </template>
                  </el-input>
                </el-form-item>
                <span class="ml-8">{{ $t('risk.noBankCardWithdraw') }}</span>
              </el-col>
              <el-col style="display: flex;align-items: center;">
                <span class="mr-8">{{ $t('risk.secondRecently') }}</span>
                <el-form-item prop="ruleJson.frequency">
                  <el-input v-model="queryParams.ruleJson.frequency" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                    <template #append>
                      <span>{{ $t('risk.frequency') }}</span>
                    </template>
                  </el-input>
                </el-form-item>
                <span class="ml-8 mr-8">{{ $t('risk.timesBankCardWithdrawAmoun') }}</span>
                <el-form-item prop="ruleJson.withdrawSuccessAmount">
                  <el-input v-model="queryParams.ruleJson.withdrawSuccessAmount" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                    <template #append>
                      <span>{{ $t('risk.Yuan') }}</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.overseasLogin')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-8">{{ $t('risk.beforeNowWithdraw') }}</span>
              <el-form-item prop="ruleJson.foreignLoginDays">
                <el-input v-model="queryParams.ruleJson.foreignLoginDays" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.days') }}</span>
                  </template>
                </el-input>
              </el-form-item>
              <span class="ml-8">{{ $t('risk.daysLoginOversea') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.autoReviewPass')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-8">{{ $t('risk.memberAutoWithdrawSuccess') }}</span>
              <el-form-item prop="ruleJson.dispensingTimes">
                <el-input v-model="queryParams.ruleJson.dispensingTimes" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.frequency') }}</span>
                  </template>
                </el-input>
              </el-form-item>
              <span class="ml-8">,{{ $t('risk.shootThisPolicy') }}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" v-if="secondTitle === '修改手机号提现'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="ruleJson">
              <span>修改手机号码后的第一次取款</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === '修改姓名提现'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="ruleJson">
              <span>修改姓名后的第一次取款</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === '单次提现金额'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">单次提现金额＞</span>
              <el-input v-model="queryParams.ruleJson.withdrawAmount" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
                <template #append>
                  <span>{{ $t('risk.Yuan') }}</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="24" v-if="secondTitle === $t('risk.todayWithdrawAmount')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.todayWithdrawAmountBeyond') }}</span>
              <el-form-item prop="ruleJson.withdrawAmount">
                <el-input v-model="queryParams.ruleJson.withdrawAmount" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.Yuan') }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.todayFirstWithdrawAmount')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.todayFirstWithdrawAmountBeyond') }}</span>
              <el-form-item prop="ruleJson.withdrawAmount">
                <el-input v-model="queryParams.ruleJson.withdrawAmount" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.Yuan') }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.todayWinAmount')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.todayWinAmountBeyond') }}</span>
              <el-form-item prop="ruleJson.profitAmount">
                <el-input v-model="queryParams.ruleJson.profitAmount" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.Yuan') }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.sevenDaysWinAmount')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.sevenDaysWinAmountBeyond') }}</span>
              <el-form-item prop="ruleJson.profitAmount">
                <el-input v-model="queryParams.ruleJson.profitAmount" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.Yuan') }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.firstTimeWithdrawAmount')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.firstTimeWithdrawAmountBeyond') }}</span>
              <el-form-item prop="ruleJson.withdrawAmount">
                <el-input v-model="queryParams.ruleJson.withdrawAmount" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
                  <template #append>
                    <span>{{ $t('risk.Yuan') }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.onlineTimeLess')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.memberOnlineTimeLess') }}</span>
              <el-form-item prop="ruleJson.firstWithdraw">
                <el-input v-model="queryParams.ruleJson.firstWithdraw" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                  <template #append>
                    <span>{{ $t('risk.hours') }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.lowRecharge')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.memberHistoryRechargeAmount') }}</span>
              <el-form-item prop="ruleJson.historyDepositAmount">
                <el-input v-model="queryParams.ruleJson.historyDepositAmount" :placeholder="$t('risk.pleaseInput')" clearable>
                  <template #append>
                    <span>{{ $t('risk.Yuan') }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" v-if="secondTitle === '同姓名多账号'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">同姓名账号数量></span>
              <el-input v-model="queryParams.ruleJson.count" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
              </el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="24" v-if="secondTitle === $t('risk.sameDeviceManyAccount')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.sameLoginDevice') }}</span>
              <el-form-item prop="ruleJson.count">
                <el-input v-model="queryParams.ruleJson.count" :placeholder="$t('risk.pleaseInput')" clearable>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.sameRegisterIPManyAccount')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson">
              <span class="mr-4">{{ $t('risk.sameIPBeyond') }}</span>
              <el-form-item prop="ruleJson.count">
                <el-input v-model="queryParams.ruleJson.count" :placeholder="$t('risk.pleaseInput')" clearable>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.sameLoginIPManyAccount')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.sameLastLoginIPBeyond') }}</span>
              <el-form-item prop="ruleJson.amount">
                <el-input v-model="queryParams.ruleJson.amount" :placeholder="$t('risk.pleaseInput')" clearable>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.recentlyWithdrawFrequency')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <el-form-item prop="ruleJson.hours">
                <el-input v-model="queryParams.ruleJson.hours" :placeholder="$t('risk.pleaseInput')" clearable>
                  <template #append>
                    <span>{{ $t('risk.hours') }}</span>
                  </template>
                </el-input>
              </el-form-item>
              <span class="ml-8 mr-8">{{ $t('risk.withdrawlSuccessTimes') }}</span>
              <el-form-item prop="ruleJson.successTimes">
                <el-input v-model="queryParams.ruleJson.successTimes" :placeholder="$t('risk.pleaseInput')" clearable>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.rechargeWithdrawTimeTooShort')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.rechargeWithdrawTimeDeviationLess') }}</span>
              <el-form-item prop="ruleJson.hours">
                <el-input v-model="queryParams.ruleJson.hours" :placeholder="$t('risk.pleaseInput')" clearable>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" v-if="secondTitle === $t('risk.bonusAfterFirstWithdraw')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">{{ $t('risk.lastTimeWithdrawSuccessAndGetBonus') }}</span>
              <el-input v-model="queryParams.ruleJson.amount" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
                <template #append>
                  <span>{{ $t('risk.Yuan') }}</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="24" v-if="secondTitle === $t('risk.walletLessZero')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="ruleJson">
              <span>{{ $t('risk.everyTablesWalletsAmountLessZero') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === $t('risk.lastOneRechargeAmountBeyondAverage')">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <el-form-item prop="ruleJson.hours">
                <el-input v-model="queryParams.ruleJson.hours" :placeholder="$t('risk.pleaseInput')" clearable>
                </el-input>
              </el-form-item>
              <span class="ml-8 mr-8">{{ $t('risk.hoursLastOneRechargeAmountBeyond') }}</span>
              <el-form-item prop="ruleJson.recentlyDays">
                <el-input v-model="queryParams.ruleJson.recentlyDays" :placeholder="$t('risk.pleaseInput')" clearable>
                </el-input>
              </el-form-item>
              <span class="ml-20">{{ $t('risk.dayAverageOneTimeRechargeAmount') }}</span>
              <el-form-item prop="ruleJson.averageDepositAmount">
                <el-input class="mb-12" v-model="queryParams.ruleJson.averageDepositAmount" :placeholder="$t('risk.pleaseInput')" clearable style="margin-top:16px;">
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" v-if="secondTitle === '最后一笔充值金额大于最大'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <el-input v-model="queryParams.ruleJson.hours" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
                <template #append>
                  <span>{{ $t('risk.hours') }}</span>
                </template>
              </el-input>
              <span class="ml-20 mr-20">内的最后一笔充值金额＞近</span>
              <el-input v-model="queryParams.ruleJson.recentlyDays" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
                <template #append>
                  <span>日</span>
                </template>
              </el-input>
              <span class="ml-20">单笔最大充值金额</span>
              <el-input v-model="queryParams.ruleJson.largestDepositAmount" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;margin-top:12px;">
                <template #append>
                  <span>%</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === '投注占比变化过大'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <el-input v-model="queryParams.ruleJson.hours" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
                <template #append>
                  <span>{{ $t('risk.hours') }}</span>
                </template>
              </el-input>
              <span class="ml-20 mr-20">内的最后一笔充值后，任一游戏投注占比＞充值前</span>
              <el-input v-model="queryParams.ruleJson.days" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
                <template #append>
                  <span>日</span>
                </template>
              </el-input>
              <span class="ml-20">该游戏占比</span>
              <el-input v-model="queryParams.ruleJson.rates" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;margin-top:12px;">
                <template #append>
                  <span>%</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === '存提现行为异常'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="ruleJson">
              <span>当前提现为USDT且最近一笔存款为</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === 'C2C-存提间隔过短'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">上一笔存款为C2C存款并且本次提款距离最后一次存款时间间隔小于</span>
              <el-input v-model="queryParams.ruleJson.minutes" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
                <template #append>
                  <span>分钟</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === 'C2C-投注倍率过低'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <span class="mr-4">上一笔存款为C2C存款并且提款距离最后一次存款之间的所有有效投注的平均倍率小于</span>
              <el-input v-model="queryParams.ruleJson.rates" :placeholder="$t('risk.pleaseInput')" clearable style="width:30%;">
                <template #append>
                  <span>分钟</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="secondTitle === 'C2C-提/存占比异常'">
            <el-form-item :label="$t('risk.ruleContentQuote')" prop="queryParams.ruleJson" class="full-width">
              <el-col>
                <span class="mr-4">上一笔存款为C2C存款并且本次提款金额占比存款金额为:<span class="pointer">新增</span></span>
              </el-col>
              <el-col :span="12">
                <el-form-item class="full-width">
                  <el-col :span="11">
                    <el-form-item  class="full-width">
                      <span>存款:</span>
                      <el-input v-model="queryParams.ruleJson.minDepositAmount" :placeholder="$t('risk.pleaseInput')" clearable style="width:calc(100% - 32px)">
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <span class="ml-4 mr-4">~</span>
                  <el-col :span="11">
                    <el-form-item class="full-width">
                      <el-input v-model="queryParams.ruleJson.maxDepositAmount" :placeholder="$t('risk.pleaseInput')" clearable class="full-width">
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-col :span="11">
                    <el-form-item  class="full-width">
                      <span>提款占比:</span>
                      <el-input v-model="queryParams.ruleJson.minTransactionRate" :placeholder="$t('risk.pleaseInput')" clearable style="width:calc(100% - 60px)">
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <span class="ml-4 mr-4">~</span>
                  <el-col :span="11">
                    <el-form-item class="full-width">
                      <el-input v-model="queryParams.ruleJson.maxTransactionRate" :placeholder="$t('risk.pleaseInput')" clearable style="width:calc(100% - 32px)">
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                      <span class="ml-4">删除</span>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col> -->
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
          <el-col :span="24">
            <el-form-item :label="$t('risk.priorityQuote')" prop="priority">
              <el-input
                v-model="queryParams.priority"
                :placeholder="$t('risk.pleaseInput')"
                clearable
                maxlength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.attendAutoAuditQuote')" prop="autoAudit">
              <el-radio-group v-model="queryParams.autoAudit" class="ml-4">
                <el-radio :label="0">{{ $t('risk.no') }}</el-radio>
                <el-radio :label="1">{{ $t('risk.yes') }}</el-radio>
              </el-radio-group>
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
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getVIPList } from "@/api/funds/config/index";

const props = defineProps(["open", "secondTitle","cloneRow"]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const rules = ref({
  'ruleJson.amount': [{ pattern: /^(\d*\.)?\d*$/, message: i18n.global.t("risk.pleaseInputNumber"), trigger: 'blur' }],
  'ruleJson.withdrawTimes': [{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.withdrawAmount': [{ pattern: /^(\d*\.)?\d*$/, message: i18n.global.t("risk.pleaseInputNumber"), trigger: 'blur' }],
  'ruleJson.recentlyDepositMultiple': [{ pattern: /^(\d*\.)?\d*$/, message: i18n.global.t("risk.pleaseInputNumber"), trigger: 'blur' }],
  'ruleJson.failDays': [{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.frequency': [{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.withdrawSuccessAmount': [{ pattern: /^(\d*\.)?\d*$/, message: i18n.global.t("risk.pleaseInputNumber"), trigger: 'blur' }],
  'ruleJson.foreignLoginDays': [{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.dispensingTimes': [{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.profitAmount': [{ pattern: /^(\d*\.)?\d*$/, message: i18n.global.t("risk.pleaseInputNumber"), trigger: 'blur' }],
  'ruleJson.firstWithdraw':[{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.historyDepositAmount':[{ pattern: /^(\d*\.)?\d*$/, message: i18n.global.t("risk.pleaseInputNumber"), trigger: 'blur' }],
  'ruleJson.count':[{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  // 'ruleJson.amount':[{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.hours':[{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.successTimes':[{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.recentlyDays':[{ pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  'ruleJson.averageDepositAmount':[{ pattern: /^(\d*\.)?\d*$/, message: i18n.global.t("risk.pleaseInputNumber"), trigger: 'blur' }],
});
const vipLevelList = ref([])

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const queryParams = computed({
  get(){
    return props.cloneRow
  }
})
onMounted(async () => {
  props.secondTitle === i18n.global.t("risk.newMemberLargeWithdrawal") && queryVIP()
});
//查询VIP层级
async function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      emit("onrefresh",queryParams.value);
      cancel()
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.edit-rules-dialog {
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
