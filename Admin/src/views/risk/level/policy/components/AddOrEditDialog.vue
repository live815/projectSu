<template>
  <div class="add-or-edit-policy-dialog">
    <!-- 新增/编辑层级 -->
    <el-dialog
      v-model="dialogVisible"
      width="80%"
      :title="type === 'add' ? $t('risk.addPolicy') : $t('risk.editPolicy')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="top"
        label-width="90px"
        ref="queryRef"
        :rules="rules"
        class="add-edit-form"
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <TitleComp :title="$t('risk.policyBasicSetting')" />
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item :label="$t('risk.policyName')" prop="ployName">
                  <el-input
                    v-model="queryParams.ployName"
                    :placeholder="$t('risk.pleaseInput')"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('risk.levelTypeQuote')" prop="layerType">
                  <el-radio-group v-model="queryParams.layerType" @change="layerTypeChange">
                    <el-radio :label="1">{{ $t('risk.financial') }}</el-radio>
                    <el-radio :label="2">{{ $t('risk.riskControl') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="queryParams.layerType">
                <el-form-item
                  :label="$t('risk.effectLayer')"
                  prop="effectLayerItem"
                  class="full-width"
                >
                  <el-select
                    v-model="queryParams.effectLayerItem"
                    multiple
                    :placeholder="$t('risk.pleaseSelect')"
                    clearable
                    class="full-width"
                    collapse-tags
                    collapse-tags-tooltip
                  >
                    <el-option
                      v-for="dict in levelTypeList"
                      :key="dict.id"
                      :label="dict.layerName"
                      :value="dict.id"
                      :disabled="isDisabled(dict.id,'multiple')"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="queryParams.layerType">
                <el-form-item
                  :label="$t('risk.targetLayer')"
                  prop="targetLayer"
                  class="full-width"
                >
                  <el-select
                    v-model="queryParams.targetLayer"
                    :placeholder="$t('risk.pleaseSelect')"
                    clearable
                    class="full-width"
                  >
                    <el-option
                      v-for="dict in levelTypeList"
                      :key="dict.id"
                      :label="dict.layerName"
                      :value="dict.id"
                      :disabled="isDisabled(dict.id,'single')"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('risk.priorityQuote')" prop="priority">
                  <el-input
                    v-model="queryParams.priority"
                    :placeholder="$t('risk.pleaseInput')"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item :label="$t('risk.vipLevel')" prop="vipLevelItem">
                  <el-checkbox
                    v-model="checkAll"
                    :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange"
                    >{{ $t('risk.all') }}</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="queryParams.vipLevelItem"
                    @change="handleSingleChange"
                  >
                    <el-checkbox
                      v-for="item in vipLevelList"
                      :label="item.vipLevel"
                      :key="item.vipLevel"
                    >
                      {{ item.vipName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('risk.remark')" prop="remark">
                  <el-input
                    type="textarea"
                    v-model="queryParams.remark"
                    maxlength="50"
                    :placeholder="$t('risk.pleaseInput')"
                    show-word-limit
                    :rows="2"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <TitleComp :title="$t('risk.policySelect')" />
            <h3>{{ $t('risk.withdrawRelation') }}</h3>
            <el-row>
              <el-col>
                <el-form-item prop="withdraw">
                  <el-checkbox-group v-model="queryParams.withdraw">
                    <el-checkbox
                      v-for="(item,index) in withdrawList"
                      :label="item.value"
                      :key="item.value"
                      @change="withdrawCheckChange($event,item)"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <h3>{{ $t('risk.rechargeRelation') }}</h3>
            <el-row>
              <el-col>
                <el-form-item prop="recharge">
                  <el-checkbox-group v-model="queryParams.recharge">
                    <el-checkbox
                      v-for="item in rechargeList"
                      :label="item.value"
                      :key="item.value"
                      @change="rechargeCheckChange($event,item)"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <h3>{{ $t('risk.betRelation') }}</h3>
            <el-row>
              <el-col>
                <el-form-item :label="$t('risk.gameType')" prop="gameTypeItem">
                  <el-checkbox
                    v-model="checkAllGame"
                    :indeterminate="isIndeterminateGame"
                    @change="handleCheckAllGameChange"
                    class="game-type-check-all"
                    >{{ $t('risk.all') }}</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="queryParams.gameTypeItem"
                    @change="handleSingleGameChange"
                  >
                    <el-checkbox
                      v-for="item in gameList"
                      :label="item.value"
                      :key="item.value"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item prop="betType" v-if="queryParams.gameTypeItem.length">
                  <el-checkbox-group v-model="queryParams.betType">
                    <el-checkbox
                      v-for="item in betTypeList"
                      :label="item.value"
                      :key="item.value"
                      @change="betTypeCheckChange($event,item)"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <h3>{{ $t('risk.others') }}</h3>
            <el-row>
              <el-col>
                <el-form-item prop="other">
                  <el-checkbox-group v-model="queryParams.other">
                    <el-checkbox
                      v-for="item in otherList"
                      :label="item.value"
                      :key="item.value"
                      @change="otherCheckChange($event,item)"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <h3>{{ $t('risk.agentRelation') }}</h3>
            <el-row>
              <el-col>
                <el-form-item prop="agent">
                  <el-checkbox-group v-model="queryParams.agent">
                    <el-checkbox
                      v-for="item in agentList"
                      :label="item.value"
                      :key="item.value"
                      @change="agentCheckChange($event,item)"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8" style="max-height:1000px;overflow:auto">
            <TitleComp :title="$t('risk.scoreSetting')" />
            <div class="withdrawl" v-if="queryParams.withdrawClassifyItem&&queryParams.withdrawClassifyItem.length">
              <h3>{{ $t('risk.withdrawRelation') }}</h3>
              <el-row :gutter="20">
                <el-col class="flex" v-for="(item,idx) in queryParams.withdrawClassifyItem">
                    <el-col :span="12">
                      <el-form-item 
                      :label="withdrawLabelSwitch(item.classifyCode)" 
                      :prop="'withdrawClassifyItem.'+idx+'.conditionValue'"
                      :rules="(item.classifyCode===9||item.classifyCode===10)?rules.percentValid:rules.amount"
                       class="full-width">
                        <el-input 
                        v-model="item.conditionValue"
                        :placeholder="$t('risk.pleaseInput')" 
                        clearable>
                        <template v-if="item.classifyCode===8" #append>
                              <span>{{ $t('risk.days') }}</span>
                        </template>
                        <template v-if="item.classifyCode===9||item.classifyCode===10" #append>
                              <span>%</span>
                        </template>
                      </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('risk.score')" :prop="'withdrawClassifyItem.'+idx+'.score'" class="full-width" 
                        :rules="rules.score">
                          <el-input v-model="item.score" :placeholder="$t('risk.pleaseInput')" clearable
                          ></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
              </el-row>
            </div>
            <div class="recharge" v-if="queryParams.rechargeClassifyItem&&queryParams.rechargeClassifyItem.length">
              <!-- <TitleComp title="分数设置" /> -->
              <h3>{{ $t('risk.rechargeRelation') }}</h3>
              <el-row :gutter="20">
                <el-col class="flex" v-for="(item,idx) in queryParams.rechargeClassifyItem">
                    <el-col :span="12">
                      <el-form-item 
                      :label="rechargeLabelSwitch(item.classifyCode)" 
                      :prop="'rechargeClassifyItem.'+idx+'.conditionValue'"
                      :rules="(item.classifyCode===8||item.classifyCode===9)?rules.percentValid:rules.amount" 
                      class="full-width">
                        <el-input 
                        v-model="item.conditionValue"
                        :placeholder="$t('risk.pleaseInput')"  
                        clearable>
                        <template v-if="item.classifyCode===8||item.classifyCode===9" #append>
                              <span>%</span>
                        </template>
                      </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('risk.score')" :prop="'rechargeClassifyItem.'+idx+'.score'" class="full-width" 
                        :rules="rules.score">
                          <el-input v-model="item.score" :placeholder="$t('risk.pleaseInput')"  clearable
                          ></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
              </el-row>
            </div>
            <div class="game-type" v-if="queryParams.betClassifyItem&&queryParams.betClassifyItem.length">
              <h3>{{ $t('risk.betRelation') }}</h3>
              <el-row :gutter="20">
                <el-col class="flex" v-for="(item,idx) in queryParams.betClassifyItem">
                    <el-col :span="12">
                      <el-form-item 
                      :label="betTypeLabelSwitch(item.classifyCode)" 
                      :prop="'betClassifyItem.'+idx+'.conditionValue'"
                      :rules="rules.amount"
                       class="full-width">
                        <el-input 
                        v-model="item.conditionValue"
                        :placeholder="$t('risk.pleaseInput')"  
                        clearable>
                          <template v-if="item.classifyCode===5" #append>
                              <span>{{ $t('risk.days') }}</span>
                          </template>
                      </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('risk.score')" :prop="'betClassifyItem.'+idx+'.score'" class="full-width"
                        :rules="rules.score">
                          <el-input v-model="item.score" :placeholder="$t('risk.pleaseInput')"  clearable>
                          </el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
              </el-row>
            </div>
            <div class="other" v-if="queryParams.otherClassifyItem&&queryParams.otherClassifyItem.length">
              <h3>{{ $t('risk.others') }}</h3>
              <el-row :gutter="20">
                <el-col class="flex" v-for="(item,idx) in queryParams.otherClassifyItem">
                    <el-col :span="12">
                      <el-form-item 
                      :label="otherLabelSwitch(item.classifyCode)" 
                      :prop="'otherClassifyItem.'+idx+'.conditionValue'"
                      :rules="item.classifyCode===5?rules.percentValid:rules.amount" 
                      class="full-width">
                        <el-input 
                        v-model="item.conditionValue"
                        :placeholder="$t('risk.pleaseInput')"  
                        clearable>
                          <template v-if="item.classifyCode===1||item.classifyCode===2" #append>
                              <span>h</span>
                          </template>
                          <template v-if="item.classifyCode===3||item.classifyCode===4" #append>
                              <span>{{ $t('risk.days') }}</span>
                          </template>
                          <template v-if="item.classifyCode===5" #append>
                              <span>%</span>
                          </template>
                      </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('risk.score')" :prop="'otherClassifyItem.'+idx+'.score'" class="full-width"
                        :rules="rules.score">
                          <el-input v-model="item.score" :placeholder="$t('risk.pleaseInput')"  clearable
                          ></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
              </el-row>
            </div>
            <div class="agent" v-if="queryParams.agentClassifyItem&&queryParams.agentClassifyItem.length">
              <h3>{{ $t('risk.agentRelation') }}</h3>
              <el-row :gutter="20">
                <el-col class="flex" v-for="(item,idx) in queryParams.agentClassifyItem">
                    <el-col :span="12">
                      <el-form-item 
                      :label="agentLabelSwitch(item.classifyCode)" 
                      :prop="'agentClassifyItem.'+idx+'.conditionValue'"
                      :rules="item.classifyCode===1?rules.agentRule:rules.amount" 
                      class="full-width">
                      <el-select
                        v-model="item.conditionValue"
                        multiple
                        filterable
                        :placeholder="$t('risk.pleaseSelect')"
                        clearable
                        class="full-width"
                        collapse-tags
                        collapse-tags-tooltip
                      >
                        <el-option
                          v-for="dict in agentNameList"
                          :key="dict.id"
                          :label="dict.agentUsername"
                          :value="dict.id"
                        />
                      </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('risk.score')" :prop="'agentClassifyItem.'+idx+'.score'" class="full-width"
                        :rules="rules.score">
                          <el-input v-model="item.score" :placeholder="$t('risk.pleaseInput')"  clearable
                          ></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
              </el-row>
            </div>
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
import { deepClone } from "@/utils/index";
import TitleComp from "./TitleComp.vue";
import { getVIPList } from "@/api/funds/config/index";
import { getRiskPloyInfo,addRiskPloy,editRiskPloy } from "@/api/risk/level/index";
import { getDicts } from "@/api/system/dict/data";
import { getRiskFinancalList,agentSearch } from "@/api/risk/level/index";

const props = defineProps(["open", "type","id","levelTypeList"]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  ployName: null, //策略名称
  layerType:null, //部门
  effectLayerItem: [], //作用层级
  targetLayer: null, // 目标层级
  priority: null, // 优先级
  vipLevelItem: [], // VIP等级
  remark: null, // 备注
  withdraw: [], //策略选择-提现相关
  recharge: [], //策略选择-充值相关
  gameTypeItem: [],  //策略选择-游戏类型
  betType:[], //策略选择-游戏类型多选
  other: [], //策略选择-其它
  agent:[], //策略选择-代理相关
  withdrawClassifyItem:[],
  rechargeClassifyItem:[],
  betClassifyItem:[],
  otherClassifyItem:[],
  agentClassifyItem:[], //策略选择-代理相关右侧
});
const queryRef = ref(null);
const rules = ref({
  ployName: [{ required: true, message: i18n.global.t("risk.pleaseInputPolicyName"), trigger: "blur" }],
  layerType: [{ required: true, message: i18n.global.t("risk.pleaseSelectLevelType"), trigger: "change" }],
  effectLayerItem: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("risk.pleaseSelectEffectLay"),
      trigger: "change",
    },
  ],
  targetLayer: [
    {
      required: true,
      message: i18n.global.t("risk.pleaseSelectTargetLay"),
      trigger: "change",
    },
  ],
  vipLevelItem: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("risk.pleaseSelectVIPLevel"),
      trigger: "change",
    },
  ],
  percentValid:[
    { required: true, message: i18n.global.t("risk.pleaseInputPercent"), trigger: "blur" },
    {pattern:/^([1-9]|[1-9][0-9]|100)$/,message:"请输入1~100的整数", trigger: "blur"}
  ],
  score:[
    { required: true, message: i18n.global.t("risk.pleaseInputScore"), trigger: "blur" },
    {pattern:/^([1-9]|[1-9][0-9]|100)$/,message:"请输入1~100之间的整数", trigger: "blur"}
  ],
  amount:[
    { required: true, message: i18n.global.t("risk.pleaseInputConditionValue"), trigger: "blur" },
    {pattern:/^[1-9]\d{0,8}$/,message:"请输入1~999999999之间的整数", trigger: "blur"}
  ],
  agentRule: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("risk.pleaseSelectAgentName"),
      trigger: "blur",
    },
  ]
});
const checkAll = ref(false); //vip多选
const checkAllGame = ref(false); //游戏类型多选
const isIndeterminate = ref(true);
const isIndeterminateGame = ref(true);

const levelTypeList = ref([]);
const vipLevelList = ref([]);
const gameList = ref([
  // {
  //   label: i18n.global.t("risk.real"),
  //   value: 1,
  // },
  // {
  //   label: i18n.global.t("risk.sport"),
  //   value: 2,
  // },
  // {
  //   label: i18n.global.t("risk.card"),
  //   value: 3,
  // },
  // {
  //   label: i18n.global.t("risk.electric"),
  //   value: 4,
  // },
  // {
  //   label: i18n.global.t("risk.competion"),
  //   value: 5,
  // },
  // {
  //   label: i18n.global.t("risk.lottery"),
  //   value: 6,
  // },
  // {
  //   label: i18n.global.t("risk.fish"),
  //   value: 7,
  // }
]);
const withdrawList = ref([
  {
    label:i18n.global.t("risk.todayTotalWithdrawAmount"),
    value:1
  },
  {
    label:i18n.global.t("risk.todayFirstWithdrawAmount"),
    value:2
  },
  {
    label:i18n.global.t("risk.firstWithdrawAmount"),
    value:3
  },
  {
    label:i18n.global.t("risk.sevenDaysWinAmount"),
    value:4
  },
  {
    label:i18n.global.t("risk.manyTimesWithdrawFail"),
    value:5
  },
  {
    label:i18n.global.t("risk.toalWithdrawTimes"),
    value:6
  },
  {
    label:i18n.global.t("risk.toalWithdrawAmount"),
    value:7
  },
  {
    label:i18n.global.t("risk.noWithdrawTime"),
    value:8
  },
  {
    label:i18n.global.t("risk.bankCardWithdrawAmountPercent"),
    value:9
  },
  {
    label:i18n.global.t("risk.usdtWithdrawAmountPercent"),
    value:10
  }
])
const rechargeList = ref([
  {
    label:i18n.global.t("risk.todayTotalRechargeAmount"),
    value:1
  },
  {
    label:i18n.global.t("risk.todayFirstRecharge"),
    value:2
  },
  {
    label:i18n.global.t("risk.firstRecharge"),
    value:3
  },
  {
    label:i18n.global.t("risk.sevenDayTotalRechargeAmount"),
    value:4
  },
  {
    label:i18n.global.t("risk.totalRechargeTimes"),
    value:5
  },
  {
    label:i18n.global.t("risk.totalRechargeAmount"),
    value:6
  },
  {
    label:i18n.global.t("risk.noRechargeTime"),
    value:7
  },
  {
    label:i18n.global.t("risk.bankCardRechargeAmountPercent"),
    value:8
  },
  {
    label:i18n.global.t("risk.usdtRechargeAmountPercent"),
    value:9
  },
  {
    label:i18n.global.t("risk.totalRechargeFailTimes"),
    value:10
  }
])
const betTypeList = ref([
  {
    label:i18n.global.t("risk.todayTotalBetAmount"),
    value:1
  },
  {
    label:i18n.global.t("risk.sevenDayTotalBetAmount"),
    value:2
  },
  {
    label:i18n.global.t("risk.todayPlayerWinLose"),
    value:3
  },
  {
    label:i18n.global.t("risk.sevenDayPlayerWinLose"),
    value:4
  },
  {
    label:i18n.global.t("risk.noBetTime"),
    value:5
  }
])
const otherList = ref([
  {
    label:i18n.global.t("risk.sameIPManyAccount"),
    value:1
  },
  {
    label:i18n.global.t("risk.sameDeviceManyAccount"),
    value:2
  },
  {
    label:i18n.global.t("risk.registerTime"),
    value:3
  },
  {
    label:i18n.global.t("risk.noLoginTime"),
    value:4
  },
  {
    label:i18n.global.t("risk.getDiscountsTooMuch"),
    value:5
  }
])
const agentList = ref([
  {
    label:i18n.global.t("risk.designatedAgent"),
    value:1
  }
])
const agentNameList = ref([])

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});


onMounted(async ()=>{
  await queryVIP();
  await queryGameList();
  await queryAgentList();
if(props.type==='edit'){
  await queryInfo()
  //回显全选按钮是否打开或关闭
  handleSingleChange(queryParams.value.vipLevelItem)
  handleSingleGameChange(queryParams.value.gameTypeItem)
  queryParams.value.layerType && getRiskFinancalList(queryParams.value.layerType).then(res=>{
    levelTypeList.value = res || []
  })
}
})
function queryAgentList(){
  return agentSearch({
    agentName:""
  }).then(res=>{
    agentNameList.value  = res || [];
  })
}
async function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
function queryGameList(){
 return getDicts("sys_risk_game_type").then(res=>{
  res && res.forEach(item=>{
      item.value = item.dictValue
      item.label = item.dictLabel
  })
  gameList.value = res 
 })
}
function queryInfo(){
  return getRiskPloyInfo(props.id).then(res=>{
    queryParams.value = res || {}
    queryParams.value.agentClassifyItem && queryParams.value.agentClassifyItem.forEach(item=>{
      item.conditionValue = item.conditionValue.split(',')
    })
    // queryParams.value.withdraw = queryParams.value.withdrawClassifyItem.map(item=>item.classifyCode)
    queryParams.value.withdraw = filterCheckedList(queryParams.value.withdrawClassifyItem)
    // queryParams.value.recharge = queryParams.value.rechargeClassifyItem.map(item=>item.classifyCode)
    queryParams.value.recharge = filterCheckedList(queryParams.value.rechargeClassifyItem)
    // queryParams.value.betType = queryParams.value.betClassifyItem.map(item=>item.classifyCode)
    queryParams.value.betType = filterCheckedList(queryParams.value.betClassifyItem)
    // queryParams.value.other = queryParams.value.otherClassifyItem.map(item=>item.classifyCode)
    queryParams.value.other = filterCheckedList(queryParams.value.otherClassifyItem)
    // queryParams.value.vipLevelItem = queryParams.value.vipLevelItem.map(item=>Number(item))
    queryParams.value.agent = filterCheckedList(queryParams.value.agentClassifyItem)
    queryParams.value.vipLevelItem = listItemToNumber(queryParams.value.vipLevelItem)
    // queryParams.value.effectLayerItem = queryParams.value.effectLayerItem.map(item=>Number(item))
    queryParams.value.effectLayerItem = listItemToNumber(queryParams.value.effectLayerItem)
    // queryParams.value.targetLayer = queryParams.value.targetLayer.map(item=>Number(item))
    // queryParams.value.targetLayer = listItemToNumber(queryParams.value.targetLayer)
    // queryParams.value.gameTypeItem = queryParams.value.gameTypeItem.map(item=>Number(item))
    // queryParams.value.gameTypeItem = listItemToNumber(queryParams.value.gameTypeItem)
  })
}
function filterCheckedList(list){
  if(list&&list.length===0) return list 
  if(list===null||list===undefined) return []
  return list.map(item=>item.classifyCode)
}
function listItemToNumber(list){
  if(list&&list.length===0) return list 
  if(list===null||list===undefined) return []
  return list.map(item=>Number(item))
}
function handleCheckAllChange(val) {
  queryParams.value.vipLevelItem = val
    ? vipLevelList.value.map((item) => item.vipLevel)
    : [];
  isIndeterminate.value = false;
}
//打开编辑时弹窗，拿到数据之后，先调用此方法去回显多选项
function handleSingleChange(value) {
  const checkedVip = value.length;
  checkAll.value = checkedVip === vipLevelList.value.length;
  isIndeterminate.value =
    checkedVip > 0 && checkedVip < vipLevelList.value.length;
}
function handleCheckAllGameChange(val) {
  queryParams.value.gameTypeItem = val ? gameList.value.map((item) => item.value) : [];
  isIndeterminateGame.value = false;
  (!val) && clearGameBetAction()
}
//打开编辑时弹窗，拿到数据之后，先调用此方法去回显多选项
function handleSingleGameChange(value) {
  const checkedGame = value.length;
  checkAllGame.value = checkedGame === gameList.value.length;
  isIndeterminateGame.value =
    checkedGame > 0 && checkedGame < gameList.value.length;
  
  (!checkedGame) && clearGameBetAction()
}
//清除游戏相关的多选以及右侧的分数和条件值
function clearGameBetAction(){
  queryParams.value.betType = [];
  queryParams.value.betClassifyItem = [];
}
function withdrawCheckChange(val,item){
  let idx = queryParams.value.withdrawClassifyItem.findIndex(
    (itm) => itm.classifyCode === item.value
  );
  if(val){
    queryParams.value.withdrawClassifyItem.push({
      classifyCode:item.value,
      conditionValue:null,
      score:null
    })
    queryParams.value.withdrawClassifyItem.sort((a,b)=>a.classifyCode-b.classifyCode)
  }else{
    queryParams.value.withdrawClassifyItem.splice(idx,1)
  }
}
function withdrawLabelSwitch(type){
  switch (type) {
    case 1:
      return i18n.global.t("risk.todayTotalWithdrawAmountBeyond"); // 1
    case 2:
      return i18n.global.t("risk.todayFirstWithdrawAmountBeyond"); // 如果状态为1，排序顺序3
    case 3:
      return i18n.global.t("risk.firstWithdrawAmountBeyond"); // 如果状态为2，排序顺序5
    case 4:
      return i18n.global.t("risk.sevenDaysWinAmountBeyond"); // 如果状态为3，排序顺序7
    case 5:
      return i18n.global.t("risk.manyTimesWithdrawFailBeyond"); // 如果状态为4，排序顺序2
    case 6:
      return i18n.global.t("risk.toalWithdrawTimesBeyond"); // 如果状态为5，排序顺序4
    case 7:
      return i18n.global.t("risk.toalWithdrawAmountBeyond"); // 如果状态为6，排序顺序6
    case 8:
      return i18n.global.t("risk.noWithdrawTimeBeyond"); // 如果状态为7，排序顺序8
    case 9:
      return i18n.global.t("risk.bankCardWithdrawAmountPercentBeyond"); // 如果状态为7，排序顺序8
    case 10:
      return i18n.global.t("risk.usdtWithdrawAmountPercentBeyond"); // 如果状态为7，排序顺序8
    default:
      return ""; // 默认情况下，应用黑色字体的class
  }
}
function rechargeCheckChange(val,item){
  let idx = queryParams.value.rechargeClassifyItem.findIndex(
    (itm) => itm.classifyCode === item.value
  );
  if(val){
    queryParams.value.rechargeClassifyItem.push({
      classifyCode:item.value,
      conditionValue:null,
      score:null
    })
    queryParams.value.rechargeClassifyItem.sort((a,b)=>a.classifyCode-b.classifyCode)
  }else{
    queryParams.value.rechargeClassifyItem.splice(idx,1)
  }
}
function rechargeLabelSwitch(type){
  switch (type) {
    case 1:
      return i18n.global.t("risk.todayTotalRechargeAmountBeyond"); // 1
    case 2:
      return i18n.global.t("risk.todayFirstRechargeBeyond"); 
    case 3:
      return i18n.global.t("risk.firstRechargeBeyond"); 
    case 4:
      return i18n.global.t("risk.sevenDayTotalRechargeAmountBeyond"); 
    case 5:
      return i18n.global.t("risk.totalRechargeTimesBeyond"); 
    case 6:
      return i18n.global.t("risk.totalRechargeAmountBeyond"); 
    case 7:
      return i18n.global.t("risk.noRechargeTimeBeyond"); 
    case 8:
      return i18n.global.t("risk.bankCardRechargeAmountPercentBeyond"); 
    case 9:
      return i18n.global.t("risk.usdtRechargeAmountPercentBeyond"); 
    case 10:
      return i18n.global.t("risk.oneDayRechargeFailTimes"); 
    default:
      return ""; 
  }
}
function betTypeCheckChange(val,item){
  let idx = queryParams.value.betClassifyItem.findIndex(
    (itm) => itm.classifyCode === item.value
  );
  if(val){
    queryParams.value.betClassifyItem.push({
      classifyCode:item.value,
      conditionValue:null,
      score:null
    })
    queryParams.value.betClassifyItem.sort((a,b)=>a.classifyCode-b.classifyCode)
  }else{
    queryParams.value.betClassifyItem.splice(idx,1)
  }
}
function betTypeLabelSwitch(classifyCode){
  switch (classifyCode) {
    case 1:
      return i18n.global.t("risk.todayTotalBetAmountBeyond"); // 1
    case 2:
      return i18n.global.t("risk.sevenDayTotalBetAmountBeyond"); 
    case 3:
      return i18n.global.t("risk.todayPlayerWinLoseBeyond"); 
    case 4:
      return i18n.global.t("risk.sevenDayPlayerWinLoseBeyond"); 
    case 5:
      return i18n.global.t("risk.noBetTimeBeyond"); 
    default:
      return ""; 
  }
}
function otherCheckChange(val,item){
  let idx = queryParams.value.otherClassifyItem.findIndex(
    (itm) => itm.classifyCode === item.value
  );
  if(val){
    queryParams.value.otherClassifyItem.push({
      classifyCode:item.value,
      conditionValue:null,
      score:null
    })
    queryParams.value.otherClassifyItem.sort((a,b)=>a.classifyCode-b.classifyCode)
  }else{
    queryParams.value.otherClassifyItem.splice(idx,1)
  }
}
function agentCheckChange(val,item){
  let idx = queryParams.value.agentClassifyItem.findIndex(
    (itm) => itm.classifyCode === item.value
  );
  if(val){
    queryParams.value.agentClassifyItem.push({
      classifyCode:item.value,
      conditionValue:null,
      score:null
    })
    queryParams.value.agentClassifyItem.sort((a,b)=>a.classifyCode-b.classifyCode)
  }else{
    queryParams.value.agentClassifyItem.splice(idx,1)
  }
}
function otherLabelSwitch(classifyCode){
  switch (classifyCode) {
    case 1:
      return i18n.global.t("risk.sameIPManyAccountBeyond"); // 1
    case 2:
      return i18n.global.t("risk.sameDeviceManyAccountBeyond"); 
    case 3:
      return i18n.global.t("risk.registerTimeBeyond"); 
    case 4:
      return i18n.global.t("risk.noLoginTimeBeyond"); 
    case 5:
      return i18n.global.t("risk.getDiscountsTooMuchBeyond"); 
    default:
      return ""; 
  }
}
function agentLabelSwitch(classifyCode){
  switch (classifyCode) {
    case 1:
      return i18n.global.t("risk.agentName"); // 1
    case 2:
      return i18n.global.t("risk.sameDeviceManyAccountBeyond"); 
    case 3:
      return i18n.global.t("risk.registerTimeBeyond"); 
    case 4:
      return i18n.global.t("risk.noLoginTimeBeyond"); 
    case 5:
      return i18n.global.t("risk.getDiscountsTooMuchBeyond"); 
    default:
      return ""; 
  }
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      const params = deepClone(queryParams.value)
      params.agent.includes(1) && params.agentClassifyItem.forEach(item=>{
        item.conditionValue = item.conditionValue.join();
      })
      if(props.type === 'edit'){
        editRiskPloy(params).then(res=>{
          emit("onrefresh");
          proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"));

          dialogVisible.value = false;

        })
      }else{
        addRiskPloy(params).then(res=>{
          emit("onrefresh");
          proxy.$modal.msgSuccess(i18n.global.t("risk.addSuccessfully"));

          dialogVisible.value = false;
        })
      }
    } else {
      return;
    }
  });
}
function layerTypeChange(val){
  queryParams.value.effectLayerItem = [];
  queryParams.value.targetLayer = null;
  return getRiskFinancalList(val).then(res=>{
    levelTypeList.value = res || []
  })
}
function isDisabled(value,type){
  if(type === 'single'){
    return queryParams.value.effectLayerItem.includes(value)
  }else{
    return queryParams.value.targetLayer === value
  }
}
</script>

<style lang="scss" scoped>
.add-or-edit-policy-dialog {
  h3{
    margin:0 0 10px;
    // padding-left:5px;
    color:#555555;
    font-size:14px;
    font-weight:600;
  }
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding: 0 20px;
    }
    .el-dialog__footer{
      text-align:center;
    }
    .el-form-item__label{
      color:#555555;
      font-weight:400;
    }
  }
  .flex{
    display:flex;
  }
  .game-type-check-all{
    margin-right:30px;
  }
}
</style>
