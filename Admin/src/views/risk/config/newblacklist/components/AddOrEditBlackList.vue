<template>
  <div class="add-or-edit-black-list-dialog">
    <!-- 新增/编辑黑名单 -->
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="titleSwitch"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="right"
        label-width="112px"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              :label="labelChange"
              prop="valueListShow"
              class="full-width"
              :rules="valueRules"
            >
              <el-input
                type="textarea"
                v-model="queryParams.valueListShow"
                :placeholder="placeholderChange"
                :rows="5"
                :disabled="type === 'edit'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.actionQuote')" prop="lockList">
              <el-checkbox-group v-model="queryParams.lockList">
                <el-checkbox
                  v-for="item in blackGroupList"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
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
          <el-button @click="cancel">{{ $t("risk.cancel") }}</el-button>
          <el-button type="primary" @click="submit">{{
            $t("risk.submit")
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, getCurrentInstance } from "vue";
import { filterLabel } from "@/utils/index";
import {
  getBlacklistInfo,
  addBlacklist,
  editBlacklist,
} from "@/api/risk/config/index";
import {
  validateIPv4List,
  validateUsername,
  validateDevice,
  validateBankcard,
  validateVirtualAddress,
  validateVirtualNumber,
  validatePhoneNumber,
} from "../commonJS/validate";

const props = defineProps([
  "open",
  "type",
  "activeName",
  "id",
  "blackGroupList",
]);
const emit = defineEmits(["update:open", "onrefresh"]);
const { proxy } = getCurrentInstance();
const queryParams = ref({
  id: null,
  type: props.activeName,
  lockList:[],
  valueListShow: null,
  valueList:[],
  remark: null,
});
const queryRef = ref(null);
const rules = ref({
  lockList: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("risk.pleaseSelectAction"),
      trigger: "change",
    },
  ],
});

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const titleSwitch = computed(() => {
  if (props.type === "add" && props.activeName === 1) {
    return i18n.global.t("risk.addMember");
  } else if (props.type === "edit" && props.activeName === 1) {
    return i18n.global.t("risk.editMember");
  } else if (props.type === "add" && props.activeName === 2) {
    return i18n.global.t("risk.addIP");
  } else if (props.type === "edit" && props.activeName === 2) {
    return i18n.global.t("risk.editIP");
  } else if (props.type === "add" && props.activeName === 3) {
    return i18n.global.t("risk.addDevice");
  } else if (props.type === "edit" && props.activeName === 3) {
    return i18n.global.t("risk.editDevice");
  } else if (props.type === "add" && props.activeName === 4) {
    return i18n.global.t("risk.addBankcard");
  } else if (props.type === "edit" && props.activeName === 4) {
    return i18n.global.t("risk.editBankcard");
  } else if (props.type === "add" && props.activeName === 5) {
    return i18n.global.t("risk.addVirtualAddress");
  } else if (props.type === "edit" && props.activeName === 5) {
    return i18n.global.t("risk.editVirtualAddress");
  } else if (props.type === "add" && props.activeName === 6) {
    return i18n.global.t("risk.addVirtualNumber");
  } else if (props.type === "edit" && props.activeName === 6) {
    return i18n.global.t("risk.editVirtualNumber");
  } else if (props.type === "add" && props.activeName === 7) {
    return i18n.global.t("risk.addPhoneNumber");
  } else if (props.type === "edit" && props.activeName === 7) {
    return i18n.global.t("risk.editPhoneNumber");
  }
});
const labelChange = computed(() => {
  switch (props.activeName) {
    case 1:
      return i18n.global.t("risk.userName");
    case 2:
      return i18n.global.t("risk.IPAddressQuote");
    case 3:
      return i18n.global.t("risk.deviceNo");
    case 4:
      return i18n.global.t("risk.bankCardQuote");
    case 5:
      return i18n.global.t("risk.virtualAddressQuote");
    case 6:
      return i18n.global.t("risk.virtualNumberParagraphQuote");
    case 7:
      return i18n.global.t("risk.phoneNumberQuote");
  }
});
const placeholderChange = computed(() => {
  switch (props.activeName) {
    case 1:
      return i18n.global.t("risk.pleaseInputUsernameMaxOneThousand");
    case 2:
      return i18n.global.t("risk.pleaseInputIpMaxOneThousand");
    case 3:
      return i18n.global.t("risk.pleaseInputDeviceMaxOneThousand");
    case 4:
      return i18n.global.t("risk.pleaseInputBankcardMaxOneThousand");
    case 5:
      return i18n.global.t("risk.pleaseInputVirtualAddressMaxOneThousand");
    case 6:
      return i18n.global.t("risk.pleaseInputParagraphMaxOneThousand");
    case 7:
      return i18n.global.t("risk.pleaseInputPhoneNumberMaxOneThousand");
  }
});
const valueRules = computed(() => {
  switch (props.activeName) {
    case 1:
      return [
        {
          required: true,
          message: i18n.global.t("risk.pleaseInputMemberAccount"),
          trigger: "blur",
        },
        { validator: validateUsername, trigger: "blur" },
      ];
    case 2:
      return [
        {
          required: true,
          message: i18n.global.t("risk.pleaseInputIp"),
          trigger: "blur",
        },
        {
          validator: validateIPv4List,
          trigger: "blur",
        },
      ];
    case 3:
      return [
        {
          required: true,
          message: i18n.global.t("risk.pleaseInputDevice"),
          trigger: "blur",
        },
        { validator: validateDevice, trigger: "blur" },
      ];
    case 4:
      return [
        {
          required: true,
          message: i18n.global.t("risk.pleaseInputBankcard"),
          trigger: "blur",
        },
        { validator: validateBankcard, trigger: "blur" },
      ];
    case 5:
      return [
        {
          required: true,
          message: i18n.global.t("risk.pleaseInputVirtualAddress"),
          trigger: "blur",
        },
        { validator: validateVirtualAddress, trigger: "blur" },
      ];
    case 6:
      return [
        {
          required: true,
          message: i18n.global.t("risk.pleaseInputParagraph"),
          trigger: "blur",
        },
        { validator: validateVirtualNumber, trigger: "blur" },
      ];
    case 7:
      if(props.type === 'edit'){
        return [
          {
            required: true,
            message: i18n.global.t("risk.pleaseInputPhoneNumber"),
            trigger: "blur",
          }
        ];
      }else{
        return [
          {
            required: true,
            message: i18n.global.t("risk.pleaseInputPhoneNumber"),
            trigger: "blur",
          },
          { validator: validatePhoneNumber, trigger: "blur" },
        ];
      }
  }
});

onMounted(async () => {
  props.type === "edit" && (await queryDetail());
});
function queryDetail() {
  return getBlacklistInfo(props.id).then((res) => {
    queryParams.value = res || {};
    queryParams.value.valueListShow = res.value;
  });
}

function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      queryParams.value.valueList = queryParams.value.valueListShow.split(',')
      if (props.type === "add") {
        addBlacklist({
          ...queryParams.value,
        }).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("risk.addSuccessfully"));
          emit("onrefresh");

          dialogVisible.value = false;
        });
      } else {
        editBlacklist({
          ...queryParams.value,
        }).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"));
          emit("onrefresh");

          dialogVisible.value = false;
        });
      }
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.add-or-edit-black-list-dialog {
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
  }
}
</style>
