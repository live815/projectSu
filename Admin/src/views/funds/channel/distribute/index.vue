<template>
  <div class="funds-channel-distribute-index">
    <div style="text-align: right">
      <el-button type="primary" @click="addRecord" v-hasPermi="['fund:dp-way-assign:add']">{{ $t('funds.add') }}</el-button>
    </div>
    <div class="content">
      <div class="left">
        <div class="left-header">
          <span class="bar-chart"></span>
          <span class="title">{{ $t('funds.channelDistribute') }}</span>
        </div>
        <div class="left-content">
          <el-form
            v-for="(formData, index) in formList"
            :key="index"
            :model="formData"
            ref="form"
            :rules="rules"
            label-width="80px"
            @click="setCurrentIndex(index)"
            :class="{ active: currentIndex === index }"
            class="form-data"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('funds.distributeName')" prop="assignName">
                  <el-input
                    v-model="formData.assignName"
                    clearable
                    :placeholder="$t('funds.pleaseInput')"
                    :disabled="formData.isEdit"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="text-align: right">
                <el-button
                  type="primary"
                  v-hasPermi="['fund:dp-way-assign:edit']"
                  size="small"
                  @click="editItem(index)"
                  v-if="formData.isEdit"
                  >{{ $t('funds.edit') }}</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  @click="cancelItem(index)"
                  v-if="!formData.isEdit"
                  >{{ $t('funds.cancel') }}</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  @click="saveItem(index)"
                  v-if="!formData.isEdit"
                  >{{ $t('funds.save') }}</el-button
                >
                <el-button
                  type="danger"
                  v-hasPermi="['fund:dp-way-assign:remove']"
                  size="small"
                  @click="deleteItem(index)"
                  >{{ $t('funds.delete') }}</el-button
                >
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  :label="$t('funds.financialTier')"
                  prop="financeTierName"
                  class="full-width"
                >
                  <el-select
                    v-model="formData.financeTierName"
                    :placeholder="$t('funds.pleaseSelect')"
                    clearable
                    multiple
                    class="full-width"
                    :disabled="formData.isEdit"
                  >
                    <el-option
                      v-for="dict in financeLevelList"
                      :key="dict.id"
                      :label="dict.layerName"
                      :value="dict.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  :label="$t('funds.vipLevelNoQuote')"
                  prop="vipLevelName"
                  class="full-width"
                >
                  <el-select
                    v-model="formData.vipLevelName"
                    :placeholder="$t('funds.pleaseSelect')"
                    clearable
                    multiple
                    class="full-width"
                    :disabled="formData.isEdit"
                  >
                    <el-option
                      v-for="dict in vipLevelList"
                      :key="dict.vipLevel"
                      :label="dict.vipName"
                      :value="dict.vipLevel"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  :label="$t('funds.depositChannel')"
                  prop="dpChannelConfigs"
                  class="fill-width"
                >
                  <el-row
                    v-for="(item, leftIndex) in formData.dpChannelConfigs"
                    :key="leftIndex"
                    style="width: 100%"
                  >
                    <el-col :span="12">
                      <h3
                        class="channel-name"
                        v-if="
                          item.depositChannelList &&
                          item.depositChannelList.length
                        "
                      >
                        {{ item.channelTypeName }}
                      </h3>
                      <div class="bottom" v-if="item.depositChannelList.length">
                        <div
                          v-for="(child, childIndex) in item.depositChannelList"
                          style="white-space: nowrap"
                        >
                          <img
                            :src="getImgUrl(item.icon)"
                            alt=""
                            style="width: 80px; height: 80px"
                          />
                          <p style="margin: 0; line-height: 18px">
                            <span>{{$t('funds.storeName')}}</span>
                            <span>{{ child.mchName }}</span>
                          </p>
                          <p style="margin: 0; line-height: 18px">
                            <span>{{$t('funds.channelLimitAmount')}}</span>
                            <span>{{ child.minPay }}~{{ child.maxPay }}</span>
                          </p>
                          <p
                            style="
                              margin: 0;
                              padding-bottom: 10px;
                              line-height: 18px;
                            "
                          >
                            <span>{{$t('funds.channelWeights')}}</span>
                            <span>{{ child.weights }}</span>
                          </p>
                        </div>
                      </div>
                    </el-col>
                    <el-col
                      :span="12"
                      v-if="
                        item.channelTypeName &&
                        item.depositChannelList &&
                        item.depositChannelList.length
                      "
                    >
                      <el-col>
                        <el-form-item :label="$t('funds.quickAmount')"
                        :prop="'dpChannelConfigs.' + leftIndex + '.quickAmountName'"
                        :rules="rules.quickAmountName">
                          <el-select
                            v-model="item.quickAmountName"
                            :placeholder="$t('funds.pleaseSelect')"
                            clearable
                            multiple
                            class="full-width"
                            :disabled="formData.isEdit"
                          >
                            <el-option
                              v-for="dict in fund_quick_amount"
                              :key="dict.value"
                              :label="dict.label"
                              :value="dict.value"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col style="margin: 12px 0;">
                        <el-form-item :label="$t('funds.inputByHand')"
                        :prop="'dpChannelConfigs.' + leftIndex + '.isCustomizeInput'">
                          <el-switch
                            v-model="item.isCustomizeInput"
                            active-value="1"
                            inactive-value="0"
                            :disabled="formData.isEdit"
                          ></el-switch>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item :label="$t('funds.inputLimitAmount')" class="full-width">
                          <el-col :span="11">
                          <el-form-item
                          :key="item.isCustomizeInput" 
                          :prop="'dpChannelConfigs.' + leftIndex + '.minPayAmount'"
                          :rules="item.isCustomizeInput==='1'?rules.minPayAmount:[]"
                          class="full-width">
                            <el-input
                              v-model="item.minPayAmount"
                              clearable
                              :placeholder="$t('funds.pleaseInput')"
                              :disabled="formData.isEdit"
                              maxlength="18"
                              style="width: 100%"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2" style="text-align: center;">~</el-col>
                        <el-col :span="11">
                          <el-form-item
                            label=""
                            :key="item.isCustomizeInput" 
                            :prop="'dpChannelConfigs.' + leftIndex + '.maxPayAmount'"
                            :rules="item.isCustomizeInput==='1'?rules.maxPayAmount:[]"
                            class="full-width"
                          >
                            <el-input
                              v-model="item.maxPayAmount"
                              clearable
                              :placeholder="$t('funds.pleaseInput')"
                              :disabled="formData.isEdit"
                              maxlength="18"
                              style="width: 100%"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="right">
        <div class="right-header">
          <span class="bar-chart"></span>
          <span class="title">{{$t('funds.depositChannelNoQuote')}}</span>
        </div>
        <div class="right-content">
          <el-checkbox-group v-model="selectedImages">
            <div v-for="(item, index) in depositList" :key="index">
              <div class="title">{{ item.channelTypeName }}</div>
              <div class="bottom">
                <div v-for="(child, childIndex) in item.depositChannelList">
                  <img :src="getImgUrl(item.icon)" alt="" style="width: 80px; height: 80px" v-if="item.icon" />
                  <div v-else style="display:inline-block;width: 80px; height: 80px;text-align: center;line-height: 80px;border:1px solid gray;">暂无图片</div>
                  <el-checkbox
                    :label="child.mchChannelId"
                    @change="
                      toggleCheckbox($event, item, child, childIndex, index)
                    "
                    :disabled="
                      (formList && !formList.length) ||
                      formList[currentIndex]?.isEdit||child.status==='1'
                    "
                  >
                    <!-- {{ child.storeName }} -->
                  </el-checkbox>
                  <p style="height: 8px">
                    <span>{{$t('funds.storeName')}}</span>
                    <span>{{ child.mchName }}</span>
                  </p>
                  <p style="height: 8px">
                    <span>{{$t('funds.channelLimitAmount')}}</span>
                    <span>{{ child.minPay }}~{{ child.maxPay }}</span>
                  </p>
                  <p style="height: 8px">
                    <span>{{$t('funds.channelWeights')}}</span>
                    <span>{{ child.weights }}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Deposit-distribute">
import i18n from "@/i18n";
import {
  getDepositList,
  getDpWayAssignList,
  getDpWayAssignAdd,
  getDpWayAssignEdit,
  getDpWayAssignDelete,
} from "@/api/funds/channel/index";
import { getVIPList } from "@/api/funds/config/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { getCurrentInstance, onMounted } from "vue";
import { getImgUrl,deepCopy } from "@/utils";

const { proxy } = getCurrentInstance();
const { fund_quick_amount } = proxy.useDict("fund_quick_amount");
const selectedImages = ref([]);
const form = ref(null);
const formList = ref([]);
const formListClone = ref([]);
const rules = ref({
  financeTierName: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("funds.financialTierCannotEmpty"),
      trigger: "change",
    },
  ],
  vipLevelName: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("funds.VIPLevelCannotEmpty"),
      trigger: "change",
    },
  ],
  quickAmountName: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("funds.quickAmountCannotEmpty"),
      trigger: "submit",
    },
  ],
  minPayAmount: [{ required: true,validator: validateMinMaxValue,trigger:'blur' }],
  maxPayAmount: [{ required: true,validator: validateMinMaxValue,trigger:'blur' }],
});
const financeLevelList = ref([]);
const vipLevelList = ref([]);
const depositList = ref([]);
const currentIndex = ref(0);

onMounted(async () => {
  await queryDepositList();
  await getList();
  await queryTier();
  await queryVIP();
});
//查询页面右侧的所有入款通道列表
async function queryDepositList() {
  return getDepositList().then((res) => {
    depositList.value = res || [];
  });
}
//查询VIP层级
async function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
//查询财务层级
async function queryTier() {
  return getRiskFinancalList(1).then((res) => {
    financeLevelList.value = res || [];
  });
}
//查询左侧数据
async function getList() {
  //此处需要注意，如果查询返回的结果里没有selected字段，需要自己遍历生成该字段selected，然后选中
  //索引值的时候将右侧的数据回显为当前currentIndex的selected值
  return getDpWayAssignList().then((res) => {
    console.log(res);
    formList.value = res || [];
    formList.value.forEach(item=>{
      item.vipLevelName = item.vipLevel.split(',').map(item=>Number(item))
      item.financeTierName = item.financeTier.split(',').map(item=>Number(item))
      item.dpChannelConfigs.forEach(itm=>{
        itm.quickAmountName = itm.quickAmount.split(',')
      })
      //查询数据之后将每一条数据dpChannelConfigs里插入右侧对应的商户，如果当前这条数据里有该通道返回本身，没有则插入通道占位
      // item.dpChannelConfigs = initPushData(item.dpChannelConfigs)
      //查询数据之后将左边每条数据里的通道抽取成一个数组集合，去回显右边的选中状态
      item.selected = item.dpChannelConfigs.map(item=>item.depositChannelList).flat().map(item=>item.mchChannelId)
      item.isEdit = true
    })
    formListClone.value = deepCopy(formList.value);
    formList.value&&formList.value.length&&setCurrentIndex(0)
  });
}

function setCurrentIndex(index) {
  currentIndex.value = index;
  // console.log(formList.value[currentIndex.value].selected, 11111);
  selectedImages.value = formList.value[currentIndex.value]?.selected || [];
}
function addRecord() {
  const lastIndex = formList.value.length - 1;
  if (lastIndex >= 0) {
    form.value[lastIndex].validate((valid) => {
      if (!valid) {
        setCurrentIndex(lastIndex)
        return; // 上一个表单数据未填写完毕，不允许新增
      }
      if (!formList.value[lastIndex].assignId) {
        return; //请先保存上一条
      }
      // 上一个表单数据已填写完毕，可以新增
      formList.value.push({
        // isEdit: false,
        selected:[],
        assignName: null,
        financeTier: null,
        financeTierName:[],
        vipLevel:null,
        vipLevelName: [],
        dpChannelConfigs: pushData()
      });
      selectedImages.value = [];
    });
  } else {
    // 第一个表单数据
    formList.value.push({
      // isEdit: false,
      selected:[],
      assignName: null,
      financeTier: null,
      financeTierName:[],
      vipLevel:null,
      vipLevelName: [],
      dpChannelConfigs: pushData()
    });
  }
  setCurrentIndex(lastIndex>=0?lastIndex+1:0)
  scrollToBottom()
}
// 新增的时候回到底部
function scrollToBottom() {
  // 获取页面内容的高度
  setTimeout(()=>{
    const pageHeight = document.querySelector('.left').scrollHeight;
  
  // 滚动到底部，滚动位置设置为页面内容的底部
  document.querySelector('.left').scrollTo({
    top: pageHeight,
    behavior: 'smooth' // 添加平滑滚动效果
  })
  },0);
}
function editItem(index) {
  formList.value[index].isEdit = false;
}
function cancelItem(index) {
  // form.value[index].clearValidate()
  // form.value[index].resetFields();
  formList.value[index].isEdit = true;
  if(formList.value[index].assignId){
      formList.value[index] = deepCopy(formListClone.value)[index]
      form.value[index].resetFields()
  }else{
      form.value[index].resetFields();
      selectedImages.value = []
      formList.value[index] = {
        selected:[],
        assignName: null,
        financeTier: null,
        financeTierName:[],
        vipLevel:null,
        vipLevelName: [],
        dpChannelConfigs: pushData()
      }
  }
}
function saveItem(index) {
  form.value[index].validate((valid) => {
    if (valid) {
        let obj = JSON.parse(JSON.stringify(formList.value[index] || {}))
        obj.vipLevel = obj.vipLevelName.join(',')
        obj.financeTier = obj.financeTierName.join(',')
        //提交数据之前先处理成后端需要的数据结构
        obj.dpChannelConfigs = forMerceData(obj.dpChannelConfigs)
        console.log(obj)
      if (obj.assignId) {
        getDpWayAssignEdit(obj).then((res) => {
          getList();
          proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
        });
      } else {
        getDpWayAssignAdd(obj).then((res) => {
          getList();
          proxy.$modal.msgSuccess(i18n.global.t("funds.addedSuccessfully"));
        });
      }
    } else {
      return;
    }
  });
}
function deleteItem(index) {
  proxy.$modal.confirm(i18n.global.t("funds.areYouSureToDeleteData")).then(() => {
  if(formList.value[index].assignId){
    getDpWayAssignDelete(formList.value[index].assignId).then(()=>{
      proxy.$modal.msgSuccess(i18n.global.t("funds.deleteSuccessfully"))
      getList()
    })
  }else{
    //没有保存之前的删除，即本地删除，则重置选中项为第一条
    form.value[index].clearValidate()
    formList.value.splice(index, 1);
    setCurrentIndex(0)
  }
  }).catch(()=>{})
}
//右侧勾选项，当前左侧的通道列表和右侧的通道列表根据channelTypeId去匹配，如果没有就push通道。有通道则判断商户
function toggleCheckbox(val, item, child, childIndex, index) {
  let leftChannelList = formList.value[currentIndex.value].dpChannelConfigs
  let hasChannelObj = leftChannelList.find(left=>left.channelTypeId === item.channelTypeId)
  if(hasChannelObj){
    let idx = hasChannelObj.depositChannelList.findIndex(item=>item.mchChannelId===child.mchChannelId)
    if(idx>-1){
      hasChannelObj.depositChannelList.splice(idx,1)
    }else{
      hasChannelObj.depositChannelList.push(child)
    }
  }else{
    leftChannelList.push({
    assignId:item.assignId,
    tenantId: item.tenantId,
    channelTypeId: item.channelTypeId,
    channelTypeName: item.channelTypeName,
    channelTypeCode: item.channelTypeCode,
    icon:item.icon,
    quickAmount: null,
    isCustomizeInput: 1,
    minPayAmount: null,
    maxPayAmount:null,
    depositChannelList: [child]
  })
  }
  formList.value[currentIndex.value].selected = selectedImages.value;
}

function pushData(){
  let arr = []
  for(let i=0;i<depositList.value.length;i++){
    arr.push({
          assignId:depositList.value[i].assignId,
          channelTypeName: "",
          quickAmount: "",
          quickAmountName:[],
          isCustomizeInput: 1,
          minPayAmount: 1,
          maxPayAmount: 100,
          depositChannelList: [],
        })
  }
  return arr
}
function initPushData(dpChannelConfigs){
  // for(let i=0;i<=depositList.value.length-dpChannelConfigs.length;i++){
  //   dpChannelConfigs.push({
  //         channelTypeName: "",
  //         quickAmount: "",
  //         quickAmountName:[],
  //         isCustomizeInput: 1,
  //         minPayAmount: 1,
  //         maxPayAmount: 100,
  //         depositChannelList: [],
  //       })
  // }
  // return dpChannelConfigs
  dpChannelConfigs = depositList.value.map(deposit=>{
    let obj = dpChannelConfigs.find(item=>item.channelTypeId===deposit.channelTypeId)
    if(obj){
      return obj
    }else{
      return {
          assignId:deposit.assignId,
          channelTypeName: "",
          quickAmount: "",
          quickAmountName:[],
          isCustomizeInput: 1,
          minPayAmount: 1,
          maxPayAmount: 100,
          depositChannelList: []
      }
    }
  })
  return dpChannelConfigs
}
function forMerceData(dpChannelConfigs){
  dpChannelConfigs.forEach(item=>{
    item.dpChannelIds = item.depositChannelList.map(item=>item.mchChannelId)
    item.quickAmount = item.quickAmountName.join(',')
  })
  return dpChannelConfigs.filter(item=>item.depositChannelList.length)
}
function validateMinMaxValue(rule, value, callback) {
  // 自定义校验逻辑
  if (isNaN(value)) {
    callback(new Error(i18n.global.t("funds.pleaseInputInvaildNumber")));
  } else if (!Number.isInteger(Number(value)) || parseInt(value, 10) < 0) {
    callback(new Error(i18n.global.t("funds.positiveInteger")));
  }else if (value==='') {
    callback(new Error(i18n.global.t("funds.pleaseInputLimitAmount")));
  } else {
      callback(); // 校验通过
  }
}
</script>

<style lang="scss" scoped>
.funds-channel-distribute-index {
  // padding:20px;
  height:100%;
  .content {
    display: flex;
    height: calc(100vh - 84px - 32px);
    overflow: auto;
    .left {
      flex: 1;
      border-right: 1px solid gray;
      height: 100%;
      padding: 0 12px;
      overflow: auto;
      .left-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .bar-chart {
          display: inline-block;
          width: 15px;
          height: 21px;
          background: #1890ff;
        }
        .title {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          margin-left: 4px;
        }
      }
      .left-content {
        .bottom {
          display: flex;
          // flex-direction: column;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: #333333;
          overflow: auto;
        }
        .channel-name {
          margin-top: 0;
          font-size: 13px;
          color: #333333;
          font-weight: 600;
        }
        .form-data {
      margin: 15px;
      padding: 15px;
      &.active {
        background-color: rgba(95, 164, 232, 0.1);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        border-radius: 15px;
      }
    }
      }
    }
    .right {
      flex: 1;
      padding-left: 12px;
      overflow-y: auto;
      .right-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .bar-chart {
          display: inline-block;
          width: 15px;
          height: 21px;
          background: #1890ff;
        }
        .title {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          margin-left: 4px;
        }
      }
      .right-content {
        .title {
          font-size: 13px;
          color: #333333;
          font-weight: 600;
          height: 16px;
        }
        .bottom {
          display: flex;
          // flex-direction: column;
          flex-wrap: wrap;
          // justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: #333333;
        }
      }
    }
  }
}
</style>
