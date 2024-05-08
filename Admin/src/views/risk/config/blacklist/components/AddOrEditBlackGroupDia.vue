<template>
  <div class="add-or-edit-black-group-dialog">
    <!-- 新增/编辑黑名单群组 -->
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="type === 'add' ? $t('risk.addBlackGroup') : $t('risk.editBlackGroup')"
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
            <el-form-item :label="$t('risk.groupName')" prop="groupName">
              <el-input
                v-model="queryParams.groupName"
                :placeholder="$t('risk.pleaseInput')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.powerLimitSetting')" class="full-width" required>
              <div class="config-title">
                <span class="action">{{ $t('risk.action') }}</span>
                <span class="operate">{{ $t('risk.lockOperate') }}</span>
              </div>
              <div
                class="config-title"
                v-for="item in queryParams.permissionItem"
                :key="item.actionType"
              >
                <span style="flex:1">{{ item.actionName }}</span>
                <div class="config-title-value">
                  <div class="left">
                    <el-form-item label="" prop="register" class="full-width left-content">
                      <el-checkbox-group v-model="item.isChecked">
                        <el-checkbox
                          v-for="child in item.blockadeItem"
                          :label="child.blockadeType"
                          @change="checkBoxChange($event,child)"
                        >
                          {{ child.blockadeName }}
                          <div
                            style="display: inline-block;width:calc(100% - 61px)"
                            v-if="
                              (item.actionType === 1 &&
                                child.blockadeType === 2) ||
                              (item.actionType === 3 &&
                                child.blockadeType === 2) ||
                              (item.actionType === 5 &&
                                child.blockadeType === 1)
                            "
                          >
                            <el-select
                              v-model="child.targetLayerId"
                              v-if="child.checked"
                              :placeholder="$t('risk.pleaseSelect')"
                              clearable
                              @click.prevent="()=>{}"
                            >
                              <el-option
                                v-for="dict in riskList"
                                :key="dict.id"
                                :label="dict.layerName"
                                :value="dict.id"
                              />
                            </el-select>
                          </div>
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </div>
              </div>
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
import { getCurrentInstance } from "vue";
import {
  getBlackGroupInfo,
  addBlackGroup,
  editBlackGroup,
} from "@/api/risk/config/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { deepCopy } from "@/utils/index";

const props = defineProps(["open", "type", "id"]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();
const groupNameClone = ref(null);
const queryParams = ref({
  id: null,
  groupName: null,
  permissionItem: [
    {
      actionName: i18n.global.t("risk.register"),
      actionType: 1,
      blockadeItem: [
        {
          blockadeName: i18n.global.t("risk.registerNotAllowed"),
          blockadeType: 1,
          targetLayerId: null,
          checked:0
        },
        {
          blockadeName: i18n.global.t("risk.registerSeparate"),
          blockadeType: 2,
          targetLayerId: null,
          checked:0
        },
      ],
    },
    {
      actionName: i18n.global.t("risk.login"),
      actionType: 2,
      blockadeItem: [
        {
          blockadeName: i18n.global.t("risk.loginNotAllowed"),
          blockadeType: null,
          targetLayerId: null,
          checked:0
        },
      ],
    },
    {
      actionName: i18n.global.t("risk.withdrawal"),
      actionType: 3,
      blockadeItem: [
        {
          blockadeName: i18n.global.t("risk.withdrawalNotAllowed"),
          blockadeType: 1,
          targetLayerId: null,
          checked:0
        },
        {
          blockadeName: i18n.global.t("risk.withdrawalSeparateLevel"),
          blockadeType: 2,
          targetLayerId: null,
          checked:0
        },
      ],
    },
    {
      actionName: i18n.global.t("risk.rebate"),
      actionType: 4,
      blockadeItem: [
        {
          blockadeName: i18n.global.t("risk.rebateNotAllowed"),
          blockadeType: null,
          targetLayerId: null,
          checked:0
        },
      ],
    },
    {
      actionName: i18n.global.t("risk.recharge"),
      actionType: 5,
      blockadeItem: [
        {
          blockadeName: i18n.global.t("risk.rechargeSeparateLevel"),
          blockadeType: 1,
          targetLayerId: null,
          checked:0
        },
      ],
    },
  ],
  remark: null,
});
const queryRef = ref(null);
const rules = ref({
  // register: [
  //   { required: true, message: "请选择注册行为", trigger: "change" },
  // ],
  groupName: [{ required: true, message: i18n.global.t("risk.pleaseInputGroupName"), trigger: "blur" }],
});
const riskList = ref([]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(async () => {
  await queryRiskList();
  props.type === "edit" && (await queryDetail());
});
//查询层级列表
function queryRiskList() {
  return getRiskFinancalList(0).then((res) => {
    riskList.value = res || [];
  });
}
function queryDetail() {
  return getBlackGroupInfo(props.id).then(res=>{
    queryParams.value = res || {}
    groupNameClone.value = deepCopy(res.groupName);
    res.permissionItem && res.permissionItem.forEach(item=>{
      item.isChecked = item.blockadeItem.filter(check=>check.checked===1).map(itm=>itm.blockadeType)
    })
  })
}

function checkBoxChange(val,child){
  child.checked = val ? 1 : 0;
  if(val){
    child.checked = 1
  }else{
    child.checked = 0;
    child.targetLayerId = null
  }
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      if(props.type === 'add'){
          addBlackGroup(queryParams.value).then(res=>{
            proxy.$modal.msgSuccess(i18n.global.t("risk.addSuccessfully"));
            cancel();
            emit("onrefresh");
          })
      }else{
          groupNameClone.value === queryParams.value.groupName && delete queryParams.value.groupName
          editBlackGroup(queryParams.value).then(res=>{
            proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"));
            cancel();
            emit("onrefresh");
          })
      }
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.add-or-edit-black-group-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      border-top: 1px solid rgb(215, 215, 215);
    }
    .el-button {
      width: 140px;
      height: 40px;
      &:first-child {
        color: #8c8c8c;
        border: 1px solid rgba(121, 121, 121, 1);
      }
      &:nth-child(2) {
        background: #1890ff;
      }
    }
    .el-checkbox{
      margin-right:0;
    }
  }
  .config-title {
    display: flex;
    justify-content: space-between;
    width:100%;
    .action {
      color: #7f7f7f;
      flex:1;
    }
    .operate {
      color: #7f7f7f;
      flex:1;
    }
    .config-title-value {
      display: flex;
      // justify-content: space-between;
      flex:1;
      .left {
        .el-checkbox-group {
          display: flex;
          flex-direction: column;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: end;
      }
    }
    // &:last-child {
    //   .el-checkbox {
    //     margin-right: 32px;
    //   }
    // }
    // &:nth-child(1) {
    //   .el-checkbox {
    //     margin-right: 32px;
    //   }
    // }
  }
}
</style>
