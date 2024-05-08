<template>
  <div class="add-edit-deposit-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :title="$t('operation.tip54')"
      :show-close="false"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <div class="btn-right" v-if="onLookComputed">
        <el-button @click="cancel">{{ $t("operation.close") }}</el-button>
      </div>
      <div class="btn-right" v-else>
        <el-button @click="cancel">{{ $t("operation.cancel") }}</el-button>
        <el-button type="success" @click="onClickCheck(1)">
          {{ $t("operation.pass", { name: onAuditComputed }) }}
        </el-button>
        <el-button type="danger" @click="onClickCheck(2)">{{
          $t("operation.reject", { name: onAuditComputed })
        }}</el-button>
      </div>
      <div>
        <div class="dialog-top">
          <div class="title">{{ $t("operation.Accounttype") }}</div>
          <div>
            {{
              rowItem.deliveryType == 1
                ? $t("operation.Ordinaryaccount")
                : $t("operation.Agentaccount")
            }}
          </div>
        </div>
        <div class="dialog-account">
          <div class="title">{{ $t("operation.memberaccount") }}</div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 6 }"
            v-model="textarea"
          >
          </el-input>
        </div>
        <div class="dialog-account">
          <div class="title">{{ $t("operation.Reviewdetails") }}</div>
          <div class="table">
            <div class="table-row">
              <div class="table-row-item">
                {{ $t("operation.applicant") }}
              </div>
              <div class="table-row-item">{{ rowItem.createBy }}</div>
              <div class="table-row-item">
                {{ $t("operation.applicattime") }}
              </div>
              <div class="table-row-item">{{ rowItem.createTime }}</div>
              <div class="table-row-item">
                {{ $t("operation.Applicatnotes") }}
              </div>
              <div class="table-row-item">{{ rowItem.remark }}</div>
            </div>
            <div class="table-row-one">
              <div class="table-row-item">
                {{ $t("operation.bonustitle") }}
              </div>
              <div class="table-row-item">{{ rowItem.title }}</div>
              <div class="table-row-item">{{ $t("operation.type") }}</div>

              <div class="table-row-item" v-if="rowItem.type == 1">
                {{ $t("operation.cash") }}
              </div>
              <div class="table-row-item" v-if="rowItem.type == 2">
                {{ $t("operation.cashcoupons") }}
              </div>
              <div class="table-row-item" v-if="rowItem.type == 3">
                {{ $t("operation.depositcoupon") }}
              </div>
              <div class="table-row-item" v-if="rowItem.type == 4">
                {{ $t("operation.TurnoverCoupons") }}
              </div>
              <div class="table-row-item" v-if="rowItem.type == 5">
                {{ $t("operation.physicalObject") }}
              </div>

              <div class="table-row-item">
                {{ $t("operation.TurnoverMultiple") }}
              </div>
              <div class="table-row-item">{{ rowItem.multiple }}</div>
            </div>
            <div class="table-row-two">
              <div class="table-row-item">
                {{ $t("operation.issuebonus") }}
              </div>
              <div class="table-row-right">{{ rowItem.amount }}</div>
            </div>
          </div>
        </div>
        <div class="dialog-account" v-if="props.audit == 'one'">
          <div class="title">{{ $t("operation.tip55") }}</div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 6 }"
            v-model="textareaOne"
          >
          </el-input>
        </div>
        <div
          class="dialog-account"
          v-if="props.audit == 'two' || onLookComputed"
        >
          <div class="title">{{ $t("operation.tip56") }}</div>
          <div class="info">
            <div class="info-item">
              <div class="left">{{ $t("operation.tip57") }}</div>
              <div class="right">{{ rowItem.auditOneBy }}</div>
            </div>
            <div class="info-item">
              <div class="left">{{ $t("operation.tip58") }}</div>
              <div class="right">{{ rowItem.auditOneTime }}</div>
            </div>
            <div class="info-item">
              <div class="left">{{ $t("operation.tip59") }}</div>
              <div class="right">{{ rowItem.auditOneRemark }}</div>
            </div>
          </div>
        </div>
        <div class="dialog-account" v-if="props.audit == 'two'">
          <div class="title">{{ $t("operation.tip60") }}</div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 6 }"
            v-model="textareaTwo"
          >
          </el-input>
        </div>
        <div
          class="dialog-account"
          v-if="
            (onLookComputed && rowItem.status == 2) ||
            (onLookComputed && rowItem.status == 1)
          "
        >
          <div class="title">{{ $t("operation.tip61") }}</div>
          <div class="info">
            <div class="info-item">
              <div class="left">{{ $t("operation.tip62") }}</div>
              <div class="right">{{ rowItem.auditTwoBy }}</div>
            </div>
            <div class="info-item">
              <div class="left">{{ $t("operation.tip63") }}</div>
              <div class="right">{{ rowItem.auditTwoTime }}</div>
            </div>
            <div class="info-item">
              <div class="left">{{ $t("operation.tip64") }}</div>
              <div class="right">{{ rowItem.auditTwoRemark }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { editWelfareApi } from "@/api/operation/welfare";
import i18n from "@/i18n";

const props = defineProps(["open", "audit", "rowItems", "look"]);
const emit = defineEmits(["update:open", "changeStatus"]);
const { proxy } = getCurrentInstance();

// 完整页数据
const fullData = ref([]);

// 当前页数据
const currentPageData = ref([]);
// 会员账号信息
const textarea = props.rowItems.deliveryAccountList.join(",");
// 一审备注
const textareaOne = ref("");
// 二审备注
const textareaTwo = ref("");

const rowItem = computed(() => {
  return props.rowItems;
});

const onAuditComputed = computed(() => {
  if (props.audit == "one") {
    return i18n.global.t("operation.firstInstance");
  } else {
    return i18n.global.t("operation.SecondInstance");
  }
});

const onLookComputed = computed(() => {
  if (props.look) {
    return props.look;
  }
  return false;
});
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

const cancel = () => {
  dialogVisible.value = false;
};

// 审核
const onClickCheck = (val) => {
  if (val == 1) {
    const params = {
      id: rowItem.value.id,
      remark: "",
      type: "",
    };
    if (props.audit == "one") {
      params.remark = textareaOne.value;
      params.type = 1;
    } else {
      params.remark = textareaTwo.value;
      params.type = 3;
    }
    editWelfareApi(params).then(() => {
      proxy.$modal.msgSuccess(i18n.global.t("operation.InstanceSuccess"));
      emit("changeStatus", true);
      cancel();
    });
  } else {
    const params = {
      id: rowItem.value.id,
      remark: "",
      type: "",
    };
    if (props.audit == "one") {
      params.remark = textareaOne.value;
      params.type = 2;
    } else {
      params.remark = textareaTwo.value;
      params.type = 4;
    }
    editWelfareApi(params).then(() => {
      proxy.$modal.msgError(i18n.global.t("operation.Reviewreject"));
      emit("changeStatus", true);
      cancel();
    });
  }
};
</script>

<style lang="scss" scoped>
.add-edit-deposit-dialog {
  position: relative;
  :deep().el-dialog__title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .btn-right {
    position: absolute;
    top: 15px;
    right: 20px;
  }
  .dialog-top {
    display: flex;
    align-items: center;
    .title {
      margin-right: 15px;
      font-weight: 700;
      font-size: 15px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .dialog-account {
    margin: 20px 0;
    .title {
      margin-right: 15px;
      margin-bottom: 15px;
      font-weight: 700;
      font-size: 15px;
      color: rgba(0, 0, 0, 0.85);
    }
    .table {
      .table-row {
        display: flex;
        align-items: center;
        .table-row-item {
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border: 1px solid #ccc;
          color: rgba(0, 0, 0, 0.85);
          white-space: nowrap;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .table-row-item:nth-child(2n) {
          width: 180px;
          color: #000;
        }
      }
      .table-row-one {
        display: flex;
        align-items: center;
        .table-row-item {
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border: 1px solid #ccc;
          border-top: none;
          color: rgba(0, 0, 0, 0.85);
        }
        .table-row-item:nth-child(2n) {
          width: 180px;
          color: #000;
        }
      }
      .table-row-two {
        display: flex;
        align-items: center;
        .table-row-item {
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border: 1px solid #ccc;
          border-top: none;
          color: rgba(0, 0, 0, 0.85);
          white-space: nowrap;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .table-row-right {
          margin-left: 300px;
        }
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info-item {
        display: flex;
        align-items: center;
        .left {
          margin-right: 5px;
          white-space: nowrap;
        }
        .right {
          width: 180px;
        }
      }
    }
  }
}
</style>
