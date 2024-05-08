<template>
  <div class="phone-manage">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      class="full-width"
    >
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item :label="$t('member.countryName')" prop="countryCn" class="full-width">
            <el-input
              v-model="queryParams.countryCn"
              :placeholder="$t('member.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.areaNumber')" prop="phoneCode" class="full-width">
            <el-input
              v-model="queryParams.phoneCode"
              :placeholder="$t('member.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="danger" @click="add">{{ $t('member.addCountryAreaNumber') }}</el-button>
          <el-button type="primary" @click="handleQuery">{{ $t('member.search') }}</el-button>
          <el-button type="primary" @click="reset">{{ $t('member.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="phoneManageList" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.countryNameNoQuote')"
        align="center"
        prop="countryCn"
        width="160"
      >
      </el-table-column>
      <el-table-column :label="$t('member.areaNumberNoQuote')" align="center" prop="phoneCode">
      </el-table-column>
      <el-table-column :label="$t('member.countryIcon')" align="center" prop="icon">
        <template #default="{ row }">
          <img
            :src="getImgUrl(row.icon)"
            :alt="$t('member.loadingFailure')"
            v-if="row.icon"
            style="width: 80px"
          />
          <span v-else>{{ $t('member.noPictures') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.createBy')" align="center" prop="createBy">
        <template #default="{ row }">
          <span>{{ row.createBy ? row.createBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.lastOperateTime')" align="center" prop="updateTime">
        <template #default="{ row }">
          <span>{{ row.updateTime ? row.updateTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.status')" align="center" prop="status">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            active-value="0"
            inactive-value="1"
            @change="updateStatus(row)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="edit(row)">{{ $t('member.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    <PhoneManageDialog
      v-model:open="open"
      :type="type"
      :id="id"
      @onrefresh="getList"
      v-if="open"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted, ref } from "vue";
import {
  getCountrycodeList,
  changeCountrycodeStatus,
} from "@/api/member/phone/index";
import { getImgUrl } from "@/utils";
import PhoneManageDialog from "./PhoneManageDialog.vue";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  countryCn: null,
  phoneCode: null,
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const phoneManageList = ref([]);
const open = ref(false);
const type = ref(null);
const id = ref(null);
const isFirstLoad = ref(true)

onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
});
function getList() {
  return getCountrycodeList(queryParams.value).then((res) => {
    phoneManageList.value = res.rows || [];
    total.value = res.total || 0;
  });
}
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const reset = () => {
  queryRef.value.resetFields();
};
const add = () => {
  type.value = 'add'
  open.value = true
};
const edit = (row) => {
  id.value = row.id
  type.value = 'edit'
  open.value = true
};
function updateStatus(row) {
  changeCountrycodeStatus({
    id: row.id,
    status: row.status,
  }).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
    getList();
  });
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style scoped>
.phone-manage {
  padding: 20px;
}
.full-width {
  width: 100%;
}
</style>
