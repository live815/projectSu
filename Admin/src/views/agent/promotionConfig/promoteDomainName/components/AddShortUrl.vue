<template>
  <div>
    <el-form label-width="90">
      <!-- <el-form-item label="域名类型：">
        <el-select v-model="sumbitData.domainType" :placeholder="$t('agent.pleaseSelect')">
          <el-option
            v-for="item in domainTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="域名：">
        <el-input v-model="sumbitData.domainName" style="width: 250px">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {
  AddShortUrlApi,
  editshortUrleApi,
} from "@/api/agent/promotionConfig/promotionConfig";
import { deepCopy } from "@/utils";
const { proxy } = getCurrentInstance();
const props = defineProps(["currentRow"]);
const emit = defineEmits(["closeAdd"]);
const sumbitData = ref({
  domainName: "",
  domainType: 0,
  status: 1,
  tenantId: 0,
});
onMounted(() => {
  console.log(props.currentRow);
  if (props.currentRow) {
    console.log(true);
    sumbitData.value = deepCopy(props.currentRow);
  } else {
    console.log(false);
  }
});
// 添加http://
const addHttp = (val) => {
  const regex = /^http:/i;
  let isGood = regex.test(val);
  if (!isGood) {
    val = "http://" + val;
    return val;
  } else {
    return val;
  }
};
const submit = async () => {
  if (sumbitData.value.domainName == "") {
    proxy.$modal.msgError(`域名不能为空`);
    return;
  }
  if (props.currentRow) {
    sumbitData.value.domainName = addHttp(sumbitData.value.domainName);
    await editshortUrleApi(sumbitData.value);
    emit("closeAdd");
  } else {
    sumbitData.value.domainName = addHttp(sumbitData.value.domainName);
    await AddShortUrlApi(sumbitData.value);
    emit("closeAdd");
  }
};
const handleClose = () => {
  emit("closeAdd");
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
