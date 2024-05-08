<template>
  <div class="add-edit-deposit-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :title="title"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="formInline" :inline="true">
        <el-form-item :label="label">
          <el-input
            v-model="formInline.searchKeyword"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{
            $t("operation.search")
          }}</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="currentPageData" style="width: 100%">
        <el-table-column prop="id" :label="$t('operation.Number')">
        </el-table-column>
        <el-table-column prop="value" :label="label"> </el-table-column>
      </el-table>

      <pagination
        style="margin-right: 50px !important"
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="loadData"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { getAdvertisingntDetailsApi } from "@/api/operation/carousel";
import i18n from "@/i18n";

const props = defineProps(["open", "type", "rowItems"]);
const emit = defineEmits(["update:open"]);
const loading = ref(false);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
// 完整页数据
const fullData = ref([]);

// 当前页数据
const currentPageData = ref([]);

onMounted(() => {
  getList();
});

// 根据字段查询
const loadData = () => {
  const startIdx = (queryParams.pageNum - 1) * queryParams.pageSize;
  const endIdx = startIdx + queryParams.pageSize;
  currentPageData.value = fullData.value
    .filter((item) => item.value.includes(formInline.searchKeyword))
    .slice(startIdx, endIdx);
  if (formInline.searchKeyword) {
    queryParams.total = currentPageData.value.length;
  } else {
    queryParams.total = fullData.value.length;
  }
};

const formInline = reactive({
  searchKeyword: "",
});

const title = computed(() => {
  if (props.rowItems.memberType == 4) {
    return i18n.global.t("operation.tip4");
  }
  return i18n.global.t("operation.designatmember");
});

const label = computed(() => {
  if (props.rowItems.memberType == 4) {
    return i18n.global.t("operation.Agentaccount");
  }
  return i18n.global.t("operation.designatmember");
});

const getList = () => {
  getAdvertisingntDetailsApi(props.rowItems.id).then((res) => {
    const data = res;
    fullData.value = data.map((item, index) => {
      return {
        id: index + 1, // 为每行数据添加一个唯一的ID或索引
        value: item,
      };
    });
    loadData();
    queryParams.total = fullData.value.length;
  });
};
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

const onSubmit = () => {
  queryParams.pageNum = 1;
  loadData();
};
</script>

<style lang="scss" scoped>
.add-edit-deposit-dialog {
  :deep().el-dialog__title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  :deep().pagination-container .el-pagination {
    right: 25px;
  }
}
</style>
