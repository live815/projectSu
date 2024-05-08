<template>
  <div class="" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <div class="head-title">
        {{ $t("live.tip95") }}
      </div>
      <div class="head-box">
        <div>
          
          <el-form-item label="" prop="wordName">
            <el-input
              v-model="input1"
              :placeholder="$t('live.tip96')"
              clearable
              style="width: 240px"
              @keyup.enter="handleAdd"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="Plus"
              @click="handleAdd"
              type="primary"
              v-hasPermi="['sensitive:word:add']"
              >{{ $t("live.Addto") }}</el-button
            >
            <!-- <el-button icon="Upload" @click="">批量导入</el-button> -->
          </el-form-item>
          <div class="head-title">
            {{ $t("live.tip97") }}
          </div>
        </div>
        <div>
          <el-form-item label="" prop="wordName">
            <el-input
              v-model="queryParams.wordName"
              :placeholder="$t('live.pleaseEnter')"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="Search"
              @click="handleQuery"
              v-hasPermi="['sensitive:word:add']"
              >{{ $t("live.Inquire") }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{
              $t("live.reset")
            }}</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="bom-box">
      <el-tag
        v-for="tag in tags"
        :key="tag.id"
        class="mx-1 tag-margin"
        closable
        type="info"
        @close="tagClose(tag)"
      >
        {{ tag.wordName }}
      </el-tag>
    </div>
  </div>
</template>
<script setup name="">
import {
  addSensitiveWord,
  getSensitiveList,
  delSensitive,
} from "@/api/live/chatroomange";
import i18n from "@/i18n";

const { proxy } = getCurrentInstance();

const showSearch = ref(true);
const isFirstLoad = ref(true);

const tags = ref([
  // { name: "Tag 1", type: "info" },
  // { name: "Tag 2", type: "info" },
  // { name: "Tag 3", type: "info" },
  // { name: "Tag 4", type: "info" },
  // { name: "Tag 5", type: "info" },
]);
const input1 = ref("");
const loading = ref(false);
const data = reactive({
  queryParams: {},
  form: {
    wordNames: [],
  },
});
const { queryParams, form } = toRefs(data);
onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
/** 查询角色列表 */
function getList() {
  loading.value = true;
  return getSensitiveList(queryParams.value)
    .then((response) => {
      tags.value = response.rows;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}
/** 搜索按钮操作 */
function handleQuery() {
  getList();
}
function handleAdd() {
  if (input1.value) {
    form.value.wordNames = input1.value.split("&");

    addSensitiveWord(form.value)
      .then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("live.tip98"));
        form.value.wordName = [];
        input1.value = "";
        getList();
      })
      .catch(() => {});
  }
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.wordName = "";
  handleQuery();
}
// 标签关闭事件
function tagClose(tag) {
  // console.log(tag.id, "111");
  proxy.$modal
    .confirm(i18n.global.t("live.tip99"))
    .then(function () {
      delSensitive(tag.id)
        .then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip100"));
          getList();
        })
        .catch(() => {});
    })
    .catch(() => {});
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  white-space: pre-wrap;
}

.head-title {
  color: #757575;
  font-size: 14px;
  margin-bottom: 20px;
}

.head-box {
  display: flex;
  justify-content: space-between;
}

.bom-box {
  border: 1px solid #d9d9d9;
  padding: 16px;
  border-radius: 4px;
}

.tag-margin {
  margin-right: 8px;
}
</style>
