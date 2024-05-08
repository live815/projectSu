<template>
  <div>
    <el-dialog v-model="dialogVisible" title="添加" width="30%">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="奖品类型" prop="giftType">
          <el-select v-model="ruleForm.giftType">
            <el-option
              v-for="item in filteredPrizeType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖品金额" prop="region">
          <el-input v-model="ruleForm.giftAmount" v-restrict-input />
        </el-form-item>
        <el-form-item label="流水倍数" prop="count">
          <el-input v-model="ruleForm.betMultiple" v-restrict-input />
        </el-form-item>
        <el-form-item label="奖品名称" required>
          <el-input v-model="ruleForm.giftName" />
        </el-form-item>
        <el-form-item label="奖品概率权重" prop="weights">
          <el-input v-model="ruleForm.weights" />
        </el-form-item>
        <el-form-item label="数量限制" prop="limitNumSwitch">
          <el-select v-model="ruleForm.limitNumSwitch">
            <el-option label="限制X个" :value="1" />
            <el-option label="无限制" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.limitNumSwitch"
          label="奖品数量上限"
          prop="limitNum"
        >
          <el-input
            v-model="ruleForm.limitNum"
            type="number"
            v-restrict-input
          />
        </el-form-item>
        <el-form-item
          v-if="ruleForm.limitNumSwitch"
          label="单人最多中奖数"
          prop="maxNum"
        >
          <el-input v-model="ruleForm.maxNum" type="number" v-restrict-input />
        </el-form-item>
        <el-form-item label="中奖名单" prop="showSwitch">
          <el-radio-group v-model="ruleForm.showSwitch" class="ml-4">
            <el-radio :label="0" size="large">不展示</el-radio>
            <el-radio :label="1" size="large">展示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="奖品图片" prop="giftImg">
          <TurntablePictures :data="img" capacity="500K" @getImg="getImg" />
        </el-form-item>
        <el-form-item label="VIP限制">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-checkbox-group
            v-model="ruleForm.vipSet"
            @change="handleCheckedCitiesChange"
            class="vipSet"
          >
            <el-checkbox v-for="item in VipList" :key="item.id" :label="item">
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="账号限制" prop="limitUserSwitch">
          <el-radio-group v-model="ruleForm.limitUserSwitch" class="ml-4">
            <el-radio :label="0" size="large">无限制</el-radio>
            <el-radio :label="1" size="large">限制</el-radio>
          </el-radio-group>
          <el-input
            v-if="ruleForm.limitUserSwitch"
            v-model="ruleForm.limitUserName"
            :autosize="{ minRows: 4, maxRows: 6 }"
            type="textarea"
            placeholder="请输入会员账号，多个会员账号请用，隔开  最多10W账号"
          />
        </el-form-item>
      </el-form>
      <el-form-item>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">
            添加
          </el-button>
        </span>
      </el-form-item>
    </el-dialog>
  </div>
</template>

<script setup>
import { getToken } from "@/utils/auth";
import { VipList, prizeType } from "@/utils/config.js";
import TurntablePictures from "./TurntablePictures";
import i18n from "@/i18n";
import { watchEffect } from "vue";

const dialogVisible = ref(false);
const ruleFormRef = ref(null);
const checkAll = ref(false);
const isIndeterminate = ref(false);
const rowIndex = ref(); //编辑的哪一行数据的下标

const emit = defineEmits(["editLine"]);

const props = defineProps({
  data: {
    type: Object,
  },
});

const img = ref({
  title: "",
  size: "264*420",
});

const ruleForm = ref({
  alreadyNum: 0,
  betMultiple: "",
  giftAmount: "",
  giftImg: "",
  giftName: "",
  giftType: 1,
  id: 0,
  limitNum: 0,
  limitNumSwitch: 1,
  limitUserName: "",
  limitUserSwitch: 0,
  maxNum: 0,
  showSwitch: 0,
  vipSet: [],
  weights: 10,
});

const rules = {
  giftType: [{ required: true, message: "请选择奖励类型", trigger: "blur" }],
  giftName: [{ required: true, message: "请输入奖品名称", trigger: "blur" }],
  weights: [{ required: true, message: "请输入奖品概率权重", trigger: "blur" }],
  limitNumSwitch: [
    { required: true, message: "请选择数量限制", trigger: "blur" },
  ],
  limitNum: [
    { required: true, message: "请输入奖品数量上限", trigger: "blur" },
  ],
  maxNum: [
    { required: true, message: "请输入单人最多中奖数", trigger: "blur" },
  ],
  showSwitch: [
    { required: true, message: "请选择中奖名单是否展示", trigger: "blur" },
  ],
  giftImg: [{ required: true, message: "请选择奖品图片", trigger: "blur" }],
  limitUserSwitch: [
    { required: true, message: "请选择账号限制", trigger: "blur" },
  ],
};

//vip全选
const handleCheckAllChange = (val) => {
  if (val) {
    ruleForm.value.vipSet = VipList;
  } else {
    ruleForm.value.vipSet = [];
  }
  isIndeterminate.value = false;
};
// vip单选
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === VipList.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < VipList.length;
};
const filteredPrizeType = computed(() => {
  return prizeType(i18n).filter((item) => item.value);
});
const getImg = (img) => {
  ruleForm.value.giftImg = img;
};
const confirm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (!ruleForm.value.limitNumSwitch) {
        ruleForm.value.limitNum = 0;
        ruleForm.value.maxNum = 0;
      }
      ruleForm.value.vipSet = ruleForm.value.vipSet
        ?.map((item) => item.id)
        .join(",");

      emit("editLine", ruleForm.value, rowIndex.value);
      dialogVisible.value = false;
    }
  });
};
const switchS = (idx, data) => {
  if (data) {
    // 将 vipSet 字符串转换为数组回显
    const vipSetArray = data.vipSet?.split(",").map((item) => ({
      id: Number(item),
      label: `VIP${item}`,
    }));
    const newGiftObject = {
      ...data,
      vipSet: data.vipSet ? vipSetArray : [],
    };

    Object.assign(img.value, {
      url: newGiftObject.giftImg, // 图片回显
    });

    ruleForm.value = newGiftObject;
  }

  dialogVisible.value = !dialogVisible.value;
  rowIndex.value = idx;
};
defineExpose({ switchS });
</script>

<style scoped lang="scss">
.demo-ruleForm {
  .el-form-item {
    margin-bottom: 20px;
  }
  .vipSet {
    margin-left: 120px;
  }
}
</style>