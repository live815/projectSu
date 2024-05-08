<template>
  <div>
    <el-form
      :model="queryParams"
      ref="ruleFormRef"
      label-width="70px"
      :rules="rules"
    >
      <el-form-item
        v-for="(domainName, index) in domains"
        :key="index"
        :label="$t('agent.domainName') + (index + 1) + ' :'"
        prop="domainName"
      >
        <el-input
          v-model="domainName.value"
          :placeholder="$t('agent.pleaseEnterDomainName')"
          style="width: 400px"
        >
          <!-- <template #prepend>Https://</template> -->
        </el-input>
        <div class="right">
          <div class="bottom" @click="addNewDomainInput">+</div>
          <div
            class="bottom"
            @click="removeDomainInput(index)"
            v-if="domains.length > 1"
          >
            -
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('agent.statusQuote')" prop="status">
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="queryParams.status" class="ml-4">
            <el-radio :label="1" size="large">{{
              $t("agent.active")
            }}</el-radio>
            <el-radio :label="0" size="large">{{ $t("agent.close") }}</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleFormRef)">{{
          $t("agent.cancel")
        }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{
          $t("agent.ensure")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  addedProxyDomainNamePoolApi,
  editProxyDomainNamePoolApi,
} from "@/api/agent/promotionConfig/promotionConfig.js";
import i18n from "@/i18n";

const emit = defineEmits(["submitBtn"]);
const ruleFormRef = ref();
const props = defineProps({
  opRow: {
    type: Object,
    default: null,
  },
});
const queryParams = ref({
  domainName: "",
  status: "",
});
// 表单校验
const rules = {
  // domainName: [
  //   {
  //     required: true,
  //     message: i18n.global.t("agent.domainNameCannotBeEmpty"),
  //     trigger: "blur",
  //   },
  // ],
  status: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseSelectAStatus"),
      trigger: "blur",
    },
  ],
};
// 传递过来的当前项值
const onComputedOpRow = computed(() => {
  return props.opRow;
});
//新增
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (onComputedOpRow.value.id) {
        queryParams.value.domainName = domains.value
          .map((item) => item.value)
          .join(",");
        editProxyDomainNamePoolApi(queryParams.value).then((res) => {
          emit("submitBtn", 1);
          ElMessage({
            type: "success",
            message: i18n.global.t("agent.updateSuccessfully"),
          });
        });
      } else {
        if (onComputedOpRow)
          queryParams.value.domainName = domains.value
            .map((item) => item.value)
            .join(",");
        addedProxyDomainNamePoolApi(queryParams.value)
          .then(() => {
            emit("submitBtn", 1);
            ElMessage({
              type: "success",
              message: i18n.global.t("agent.addSuccessfully"),
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
//数据回显
onMounted(() => {
  if (props.opRow.id) {
    Object.assign(queryParams.value, {
      id: onComputedOpRow.value.id,
      domainName: onComputedOpRow.value.domainName,
      status: onComputedOpRow.value.status,
    });
    domains.value = onComputedOpRow.value.domainName
      .split(",")
      .map((value) => ({ value }));
  }
});
//新增域名按钮
const domains = ref([{ value: "" }]);
const addNewDomainInput = () => {
  domains.value.push({ value: "" });
};
const removeDomainInput = (index) => {
  domains.value.splice(index, 1);
};

// 添加https://
// const addHttps = (val) => {
//   const regex = /^https:/i;
//   let isGood = regex.test(val);
//   if (!isGood) {
//     val = "https://" + val;
//     return val;
//   } else {
//     return val;
//   }
// };
// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
  ruleFormRef.value.resetFields();
  emit("submitBtn", 2);
};
</script>

<style lang="scss" scoped>
.right {
  display: flex;
  gap: 5px;
  .bottom {
    text-align: center;
    border: 1px solid #aaaaaa;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
