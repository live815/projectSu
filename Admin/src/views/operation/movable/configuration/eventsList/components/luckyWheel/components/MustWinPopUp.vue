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
        <el-form-item label="抽奖次数" prop="maxNum">
          <el-input v-model="ruleForm.maxNum" type="number" />
        </el-form-item>
        <el-form-item label="奖品类型" prop="activityTurntableGiftId">
          <el-select
            v-model="ruleForm.activityTurntableGiftId"
            placeholder="请选择奖品类型"
            @change="setGiftName"
          >
            <el-option
              v-for="item in vipType"
              :key="item.id"
              :label="item.giftName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数量限制" prop="limitNumSwitch">
          <el-select v-model="ruleForm.limitNumSwitch">
            <el-option label="限制X个" :value="1" />
            <el-option label="无限制" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.limitNumSwitch" label="奖品数量上限" prop="limitNum">
          <el-input v-model="ruleForm.limitNum" type="number" />
        </el-form-item>
        <el-form-item  label="VIP限制">
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
        <el-form-item label="中奖账号名单">
          <el-input
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
import { VipList } from "@/utils/config.js";

const dialogVisible = ref(false);
const ruleFormRef = ref(null);
const checkAll = ref(false);
const isIndeterminate = ref(false);
const rowIndex = ref(); //编辑的哪一行数据的下标

const emit = defineEmits(["editLine"]);
const props = defineProps({
  vipType: {
    type: Array,
    default: [],
  },
});

const ruleForm = ref({
  giftName: "",
  betMultiple: "",
  giftAmount: "",
  giftImg: "",
  giftType: 1,
  id: 0,
  limitNum: "",
  limitNumSwitch: 1,
  limitUserName: "",
  limitUserSwitch: 0,
  maxNum: 0,
  showSwitch: 0,
  vipSet: [],
});

const rules = {
  maxNum: [{ required: true, message: "请输入抽奖次数", trigger: "blur" }],
  activityTurntableGiftId: [
    { required: true, message: "请选择奖品类型", trigger: "blur" },
  ],
  limitNumSwitch: [
    { required: true, message: "请选择数量限制", trigger: "blur" },
  ],
  limitNum: [
    { required: true, message: "请输入奖品数量上限", trigger: "blur" },
  ],
};

const setGiftName = (a) => {
  const obj = props.vipType.find((item) => item.id === a);
  ruleForm.value.giftName = obj.giftName;
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

const confirm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
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