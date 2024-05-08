<template>
  <div class="add-or-edit-order-taker">
    <!-- 新增/编辑接单人员 -->
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="type === 'add' ? $t('risk.addRecieveOrderPerson') : $t('risk.editRecieveOrderPerson')"
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
            <el-form-item :label="$t('risk.userName')" prop="userName">
              <el-select
                clearable
                v-model="queryParams.userName"
                :placeholder="$t('risk.pleaseSelect')"
                class="full-width"
                @change="userNameSelect"
              >
                <el-option
                  v-for="item in userNameList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userName"
                  :disabled="isDisabledPerson(item)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.department')" prop="department">
              <el-input
                v-model="queryParams.department"
                :placeholder="$t('risk.pleaseInput')"
                clearable
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.position')" prop="post">
              <el-input
                v-model="queryParams.post"
                :placeholder="$t('risk.pleaseInput')"
                clearable
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.assignRuleItem')" prop="assignRuleItem">
              <el-checkbox-group v-model="queryParams.assignRuleItem">
                <el-checkbox
                  v-for="item in distributeRuleList"
                  :label="item.id"
                  :key="item.id"
                >
                  {{ item.planName }}
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
          <el-button @click="cancel">{{ $t('risk.cancel') }}</el-button>
          <el-button type="primary" @click="submit">{{ $t('risk.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, getCurrentInstance, onMounted } from "vue";
import { queryValidList,getReviewPersonInfo,addReviewPerson,editReviewPerson,getReviewPersonListAll } from "@/api/risk/config/index";
import { listUserAll } from "@/api/system/user"; 

const props = defineProps(["open", "type","id"]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  id: null,
  userName: null,
  department: null,
  post: null,
  assignRuleItem:[],
  remark: null,
});
const queryRef = ref(null);
const rules = ref({
  assignRuleItem: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("risk.pleaseSelectAssignRule"),
      trigger: "change",
    },
  ],
  userName: [
    { required: true, message: i18n.global.t("risk.pleaseInputUsername"), trigger: "blur" },
    {pattern:/^[a-zA-Z0-9\u4e00-\u9fa5.]+$/,message:i18n.global.t("risk.onlyChineseNumberEnglish"), trigger: "blur"}
  ],
});
const userNameList = ref([]);
const distributeRuleList = ref([]);
const orderTakerList = ref([]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const isDisabledPerson = computed(()=>{
  return (item)=>{
    return orderTakerList.value.map(mp=>mp.userName).includes(item.userName)
  }
})

onMounted(async()=>{
  await queryRule();
  await queryAllListOrder();
  await queryUserName();
  props.type === 'edit' && await queryInfo()
})
function queryRule(){
  return queryValidList().then(res=>{
    distributeRuleList.value = res || [];
  })
}
function queryAllListOrder(){
  return getReviewPersonListAll().then(res=>{
    orderTakerList.value = res || [];
  })
}
function queryUserName(){
  return listUserAll().then(res=>{
    userNameList.value = res || [];
  })
}
function queryInfo(){
  return getReviewPersonInfo(props.id).then(res=>{
    queryParams.value = res || {}
  })
}
function userNameSelect(val){
  if(val){
    const item = userNameList.value.find(user=>user.userName === val);
    if(item){
      queryParams.value.department = item.deptName;
      queryParams.value.post = item.postName;
    }
  }else{
      queryParams.value.department = null;
      queryParams.value.post = null;
  }
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      if(props.type === 'add'){
        addReviewPerson(queryParams.value).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("risk.addSuccessfully"));
          emit("onrefresh");

          dialogVisible.value = false;
        })
      }else{
        editReviewPerson(queryParams.value).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"));
          emit("onrefresh");

          dialogVisible.value = false;
        })
      }
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.add-or-edit-order-taker {
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
